import { el } from "../dom/el.js";
import { UI } from "../data.js";
import { sfx } from "../audio/sfx.js";
import { hasSticker } from "../core/state.js";
import { findCorrectInstitution } from "../core/lookup.js";
import { advanceStep } from "../core/actions.js";
import { collectSticker } from "../components/album.js";
import { showTryAgain } from "../dom/tryAgain.js";

const clearHost = (host) => host.replaceChildren();
const doorsOf = (picker) => [...picker.doors.children];

/* ---------- door states ---------- */
const markPicked = (picker, id) =>
  doorsOf(picker).forEach((door) => {
    const isPicked = door.dataset.id === id;
    door.classList.toggle("picked", isPicked);
    door.classList.toggle("dim", !isPicked);
  });

const clearPicked = (picker) =>
  doorsOf(picker).forEach((door) => door.classList.remove("picked", "dim"));

const lockDoors = (picker, correctId) =>
  doorsOf(picker).forEach((door) => {
    const isCorrect = door.dataset.id === correctId;
    door.classList.toggle("picked", isCorrect);
    door.classList.toggle("dim", !isCorrect);
    door.disabled = true;
  });

/* ---------- verdict ---------- */
const showVerdict = (picker, kind, text) => {
  clearHost(picker.verdict);
  picker.verdict.appendChild(el("div", { class: `verdict ${kind}`, text }));
};

const lockToCorrect = (picker) => {
  const correct = findCorrectInstitution(picker.chapter);
  clearHost(picker.detail);
  lockDoors(picker, correct.id);
  showVerdict(picker, "ok", correct.right);
};

/* ---------- choosing ---------- */
const solve = (picker) => {
  sfx.correct();
  const pickedRect = picker.doors.querySelector(".picked")?.getBoundingClientRect() ?? null;
  picker.solved = true;
  lockToCorrect(picker);
  collectSticker(picker.chapter.sticker, pickedRect);
  picker.enableNext();
};

const rejectChoice = (picker, institution) => {
  sfx.wrong();
  showTryAgain(() => {
    showVerdict(picker, "no", institution.wrong);
    clearHost(picker.detail);
    clearPicked(picker);
  });
};

const chooseDoor = (picker, institution) => {
  if (institution.correct) solve(picker);
  else rejectChoice(picker, institution);
};

/* ---------- detail panel ---------- */
const goBack = (picker) => {
  clearHost(picker.detail);
  clearPicked(picker);
};

const buildChooseButton = (picker, institution) =>
  el(
    "button",
    { class: "btn btn--go", type: "button", onclick: () => chooseDoor(picker, institution) },
    UI.chooseDoor
  );

const buildBackButton = (picker) =>
  el("button", { class: "btn btn--ghost", type: "button", onclick: () => goBack(picker) }, UI.back);

const buildDetailPanel = (picker, institution) =>
  el(
    "div",
    { class: "institution-detail" },
    el("h3", { text: institution.name }),
    institution.full && el("p", { class: "full", text: institution.full }),
    el("p", { text: institution.desc }),
    el("div", { class: "row" }, buildChooseButton(picker, institution), buildBackButton(picker))
  );

const showDetail = (picker, institution) => {
  clearHost(picker.verdict);
  clearHost(picker.detail);
  const panel = buildDetailPanel(picker, institution);
  picker.detail.appendChild(panel);
  panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
};

const selectDoor = (picker, institution) => {
  if (picker.solved) return;
  sfx.click();
  markPicked(picker, institution.id);
  showDetail(picker, institution);
};

/* ---------- build ---------- */
const buildDoor = (picker, institution) =>
  el(
    "button",
    {
      class: "door",
      type: "button",
      "data-id": institution.id,
      onclick: () => selectDoor(picker, institution),
    },
    el("img", { src: institution.img, alt: "" }),
    el("b", { text: institution.name }),
    institution.full && el("small", { text: institution.full })
  );

const createPicker = (chapter, enableNext) => ({
  chapter,
  enableNext,
  solved: hasSticker(chapter.sticker),
  doors: el("div", { class: "doors" }),
  detail: el("div"),
  verdict: el("div"),
});

export const pickStep = ({ chapter, body, enableNext }) => {
  const picker = createPicker(chapter, enableNext);
  chapter.institutions.forEach((inst) => picker.doors.appendChild(buildDoor(picker, inst)));
  body.className = "body";
  body.append(
    el("div", { class: "card green", text: chapter.caption }),
    picker.doors,
    picker.detail,
    picker.verdict
  );
  if (picker.solved) lockToCorrect(picker);
  return { ready: picker.solved, onNext: advanceStep };
};

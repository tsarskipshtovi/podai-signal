import { el } from "../dom/el.js";
import { UI } from "../data.js";
import { MIN_FIELD_LENGTH, TIMING } from "../config.js";
import { sfx } from "../audio/sfx.js";
import { paperPlane } from "../dom/effects.js";
import { delay } from "../core/utils.js";
import { advanceStep } from "../core/actions.js";
import { state, getReportField, setReportField, markReportSent } from "../core/state.js";

/* ---------- validation ---------- */
const isFilled = (fields) =>
  fields.every((field) => getReportField(field.id).trim().length >= MIN_FIELD_LENGTH);

const refreshSubmit = (form) => {
  form.submit.disabled = !isFilled(form.config.fields) || state.reportSent;
};

/* ---------- sent view ---------- */
const buildRecapLine = ([id, label], index) => [
  index > 0 && el("br"),
  el("b", { text: `${label}:` }),
  ` ${getReportField(id)}`,
];

const buildRecap = () =>
  el("div", { class: "recap" }, Object.entries(UI.recap).flatMap(buildRecapLine));

const showSent = (form) => {
  Object.values(form.areas).forEach((area) => {
    area.disabled = true;
  });
  form.submit.style.display = "none";
  form.out.replaceChildren(el("div", { class: "sent", text: form.config.done }), buildRecap());
};

/* ---------- submit ---------- */
const submitReport = async (form) => {
  if (!isFilled(form.config.fields)) return;
  form.submit.disabled = true;
  form.submit.textContent = form.config.sending;
  sfx.click();
  await delay(TIMING.sendDelay);
  markReportSent();
  sfx.correct();
  showSent(form);
  paperPlane();
  form.onDone();
};

/* ---------- build ---------- */
const buildTextarea = (field, onChange) => {
  const textarea = el("textarea", {
    id: `f_${field.id}`,
    placeholder: field.placeholder,
    oninput: () => {
      setReportField(field.id, textarea.value);
      onChange();
    },
  });
  textarea.value = getReportField(field.id);
  return textarea;
};

const buildFieldRow = (field, textarea) =>
  el(
    "div",
    { class: "field" },
    el("label", { for: `f_${field.id}`, text: field.label }),
    textarea
  );

const buildSubmitButton = (label, onClick) =>
  el("button", { class: "btn btn--go", type: "button", disabled: "", onclick: onClick }, label);

const createForm = (config, onDone) => {
  const form = { config, onDone, out: el("div") };
  form.areas = Object.fromEntries(
    config.fields.map((field) => [field.id, buildTextarea(field, () => refreshSubmit(form))])
  );
  form.submit = buildSubmitButton(config.submit, () => submitReport(form));
  form.root = el(
    "div",
    { class: "report" },
    el("p", { class: "lead", text: config.intro }),
    config.fields.map((field) => buildFieldRow(field, form.areas[field.id])),
    form.submit,
    form.out
  );
  refreshSubmit(form);
  return form;
};

export const reportStep = ({ chapter, body, enableNext }) => {
  body.className = "body";
  const form = createForm(chapter.report, enableNext);
  body.appendChild(form.root);
  if (state.reportSent) showSent(form);
  return { ready: state.reportSent, onNext: advanceStep };
};

import { el } from "../dom/el.js";
import { STEPS } from "../config.js";
import { sfx } from "../audio/sfx.js";
import { advanceStep } from "../core/actions.js";
import { getChapter, getStepName } from "../core/state.js";
import { mount } from "../dom/mount.js";
import { buildScene } from "../components/scene.js";
import { buildAlbum } from "../components/album.js";
import { buildFooter } from "../components/footer.js";
import { buildNextButton, enableNextButton } from "../components/nextButton.js";
import { buildRestartButton } from "../components/restartButton.js";
import { buildProgress } from "../components/progress.js";
import { introStep, foundStep } from "../steps/speech.js";
import { huntStep } from "../steps/hunt.js";
import { pickStep } from "../steps/pick.js";
import { reportStep } from "../steps/report.js";
import { promptsStep } from "../steps/prompts.js";

const STEP_RENDERERS = {
  [STEPS.INTRO]: introStep,
  [STEPS.HUNT]: huntStep,
  [STEPS.FOUND]: foundStep,
  [STEPS.PICK]: pickStep,
  [STEPS.REPORT]: reportStep,
  [STEPS.PROMPTS]: promptsStep,
};

const bodyClass = (chapter, stepName) =>
  ["body", chapter.bodyClass?.[stepName]].filter(Boolean).join(" ");

export const renderChapter = () => {
  const chapter = getChapter();
  const stepName = getStepName();
  const scene = buildScene(chapter.bg, {
    hunting: stepName === STEPS.HUNT,
    className: `chapter-${chapter.id} step-${stepName}`,
  });
  const body = el("div", { class: bodyClass(chapter, stepName) });

  let onNext = advanceStep;
  const nextButton = buildNextButton(false, () => {
    sfx.click();
    onNext();
  });
  const enableNext = () => enableNextButton(nextButton);

  const renderStep = STEP_RENDERERS[stepName];
  const result = renderStep?.({ chapter, scene, body, enableNext }) ?? {};
  if (result.onNext) onNext = result.onNext;
  if (result.ready) enableNext();

  scene.appendChild(
    el(
      "div",
      { class: "scene-inner" },
      chapter.showAlbum[stepName] && buildAlbum(),
      el("h1", { class: "chapter-title", text: chapter.title }),
      body,
      buildFooter(result.footerLeft, nextButton)
    )
  );
  mount(scene, buildRestartButton(), buildProgress());
};

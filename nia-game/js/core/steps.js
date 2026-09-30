import { STEPS } from "../config.js";

const { INTRO, HUNT, FOUND, PICK, REPORT, PROMPTS } = STEPS;

/* Which steps a chapter has, in order. Pure logic. */
export const stepsFor = (chapter) => {
  if (chapter.institutions) return [INTRO, PICK, PROMPTS];
  if (chapter.report) return [INTRO, HUNT, FOUND, REPORT, PROMPTS];
  return [INTRO, HUNT, FOUND, PROMPTS];
};

export const isStepInRange = (chapter, index) => index < stepsFor(chapter).length;

export const nextStepIndex = (chapter, index) =>
  Math.min(index + 1, stepsFor(chapter).length - 1);

export const findStepIndex = (chapter, stepName) =>
  Math.max(0, stepsFor(chapter).indexOf(stepName));

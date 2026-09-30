import { GAME } from "../data.js";
import { findStepIndex } from "./steps.js";

/* Dev shortcut: index.html#ch=3 or index.html#ch=3:hunt */
const HASH_PATTERN = /^#ch=(\d+)(?::(\w+))?$/;

export const parseDeepLink = (hash) => {
  const match = HASH_PATTERN.exec(hash);
  if (!match) return null;
  const [, number, stepName] = match;
  const chapterIndex = Number(number) - 1;
  const chapter = GAME.chapters[chapterIndex];
  if (!chapter) return null;
  return { chapterIndex, stepIndex: stepName ? findStepIndex(chapter, stepName) : 0 };
};

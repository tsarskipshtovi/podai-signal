import { SCREENS } from "../config.js";
import { clearGame } from "./storage.js";
import { render } from "./router.js";
import { nextStepIndex } from "./steps.js";
import {
  state,
  getChapter,
  isLastChapter,
  persist,
  resetState,
  applySave,
  setScreen,
  setPosition,
} from "./state.js";

const commit = () => {
  persist();
  render();
};

export const startNew = () => {
  clearGame();
  resetState();
  setScreen(SCREENS.INTRO);
  render();
};

export const restart = () => {
  clearGame();
  resetState();
  render();
};

export const resume = (saved) => {
  applySave(saved);
  render();
};

export const beginChapters = () => {
  setScreen(SCREENS.CHAPTER);
  setPosition(0, 0);
  commit();
};

export const advanceStep = () => {
  setPosition(state.chapterIndex, nextStepIndex(getChapter(), state.stepIndex));
  commit();
};

export const finishChapter = () => {
  if (isLastChapter()) setScreen(SCREENS.FINAL);
  else setPosition(state.chapterIndex + 1, 0);
  commit();
};

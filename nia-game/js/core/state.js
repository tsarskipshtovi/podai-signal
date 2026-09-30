import { GAME } from "../data.js";
import { SCREENS } from "../config.js";
import { saveGame } from "./storage.js";
import { stepsFor, isStepInRange } from "./steps.js";

/* Old saves keep the "sent" flag inside the report object; we keep that format. */
const LEGACY_SENT_KEY = "__sent";

export const state = {
  screen: SCREENS.TITLE,
  chapterIndex: 0,
  stepIndex: 0,
  collected: [],
  report: {},
  reportSent: false,
};

/* ---------- reads ---------- */
export const getChapter = () => GAME.chapters[state.chapterIndex];
export const getStepName = () => stepsFor(getChapter())[state.stepIndex];
export const hasSticker = (id) => state.collected.includes(id);
export const isLastChapter = () => state.chapterIndex + 1 >= GAME.chapters.length;
export const getReportField = (id) => state.report[id] || "";

/* ---------- persistence ---------- */
const toSaveData = () => ({
  screen: state.screen,
  ci: state.chapterIndex,
  step: state.stepIndex,
  collected: state.collected,
  report: { ...state.report, ...(state.reportSent && { [LEGACY_SENT_KEY]: true }) },
});

export const persist = () => saveGame(toSaveData());

const splitReport = ({ [LEGACY_SENT_KEY]: sent, ...fields }) => ({
  fields,
  sent: Boolean(sent),
});

const fixOutOfRangePosition = () => {
  if (!getChapter()) Object.assign(state, { chapterIndex: 0, stepIndex: 0 });
  const inChapter = state.screen === SCREENS.CHAPTER;
  if (inChapter && !isStepInRange(getChapter(), state.stepIndex)) state.stepIndex = 0;
};

export const applySave = (saved) => {
  const { fields, sent } = splitReport(saved.report ?? {});
  Object.assign(state, {
    screen: saved.screen,
    chapterIndex: saved.ci || 0,
    stepIndex: saved.step || 0,
    collected: saved.collected || [],
    report: fields,
    reportSent: sent,
  });
  fixOutOfRangePosition();
};

/* ---------- writes ---------- */
export const resetState = () =>
  Object.assign(state, {
    screen: SCREENS.TITLE,
    chapterIndex: 0,
    stepIndex: 0,
    collected: [],
    report: {},
    reportSent: false,
  });

export const setScreen = (screen) => {
  state.screen = screen;
};

export const setPosition = (chapterIndex, stepIndex) => {
  state.chapterIndex = chapterIndex;
  state.stepIndex = stepIndex;
};

export const addSticker = (id) => {
  if (!hasSticker(id)) state.collected.push(id);
  persist();
};

export const setReportField = (id, value) => {
  state.report[id] = value;
};

export const markReportSent = () => {
  state.reportSent = true;
  persist();
};

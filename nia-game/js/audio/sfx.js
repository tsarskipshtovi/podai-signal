import { beep } from "./audio.js";

export const sfx = {
  collect: () => beep([523, 659, 784, 1047], 0.16, "triangle"),
  correct: () => beep([523, 659, 784], 0.18, "triangle"),
  wrong: () => beep([294, 220], 0.2, "sine"),
  click: () => beep([440], 0.06, "sine"),
  win: () => beep([523, 659, 784, 1047, 1319], 0.2, "triangle"),
};

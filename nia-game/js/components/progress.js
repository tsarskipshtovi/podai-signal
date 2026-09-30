import { el } from "../dom/el.js";
import { GAME } from "../data.js";
import { state } from "../core/state.js";

const dotClass = (index) =>
  [index < state.chapterIndex && "on", index === state.chapterIndex && "cur"]
    .filter(Boolean)
    .join(" ");

export const buildProgress = () =>
  el("div", { class: "progress" }, GAME.chapters.map((_, i) => el("i", { class: dotClass(i) })));

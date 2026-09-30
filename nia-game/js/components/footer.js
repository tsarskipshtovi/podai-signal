import { el } from "../dom/el.js";

export const buildHintPill = (text) => el("div", { class: "hint-pill", text });

export const buildFooter = (left, nextButton) =>
  el("div", { class: "footer" }, left, nextButton);

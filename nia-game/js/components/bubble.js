import { el } from "../dom/el.js";

export const buildBubble = (speaker, text) =>
  el(
    "div",
    { class: "bubble bubble--tail-right" },
    el("span", { class: "who", text: speaker }),
    el("div", { text })
  );

import { el } from "../dom/el.js";
import { GAME } from "../data.js";

export const buildHero = (...children) =>
  el("div", { class: "hero" }, el("div", { class: "brand", text: GAME.brand }), ...children);

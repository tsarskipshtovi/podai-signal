import { el } from "../dom/el.js";
import { GAME } from "../data.js";

export const buildBrand = () => el("div", { class: "brand", text: GAME.brand });

export const buildHero = (modifier, ...children) =>
  el("div", { class: `hero ${modifier}` }, buildBrand(), ...children);

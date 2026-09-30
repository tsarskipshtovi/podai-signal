import { el } from "../dom/el.js";

export const buildScene = (bgSrc, { hunting = false } = {}, ...children) =>
  el(
    "div",
    { class: hunting ? "scene hunting" : "scene", style: `background-image:url('${bgSrc}')` },
    ...children
  );

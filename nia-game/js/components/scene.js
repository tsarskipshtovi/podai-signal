import { el } from "../dom/el.js";

const sceneClass = (hunting, className) =>
  ["scene", hunting && "hunting", className].filter(Boolean).join(" ");

export const buildScene = (bgSrc, { hunting = false, className = "" } = {}, ...children) =>
  el(
    "div",
    { class: sceneClass(hunting, className), style: `background-image:url('${bgSrc}')` },
    ...children
  );

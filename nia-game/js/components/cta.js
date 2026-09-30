import { el } from "../dom/el.js";

export const buildCta = ({ label, onClick, secondary = false }) =>
  el(
    "button",
    { class: secondary ? "cta secondary" : "cta", type: "button", onclick: onClick },
    label
  );

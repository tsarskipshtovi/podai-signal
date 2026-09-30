import { el } from "../dom/el.js";
import { UI } from "../data.js";
import { CHEVRON_SVG } from "../config.js";

export const buildNextButton = (ready, onClick) => {
  const button = el("button", {
    class: ready ? "btn-next is-ready" : "btn-next is-inactive",
    type: "button",
    "aria-label": UI.next,
    html: CHEVRON_SVG,
    onclick: onClick,
  });
  button.disabled = !ready;
  return button;
};

export const enableNextButton = (button) => {
  button.classList.remove("is-inactive");
  button.classList.add("is-ready");
  button.disabled = false;
};

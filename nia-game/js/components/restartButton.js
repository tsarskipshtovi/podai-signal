import { el } from "../dom/el.js";
import { UI } from "../data.js";
import { restart } from "../core/actions.js";

const confirmRestart = () => {
  if (confirm(UI.restartConfirm)) restart();
};

export const buildRestartButton = () =>
  el("button", { class: "restart", type: "button", onclick: confirmRestart }, UI.restart);

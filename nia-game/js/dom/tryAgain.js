import { el } from "./el.js";
import { GAME } from "../data.js";
import { TIMING, TRY_AGAIN_CLOSE_KEYS } from "../config.js";

let isOpen = false;

const buildOverlay = () =>
  el("div", { class: "tryagain", role: "alert" }, el("span", { text: GAME.tryAgain }));

/* Shows the "try again" overlay. It closes on click, key press, or after a timeout. */
export const showTryAgain = (onClose) => {
  if (isOpen) return;
  isOpen = true;
  const overlay = buildOverlay();
  let timer = null;

  const close = () => {
    if (!overlay.isConnected) return;
    clearTimeout(timer);
    overlay.remove();
    isOpen = false;
    document.removeEventListener("keydown", handleKey);
    onClose?.();
  };
  const handleKey = (event) => {
    if (TRY_AGAIN_CLOSE_KEYS.includes(event.key)) close();
  };

  overlay.addEventListener("click", close);
  document.addEventListener("keydown", handleKey);
  document.body.appendChild(overlay);
  timer = setTimeout(close, TIMING.tryAgain);
};

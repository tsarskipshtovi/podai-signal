import { getApp } from "./mount.js";
import { FORWARD_KEYS } from "../config.js";

const isTyping = (target) => /^(TEXTAREA|INPUT)$/.test(target?.tagName ?? "");

const clickNext = () => getApp().querySelector(".btn-next:not(.is-inactive)")?.click();

export const initKeyboard = () =>
  document.addEventListener("keydown", (event) => {
    if (isTyping(event.target) || !FORWARD_KEYS.includes(event.key)) return;
    clickNext();
  });

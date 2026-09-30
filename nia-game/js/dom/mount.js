import { FOCUS_SELECTOR } from "../config.js";

export const getApp = () => document.getElementById("app");

const focusFirst = (root) =>
  root.querySelector(FOCUS_SELECTOR)?.focus({ preventScroll: true });

export const mount = (...nodes) => {
  const app = getApp();
  app.replaceChildren(...nodes);
  focusFirst(app);
};

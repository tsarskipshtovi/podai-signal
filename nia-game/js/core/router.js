import { state } from "./state.js";

/* Screens register themselves here, so this file never imports a screen. */
const screens = new Map();

export const registerScreens = (map) =>
  Object.entries(map).forEach(([name, renderScreen]) => screens.set(name, renderScreen));

export const render = () => {
  screens.get(state.screen)?.();
  window.scrollTo(0, 0);
};

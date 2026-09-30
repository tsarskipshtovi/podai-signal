import { SAVE_KEY, MUTE_KEY } from "../config.js";

/* localStorage can throw (private mode, quota). Failing silently is intended. */
const safely = (action, fallback = null) => {
  try {
    return action();
  } catch {
    return fallback;
  }
};

const readItem = (key) => safely(() => localStorage.getItem(key));
const writeItem = (key, value) => safely(() => localStorage.setItem(key, value));
const removeItem = (key) => safely(() => localStorage.removeItem(key));

export const saveGame = (data) => writeItem(SAVE_KEY, JSON.stringify(data));
export const loadGame = () => safely(() => JSON.parse(readItem(SAVE_KEY) || "null"));
export const clearGame = () => removeItem(SAVE_KEY);

export const loadMuted = () => readItem(MUTE_KEY) === "1";
export const saveMuted = (muted) => writeItem(MUTE_KEY, muted ? "1" : "0");

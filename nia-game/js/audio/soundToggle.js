import { isMuted, toggleMuted } from "./audio.js";
import { sfx } from "./sfx.js";

const refresh = (button) => {
  button.setAttribute("aria-pressed", String(!isMuted()));
  button.querySelector(".ico-sound").textContent = isMuted() ? "🔇" : "🔊";
};

const handleClick = (button) => {
  toggleMuted();
  refresh(button);
  if (!isMuted()) sfx.click();
};

export const initSoundToggle = () => {
  const button = document.getElementById("soundToggle");
  refresh(button);
  button.addEventListener("click", () => handleClick(button));
};

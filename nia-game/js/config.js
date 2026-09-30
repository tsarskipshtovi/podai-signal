/* Shared constants. No logic in this file. */

export const SAVE_KEY = "reka-na-nia:v1";
export const MUTE_KEY = "reka-na-nia:mute";

export const SCREENS = Object.freeze({
  TITLE: "title",
  INTRO: "intro",
  CHAPTER: "chapter",
  FINAL: "final",
});
export const RESUMABLE_SCREENS = [SCREENS.CHAPTER, SCREENS.FINAL];

export const STEPS = Object.freeze({
  INTRO: "intro",
  HUNT: "hunt",
  FOUND: "found",
  PICK: "pick",
  REPORT: "report",
  PROMPTS: "prompts",
});

export const TIMING = Object.freeze({
  boot: 150,
  flyAnimation: 720,
  sendDelay: 850,
  tryAgain: 1400,
  confettiLife: 6000,
  planeLife: 1100,
});

export const CONFETTI = Object.freeze({
  count: 90,
  colors: ["#0ba999", "#9f91d3", "#cef6a3", "#498cb9", "#ffbfba", "#2d3d6e"],
});

export const STICKER_FLY_HALF_SIZE = 45;
export const MIN_FIELD_LENGTH = 2;

export const FORWARD_KEYS = ["ArrowRight", "Enter"];
export const TRY_AGAIN_CLOSE_KEYS = ["Escape", "Enter", " "];

export const FOCUS_SELECTOR =
  ".cta, .btn-next:not(.is-inactive), .hotspot, .door, button";

/* Clicks on these do not count as a "miss" while hunting for an object. */
export const MISS_CLICK_IGNORE = [
  ".hotspot",
  ".album",
  ".btn-next",
  ".restart",
  ".hint-pill",
  ".chapter-title",
  ".sound-toggle",
].join(", ");

export const CHEVRON_SVG =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4l10 8-10 8" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

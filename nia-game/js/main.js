import { GAME } from "./data.js";
import { SCREENS, STEPS, TIMING } from "./config.js";
import { registerScreens, render } from "./core/router.js";
import { setScreen, setPosition } from "./core/state.js";
import { parseDeepLink } from "./core/deepLink.js";
import { delay } from "./core/utils.js";
import { initSoundToggle } from "./audio/soundToggle.js";
import { initKeyboard } from "./dom/keyboard.js";
import { renderTitle } from "./screens/title.js";
import { renderIntro } from "./screens/intro.js";
import { renderChapter } from "./screens/chapter.js";
import { renderFinal } from "./screens/final.js";

/* ---------- image preloading ---------- */
const chapterImages = (chapter) => [
  chapter.bg,
  ...(chapter.institutions ?? []).map((institution) => institution.img),
];

const collectImageSources = () => [
  GAME.intro.bg,
  GAME.final.bg,
  ...GAME.chapters.flatMap(chapterImages),
  ...GAME.stickers.flatMap((sticker) => [sticker.img, sticker.sil]),
];

const preloadImages = (sources) =>
  sources.forEach((src) => {
    new Image().src = src;
  });

const whenImageSettled = (src) =>
  new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = src;
  });

/* ---------- start ---------- */
const applyInitialScreen = () => {
  const link = parseDeepLink(location.hash);
  if (!link) return setScreen(SCREENS.TITLE);
  setScreen(SCREENS.CHAPTER);
  setPosition(link.chapterIndex, link.stepIndex);
};

const start = async () => {
  initSoundToggle();
  initKeyboard();
  registerScreens({
    [SCREENS.TITLE]: renderTitle,
    [SCREENS.INTRO]: renderIntro,
    [SCREENS.CHAPTER]: renderChapter,
    [SCREENS.FINAL]: renderFinal,
  });
  preloadImages(collectImageSources());
  await whenImageSettled(GAME.intro.bg);
  await delay(TIMING.boot);
  applyInitialScreen();
  render();
};

start();

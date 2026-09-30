import { el } from "../dom/el.js";
import { GAME, UI } from "../data.js";
import { RESUMABLE_SCREENS } from "../config.js";
import { sfx } from "../audio/sfx.js";
import { loadGame } from "../core/storage.js";
import { startNew, resume } from "../core/actions.js";
import { mount } from "../dom/mount.js";
import { buildScene } from "../components/scene.js";
import { buildHero } from "../components/hero.js";
import { buildCta } from "../components/cta.js";

const canResume = (saved) => Boolean(saved) && RESUMABLE_SCREENS.includes(saved.screen);

const handleNewGame = () => {
  sfx.click();
  startNew();
};

const handleResume = (saved) => {
  sfx.click();
  resume(saved);
};

const buildButtons = (saved) => {
  const resumable = canResume(saved);
  return el(
    "div",
    { class: "cta-row" },
    buildCta({ label: resumable ? UI.newGame : GAME.intro.cta, onClick: handleNewGame, secondary: resumable }),
    resumable && buildCta({ label: UI.resume, onClick: () => handleResume(saved) })
  );
};

export const renderTitle = () => {
  const hero = buildHero(
    el("h1", { text: GAME.title }),
    el("div", { class: "sub", text: GAME.subtitle }),
    el("p", { text: GAME.tagline }),
    buildButtons(loadGame())
  );
  mount(buildScene(GAME.intro.bg, {}, hero));
};

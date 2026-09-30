import { el } from "../dom/el.js";
import { GAME, UI } from "../data.js";
import { sfx } from "../audio/sfx.js";
import { clearGame } from "../core/storage.js";
import { startNew } from "../core/actions.js";
import { mount } from "../dom/mount.js";
import { confetti } from "../dom/effects.js";
import { buildScene } from "../components/scene.js";
import { buildHero } from "../components/hero.js";
import { buildCta } from "../components/cta.js";

const STICKER_STAGGER = 0.1;

const buildStickerImage = (sticker, index) =>
  el("img", {
    src: sticker.img,
    alt: sticker.name,
    style: `animation-delay:${index * STICKER_STAGGER}s`,
  });

const buildStickerRow = () =>
  el("div", { class: "final-stickers" }, GAME.stickers.map(buildStickerImage));

const handlePlayAgain = () => {
  sfx.click();
  startNew();
};

const celebrate = () => {
  clearGame();
  sfx.win();
  confetti();
};

export const renderFinal = () => {
  const hero = buildHero(
    el("h1", { text: UI.finalTitle }),
    buildStickerRow(),
    el("p", { text: `${GAME.final.text}\n\n${GAME.final.sub}` }),
    el("div", { class: "cta-row" }, buildCta({ label: GAME.final.again, onClick: handlePlayAgain }))
  );
  mount(buildScene(GAME.final.bg, {}, hero));
  celebrate();
};

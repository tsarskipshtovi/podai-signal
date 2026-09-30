import { el } from "../dom/el.js";
import { GAME, UI } from "../data.js";
import { sfx } from "../audio/sfx.js";
import { beginChapters } from "../core/actions.js";
import { mount } from "../dom/mount.js";
import { buildScene } from "../components/scene.js";
import { buildAlbum } from "../components/album.js";
import { buildBubble } from "../components/bubble.js";
import { buildFooter, buildHintPill } from "../components/footer.js";
import { buildNextButton } from "../components/nextButton.js";
import { buildRestartButton } from "../components/restartButton.js";

const handleNext = () => {
  sfx.click();
  beginChapters();
};

const buildBody = () =>
  el(
    "div",
    { class: "body body--right body--center" },
    buildBubble(GAME.intro.name, GAME.intro.speech)
  );

export const renderIntro = () => {
  const inner = el(
    "div",
    { class: "scene-inner" },
    buildAlbum(),
    el("h1", { class: "chapter-title", text: GAME.subtitle }),
    buildBody(),
    buildFooter(buildHintPill(UI.introHint), buildNextButton(true, handleNext))
  );
  mount(buildScene(GAME.intro.bg, {}, inner), buildRestartButton());
};

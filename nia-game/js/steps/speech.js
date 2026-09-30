import { GAME } from "../data.js";
import { buildBubble } from "../components/bubble.js";
import { advanceStep } from "../core/actions.js";

const createSpeechStep =
  (pickText) =>
  ({ chapter, body }) => {
    body.className = "body body--right";
    body.appendChild(buildBubble(GAME.intro.name, pickText(chapter)));
    return { ready: true, onNext: advanceStep };
  };

export const introStep = createSpeechStep((chapter) => chapter.speech);
export const foundStep = createSpeechStep((chapter) => chapter.hunt.found);

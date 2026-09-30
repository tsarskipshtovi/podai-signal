import { el } from "../dom/el.js";
import { UI } from "../data.js";
import { MISS_CLICK_IGNORE } from "../config.js";
import { sfx } from "../audio/sfx.js";
import { findSticker } from "../core/lookup.js";
import { advanceStep } from "../core/actions.js";
import { collectSticker } from "../components/album.js";
import { buildHintPill } from "../components/footer.js";
import { showTryAgain } from "../dom/tryAgain.js";

const positionStyle = ({ x, y, w }) => `left:${x}%;top:${y}%;width:${w}%;`;

const handleFound = async (event, stickerId) => {
  event.stopPropagation();
  const hotspot = event.currentTarget;
  if (hotspot.dataset.done) return;
  hotspot.dataset.done = "1";
  hotspot.classList.add("found");
  sfx.collect();
  await collectSticker(stickerId, hotspot.getBoundingClientRect());
  advanceStep();
};

const buildHotspot = (hunt, sticker) =>
  el(
    "button",
    {
      class: "hotspot",
      type: "button",
      "aria-label": `${UI.huntLabel}${sticker.name}`,
      style: positionStyle(hunt.pos),
      onclick: (event) => handleFound(event, hunt.object),
    },
    el("img", { class: "sil", src: sticker.sil, alt: "" })
  );

const isMissClick = (event) => !event.target.closest(MISS_CLICK_IGNORE);

const handleMiss = (event) => {
  if (!isMissClick(event)) return;
  sfx.wrong();
  showTryAgain();
};

export const huntStep = ({ chapter, scene }) => {
  const { hunt } = chapter;
  scene.appendChild(buildHotspot(hunt, findSticker(hunt.object)));
  scene.addEventListener("click", handleMiss);
  return { ready: false, footerLeft: buildHintPill(hunt.hint) };
};

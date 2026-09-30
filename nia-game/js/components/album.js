import { el } from "../dom/el.js";
import { GAME, UI } from "../data.js";
import { hasSticker, addSticker } from "../core/state.js";
import { findSticker } from "../core/lookup.js";
import { flySticker } from "../dom/effects.js";

const slotSelector = (id) => `.slot[data-sticker="${id}"]`;

const buildSlot = (sticker) => {
  const filled = hasSticker(sticker.id);
  return el(
    "div",
    {
      class: filled ? "slot filled" : "slot empty",
      "data-sticker": sticker.id,
      title: filled ? sticker.name : "?",
    },
    el("img", { src: filled ? sticker.img : sticker.sil, alt: filled ? sticker.name : "" })
  );
};

export const buildAlbum = () =>
  el(
    "div",
    { class: "album" },
    el("h2", { text: UI.album }),
    el("div", { class: "album-grid" }, GAME.stickers.map(buildSlot))
  );

const fillSlot = (slot, sticker) => {
  const image = slot.querySelector("img");
  slot.className = "slot filled";
  slot.title = sticker.name;
  image.src = sticker.img;
  image.alt = sticker.name;
};

const refreshAlbums = (id) => {
  const sticker = findSticker(id);
  document.querySelectorAll(".album").forEach((album) => {
    const slot = album.querySelector(slotSelector(id));
    if (slot && !slot.classList.contains("filled")) fillSlot(slot, sticker);
  });
};

/* Saves the sticker, animates it into the album (if we know where from), then updates the album. */
export const collectSticker = async (id, fromRect) => {
  addSticker(id);
  const slot = document.querySelector(slotSelector(id));
  if (fromRect && slot) {
    await flySticker(findSticker(id), fromRect, slot.getBoundingClientRect());
  }
  refreshAlbums(id);
};

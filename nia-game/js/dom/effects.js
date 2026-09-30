import { el, forceReflow } from "./el.js";
import { CONFETTI, TIMING, STICKER_FLY_HALF_SIZE } from "../config.js";

const PLANE_START_STYLE =
  "position:fixed;left:20%;top:60%;font-size:34px;background:none;z-index:70;transition:all 1s ease;";

const prefersReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const random = (max) => Math.random() * max;

/* ---------- confetti ---------- */
const createConfettiPiece = (index) => {
  const piece = el("div", { class: "confetti" });
  Object.assign(piece.style, {
    left: `${random(100)}vw`,
    background: CONFETTI.colors[index % CONFETTI.colors.length],
    animationDuration: `${2.5 + random(2.5)}s`,
    animationDelay: `${random(0.8)}s`,
    transform: `rotate(${random(360)}deg)`,
  });
  return piece;
};

const launch = (node, lifetime) => {
  document.body.appendChild(node);
  setTimeout(() => node.remove(), lifetime);
};

export const confetti = () => {
  if (prefersReducedMotion()) return;
  Array.from({ length: CONFETTI.count }, (_, i) => createConfettiPiece(i)).forEach((piece) =>
    launch(piece, TIMING.confettiLife)
  );
};

/* ---------- paper plane ---------- */
export const paperPlane = () => {
  const plane = el("div", { class: "confetti", text: "✈️", style: PLANE_START_STYLE });
  document.body.appendChild(plane);
  forceReflow(plane);
  Object.assign(plane.style, { left: "110%", top: "10%", transform: "rotate(20deg)" });
  setTimeout(() => plane.remove(), TIMING.planeLife);
};

/* ---------- sticker flying into the album ---------- */
const topLeftFor = (rect) => ({
  x: rect.left + rect.width / 2 - STICKER_FLY_HALF_SIZE,
  y: rect.top + rect.height / 2 - STICKER_FLY_HALF_SIZE,
});

const placeAt = (node, { x, y }) => {
  node.style.left = `${x}px`;
  node.style.top = `${y}px`;
};

export const flySticker = (sticker, fromRect, toRect) =>
  new Promise((resolve) => {
    const flying = el("div", { class: "fly" }, el("img", { src: sticker.img, alt: "" }));
    placeAt(flying, topLeftFor(fromRect));
    document.body.appendChild(flying);
    forceReflow(flying);
    placeAt(flying, topLeftFor(toRect));
    Object.assign(flying.style, { transform: "scale(0.42)", opacity: "0.9" });
    setTimeout(() => {
      flying.remove();
      resolve();
    }, TIMING.flyAnimation);
  });

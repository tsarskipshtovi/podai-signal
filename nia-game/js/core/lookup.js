import { GAME } from "../data.js";

export const findSticker = (id) => GAME.stickers.find((s) => s.id === id) ?? null;

export const findCorrectInstitution = (chapter) =>
  chapter.institutions.find((institution) => institution.correct);

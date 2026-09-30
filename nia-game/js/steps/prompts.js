import { el } from "../dom/el.js";
import { UI } from "../data.js";
import { finishChapter } from "../core/actions.js";

const buildTag = () =>
  el("p", { class: "card lav" }, el("span", { class: "tag", text: UI.promptsTag }));

const buildPromptCard = ({ tone, text }) => el("div", { class: `card ${tone}`, text });

export const promptsStep = ({ chapter, body }) => {
  body.className = "body";
  body.append(buildTag(), ...chapter.prompts.map(buildPromptCard));
  return { ready: true, onNext: finishChapter };
};

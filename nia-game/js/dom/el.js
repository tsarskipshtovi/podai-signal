/* Tiny element builder: el("div", { class: "x", onclick }, child, [children]) */

const PROP_HANDLERS = {
  class: (node, value) => { node.className = value; },
  html: (node, value) => { node.innerHTML = value; },
  text: (node, value) => { node.textContent = value; },
  style: (node, value) => node.setAttribute("style", value),
};

const isEventProp = (key) => key.startsWith("on");

const applyProp = (node, key, value) => {
  if (PROP_HANDLERS[key]) PROP_HANDLERS[key](node, value);
  else if (isEventProp(key)) node.addEventListener(key.slice(2), value);
  else if (value != null) node.setAttribute(key, value);
};

const isRenderable = (child) => child != null && child !== false;
const toNode = (child) => (typeof child === "string" ? document.createTextNode(child) : child);

const appendChildren = (node, children) =>
  children.flat().filter(isRenderable).map(toNode).forEach((child) => node.appendChild(child));

export const el = (tag, props, ...children) => {
  const node = document.createElement(tag);
  Object.entries(props ?? {}).forEach(([key, value]) => applyProp(node, key, value));
  appendChildren(node, children);
  return node;
};

/* Reading offsetWidth makes the browser apply pending styles, so a CSS transition can start. */
export const forceReflow = (node) => node.offsetWidth;

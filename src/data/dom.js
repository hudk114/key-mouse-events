import { core } from '../core';
import { Event } from '../event/index';
import { addEvents, clearEvents } from '../dom-event';

export const domMap = new Map();

export function InitDOMObject (dom) {
  let nDOMEle = {
    e: new Event(),
    events: addEvents(dom),
    ...core(dom)
  };
  domMap.set(dom, nDOMEle);
  return nDOMEle;
}

export function getDOMObject (dom) {
  return (domMap.has(dom) && domMap.get(dom)) || null;
}

export function rmDOMObject (dom) {
  if (!domMap.has(dom)) {
    return;
  }
  clearEvents();
  domMap.delete(dom);
}

export function getEvent (dom) {
  let DOMEle = getDOMObject(dom);
  if (!DOMEle) return null;
  return DOMEle.e;
}

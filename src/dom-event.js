/**
 * @author hudk
 * 原生事件操作方法
 * 注册与移除
 */
import { addModifier, getMouseType, convertKeyFromEvent } from './convert-key';
import { getEvent, getDOMObject } from './data/dom';

/**
 * add events for events
 * @param {*} dom
 */
export function addEvents (dom) {
  if (!dom) return;

  // TODO dom元素！
  const bubble = {
    keydown: e => {
      let eventBut = getEvent(dom);
      eventBut.trigger(convertKeyFromEvent(e, 'keydown'), e);
    },
    click: e => {
      let eventBut = getEvent(dom);
      eventBut.trigger(
        addModifier(e)
          .concat(getMouseType(e))
          .concat('click'),
        e
      );
    },
    wheel: e => {
      let eventBut = getEvent(dom);
      eventBut.trigger(addModifier(e).concat('wheel'), e);
    }
  };
  const capture = {
    keydown: e => {
      let eventBut = getEvent(dom);
      eventBut.trigger(convertKeyFromEvent(e, 'keydown', { capture: true }), e);
    },
    click: e => {
      let eventBut = getEvent(dom);
      eventBut.trigger(
        addModifier(e)
          .concat(getMouseType(e))
          .concat('click', 'capture'),
        e
      );
    },
    wheel: e => {
      let eventBut = getEvent(dom);
      eventBut.trigger(addModifier(e).concat('wheel', 'capture'), e);
    }
  };

  Object.keys(bubble).forEach(key => {
    dom.addEventListener(key, bubble[key]);
  });
  Object.keys(capture).forEach(key => {
    dom.addEventListener(key, capture[key], true);
  });

  return {
    bubble,
    capture
  };
}

export function clearEvents (
  dom,
  events = (getDOMObject(dom) && getDOMObject(dom).events) || null
) {
  if (!events) return;
  let { bubble = {}, capture = {} } = events;

  Object.keys(bubble).forEach(key => {
    dom.removeEventListener(key, bubble[key]);
  });
  Object.keys(capture).forEach(key => {
    dom.removeEventListener(key, capture[key], true);
  });
}

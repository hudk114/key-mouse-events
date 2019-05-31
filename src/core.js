/**
 * core api constructor
 * @author alexdkhu
 */

import { convertKeyFromConfig } from './convert-key';
import { getEvent } from './data/dom';

/**
 * 增加组合事件
 * @param {string} key 按键组合 shift+control+a
 * @param {function} cal 回调
 * @param {object} options // TODO
 */
export const core = dom => {
  let addKeyMouseEvent = (key, cal, options) => {
    let eventBut = getEvent(dom);
    eventBut.on(convertKeyFromConfig(key, options), cal);
  };
  let addKeyMouseEvents = (config, options) => {
    Object.keys(config).forEach(key =>
      addKeyMouseEvent(key, config[key], options)
    );
  };
  let removeKeyMouseEvent = (key, cal, options) => {
    let eventBut = getEvent(dom);
    eventBut.remove(convertKeyFromConfig(key, options), cal);
  };
  let removeKeyMouseEvents = (config, options) => {
    Object.keys(config).forEach(key =>
      removeKeyMouseEvent(key, config[key], options)
    );
  };

  return {
    addKeyMouseEvent,
    addKeyMouseEvents,
    removeKeyMouseEvent,
    removeKeyMouseEvents
  };
};

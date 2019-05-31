/**
 * @author hudk
 * 已知问题 我们没有问题！
 */
import { InitDOMObject, getDOMObject } from './data/dom';

export const addDOMEvents = (dom = window) => {
  let {
    addKeyMouseEvent,
    addKeyMouseEvents,
    removeKeyMouseEvent,
    removeKeyMouseEvents
  } = getDOMObject(dom) || InitDOMObject(dom);

  return {
    addKeyMouseEvent,
    addKeyMouseEvents,
    removeKeyMouseEvent,
    removeKeyMouseEvents
  };
};

export const removeDOMEvents = (dom = window) => {
  //   let k = getDOMObject(dom);
  //   if (!k) return;
  // TODO 返回对应的，如果没有，删除整个事件
  //   if (false) rmDOMObject();
};

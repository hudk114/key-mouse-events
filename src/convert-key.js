import { keyEventPropName } from './env';
import { ALL, MODIFIER, standardize } from './key-map';
import { isMouse, mouseType } from './mouse-map';
import { isModifier } from './utils';

function convertKey (key) {
  let k = standardize(key);

  if (ALL[k]) {
    let x = ALL[k][keyEventPropName];
    // x是数组的话返回第一项即可，否则直接返回
    // 比对都通过第一项比对
    return Array.isArray(x) ? x[0] : x;
  }
  return k;
}

function convertMouseType (mouse) {
  switch (mouse) {
    default:
    case 'left':
      return 'leftClick';
    case 'mid':
    case 'center':
      return 'midClick';
    case 'right':
      return 'rightClick';
  }
}

function convertKeyboardType (keyboard) {
  switch (keyboard) {
    default:
    case 'down':
      return 'keydown';
    case 'up':
      return 'keyup';
    case 'press':
      return 'keypress';
  }
}

/**
 * 转换type
 * @param {string} param0.mouse
 * @param {string} param0.keyboard
 * @param {*} arr
 */
function convertType ({ mouse, keyboard } = {}, arr) {
  // 滚轮事件不需要type
  if (arr[arr.length - 1] === 'wheel') {
    return null;
  }

  // 如果两项都设置或没设置，根据arr的最后一项来判断使用哪个
  if ((mouse && keyboard) || !(mouse || keyboard)) {
    if (isMouse(arr[arr.length - 1])) {
      return convertMouseType(mouse);
    } else {
      return convertKeyboardType(keyboard);
    }
  }

  if (mouse) return convertMouseType(mouse);
  if (keyboard) return convertKeyboardType(keyboard);
}

/**
 * 将keys里面的每一项转化为对应env所用的 key 或 keyCode
 * @param {array} keys 原始的key
 */
function convertArrayToProp (keys, type, capture) {
  let s = keys.map(key => convertKey(key));
  type && s.push(type);
  capture && s.push('capture');
  return s;
}

export function convertKeyFromConfig (raw, options = {}) {
  // convertKey
  let arr = raw.split('+');
  if (!arr.length) {
    throw new TypeError('[key-mouse-event] you define a wrong key!');
  }

  // 对于shift++这种会造成两个''，对于这种转化为+
  while (true) {
    let index = arr.indexOf('');
    if (index < 0) {
      return convertArrayToProp(
        arr,
        convertType(options, arr),
        options.capture
      );
    }

    // 只有一个''说明传错了
    if (arr[index + 1] !== '') {
      throw new TypeError('[key-mouse-event] you define a wrong key!');
    }
    arr.splice(index, 2, '+');
  }
}

// 根据当前事件添加转换出modifier
export function addModifier (e) {
  return Object.values(MODIFIER)
    .filter(item => e[item.type])
    .map(obj => {
      let item = obj[keyEventPropName];
      if (Array.isArray(item)) {
        return item[0];
      } else {
        return item;
      }
    });
}

export function convertKeyFromEvent (e, type, { capture } = {}) {
  if (isModifier(e)) {
    return addModifier(e).concat(type);
  }

  // convertKey
  let k = e[keyEventPropName];

  // 找到对应比较数组
  let item = Object.values(ALL)
    .map(item => item[keyEventPropName])
    // 找到对应项
    .find(item => {
      if (Array.isArray(item)) return item.includes(k);
      return item === k;
    });
  if (!item) return []; // TODO 说明没有覆盖全 option+任意按键有key值不正确的问题

  k = Array.isArray(item) ? item[0] : item;
  let keys = addModifier(e).concat(k, type);
  return capture ? keys.concat('capture') : keys;
}

export function getMouseType (e) {
  let type = Object.keys(mouseType).find(t => e.button === mouseType[t]);
  if (type) {
    return type;
  }
}

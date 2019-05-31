import { keyEventPropName } from './env';
import { MODIFIER } from './key-map';

export function isModifier (e) {
  return !!Object.values(MODIFIER)
    .map(obj => obj[keyEventPropName])
    .find(item => {
      if (Array.isArray(item)) {
        return item.includes(e[keyEventPropName]);
      } else {
        return item === e[keyEventPropName];
      }
    });
}

export default function expect (val) {
  return {
    isString () {
      return typeof val === 'string';
    },
    isNumber () {
      return typeof val === 'number';
    },
    isBoolean () {
      return typeof val === 'boolean';
    },
    isArray () {
      return Array.isArray(val);
    },
    isNull () {
      return val === null;
    },
    isUndefined () {
      return typeof val === 'undefined';
    },
    isSymbol () {
      return typeof val === 'symbol';
    },
    // 是基础类型
    isBasic () {
      return (
        this.isString() ||
        this.isNumber() ||
        this.isBoolean() ||
        this.isNullOrUndefined() ||
        this.isSymbol()
      );
    },
    isFunction () {
      return typeof val === 'function';
    },
    isObj () {
      return typeof val === 'object' && !this.isArray() && !this.isNull();
    },
    isNullOrUndefined () {
      return this.isNull() || this.isUndefined();
    }
  };
}

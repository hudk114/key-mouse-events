(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global['key-mouse-event'] = {})));
}(this, (function (exports) { 'use strict';

  /**
   * env.js用于判断是否可以使用新特性
   * 老版本浏览器支持的一些功能在新版标准里已被取消
   * 在某些浏览器（如ipad上的safari）中，部分老版本标准已经不支持
   * 所以会先判断最新api
   */

  // 使用env.key or env.keyCode
  var keyEventPropName = function () {
    // TODO
    // return 'key';
    return 'keyCode';
  }();

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var MODIFIER = {
    control: {
      key: 'Control',
      keyCode: 17,
      type: 'ctrlKey'
    },
    command: {
      key: 'Meta',
      keyCode: [93, 91],
      type: 'metaKey'
    },
    alt: {
      key: 'Alt',
      keyCode: 18,
      type: 'altKey'
    },
    shift: {
      key: 'Shift',
      keyCode: 16,
      type: 'shiftKey'
    }
  };

  var c = {};
  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].forEach(function (key, index) {
    c[key] = {
      // 兼容大小写，chrome已知问题
      key: [key, key.toUpperCase()],
      // keyCode: [index + 65, index + 97]
      keyCode: index + 65
    };
  });

  var num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map(function (key, index) {
    return {
      key: key,
      keyCode: [index + 48, index + 96]
    };
  });

  var COMMON = _extends({}, c, num, {
    '[': {
      key: '[',
      keyCode: 219
    },
    ']': {
      key: ']',
      keyCode: 221
    },
    '\\': {
      key: '\\',
      keyCode: 220
    },
    ';': {
      key: ';',
      keyCode: 186
    },
    "'": {
      key: "'",
      keyCode: 222
    },
    ',': {
      key: ',',
      keyCode: 188
    },
    '.': {
      key: '.',
      keyCode: 190
    },
    '/': {
      key: '/',
      keyCode: 191
    },
    '`': {
      key: '`',
      keyCode: 192
    }
  });

  var DIRECTION = {
    left: {
      key: ['ArrowLeft'],
      keyCode: 37
    },
    right: {
      key: ['ArrowRight'],
      keyCode: 39
    },
    up: {
      key: ['ArrowUp'],
      keyCode: 38
    },
    down: {
      key: ['ArrowDown'],
      keyCode: 40
    }
  };

  var FUNCTION = {
    esc: {
      key: ['Escape'],
      keyCode: 27
    },
    enter: {
      key: ['Enter', 'enter'],
      keyCode: 13
    },
    space: {
      key: ' ',
      keyCode: 32
    },
    backspace: {
      key: 'Backspace',
      keyCode: 8
    },
    delete: {
      key: 'Delete',
      keyCode: 46
    },
    pagedown: {
      key: 'PageDown',
      keyCode: 34
    },
    pageup: {
      key: 'PageUp',
      keyCode: 33
    },
    tab: {
      key: 'Tab',
      keyCode: 9
    },
    home: {
      key: 'Home',
      keyCode: 36
    },
    end: {
      key: 'End',
      keyCode: 35
    }
  };

  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(function (num) {
    FUNCTION['f' + num] = {
      key: ['f' + num, 'F' + num],
      keyCode: 111 + num
    };
  });

  var ALL = _extends({}, MODIFIER, COMMON, DIRECTION, FUNCTION);

  // 规范化key
  function standardize(key) {
    switch (key.toLowerCase()) {
      case 'ctrl':
      case 'control':
        return 'control';
      case 'command':
      case 'meta':
      case 'window':
        return 'command';
      case 'shift':
        return 'shift';
      case 'alt':
      case 'option':
        return 'alt';
      case 'escape':
        return 'esc';
      default:
        return key.toLowerCase();
    }
  }

  function isMouse(key) {
    return ['click', 'dblclick', 'mousedown', 'mouseup', 'sglclick', 'wheel'].includes(key);
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  function isModifier(e) {
    return !!Object.values(MODIFIER).map(function (obj) {
      return obj[keyEventPropName];
    }).find(function (item) {
      if (Array.isArray(item)) {
        return item.includes(e[keyEventPropName]);
      } else {
        return item === e[keyEventPropName];
      }
    });
  }

  function expect(val) {
    return {
      isString: function isString() {
        return typeof val === 'string';
      },
      isNumber: function isNumber() {
        return typeof val === 'number';
      },
      isBoolean: function isBoolean() {
        return typeof val === 'boolean';
      },
      isArray: function isArray() {
        return Array.isArray(val);
      },
      isNull: function isNull() {
        return val === null;
      },
      isUndefined: function isUndefined() {
        return typeof val === 'undefined';
      },
      isSymbol: function isSymbol() {
        return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'symbol';
      },

      // 是基础类型
      isBasic: function isBasic() {
        return this.isString() || this.isNumber() || this.isBoolean() || this.isNullOrUndefined() || this.isSymbol();
      },
      isFunction: function isFunction() {
        return typeof val === 'function';
      },
      isObj: function isObj() {
        return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && !this.isArray() && !this.isNull();
      },
      isNullOrUndefined: function isNullOrUndefined() {
        return this.isNull() || this.isUndefined();
      }
    };
  }

  function convertKey(key) {
    var k = standardize(key);

    if (ALL[k]) {
      var x = ALL[k][keyEventPropName];
      // x是数组的话返回第一项即可，否则直接返回
      // 比对都通过第一项比对
      return Array.isArray(x) ? x[0] : x;
    }
    return k;
  }

  function convertMouseType(mouse) {
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

  function convertKeyboardType(keyboard) {
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
  function convertType() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        mouse = _ref.mouse,
        keyboard = _ref.keyboard;

    var arr = arguments[1];

    // 滚轮事件不需要type
    if (arr[arr.length - 1] === 'wheel') {
      return null;
    }

    // 如果两项都设置或没设置，根据arr的最后一项来判断使用哪个
    if (mouse && keyboard || !(mouse || keyboard)) {
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
  function convertArrayToProp(keys, type, capture) {
    var s = keys.map(function (key) {
      return convertKey(key);
    });
    type && s.push(type);
    capture && s.push('capture');
    return s;
  }

  function convertKeyFromConfig(raw) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // convertKey
    var arr = raw.split('+');
    if (!arr.length) {
      throw new TypeError('[key-mouse-event] you define a wrong key!');
    }

    // 对于shift++这种会造成两个''，对于这种转化为+
    while (true) {
      var index = arr.indexOf('');
      if (index < 0) {
        return convertArrayToProp(arr, convertType(options, arr), options.capture);
      }

      // 只有一个''说明传错了
      if (arr[index + 1] !== '') {
        throw new TypeError('[key-mouse-event] you define a wrong key!');
      }
      arr.splice(index, 2, '+');
    }
  }

  // 根据当前事件添加转换出modifier
  function addModifier(e) {
    return Object.values(MODIFIER).filter(function (item) {
      return e[item.type];
    }).map(function (obj) {
      var item = obj[keyEventPropName];
      if (Array.isArray(item)) {
        return item[0];
      } else {
        return item;
      }
    });
  }

  function convertKeyFromEvent(e, type) {
    var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        capture = _ref2.capture;

    if (isModifier(e)) {
      return addModifier(e).concat(type);
    }

    // convertKey
    var k = e[keyEventPropName];

    // 找到对应比较数组
    var item = Object.values(ALL).map(function (item) {
      return item[keyEventPropName];
    })
    // 找到对应项
    .find(function (item) {
      if (Array.isArray(item)) return item.includes(k);
      return item === k;
    });
    if (!item) return []; // TODO 说明没有覆盖全 option+任意按键有key值不正确的问题

    k = Array.isArray(item) ? item[0] : item;
    var keys = addModifier(e).concat(k, type);
    return capture ? keys.concat('capture') : keys;
  }

  /**
   * core api constructor
   * @author alexdkhu
   */

  /**
   * 增加组合事件
   * @param {string} key 按键组合 shift+control+a
   * @param {function} cal 回调
   * @param {object} options // TODO
   */
  var core = function core(dom) {
    var addKeyMouseEvent = function addKeyMouseEvent(key, cal, options) {
      var eventBut = getEvent(dom);
      eventBut.on(convertKeyFromConfig(key, options), cal);
    };
    var addKeyMouseEvents = function addKeyMouseEvents(config, options) {
      Object.keys(config).forEach(function (key) {
        return addKeyMouseEvent(key, config[key], options);
      });
    };
    var removeKeyMouseEvent = function removeKeyMouseEvent(key, cal, options) {
      var eventBut = getEvent(dom);
      eventBut.remove(convertKeyFromConfig(key, options), cal);
    };
    var removeKeyMouseEvents = function removeKeyMouseEvents(config, options) {
      Object.keys(config).forEach(function (key) {
        return removeKeyMouseEvent(key, config[key], options);
      });
    };

    return {
      addKeyMouseEvent: addKeyMouseEvent,
      addKeyMouseEvents: addKeyMouseEvents,
      removeKeyMouseEvent: removeKeyMouseEvent,
      removeKeyMouseEvents: removeKeyMouseEvents
    };
  };

  var compareArr = function compareArr(arr1, arr2) {
    if (arr1.length !== arr2.length || arr1.find(function (item) {
      return !arr2.includes(item);
    })) return false;
    return true;
  };

  var compareString = function compareString(str1, str2) {
    return str1 === str2;
  };

  var compareNum = function compareNum(num1, num2) {
    return num1 === num2;
  };

  // obj要求指向同一对象
  var compareObj = function compareObj(obj1, obj2) {
    return obj1 === obj2;
  };

  function compareFactory(val) {
    var v = expect(val);
    if (v.isArray()) return compareArr;
    if (v.isObj()) return compareObj;
    if (v.isNumber()) return compareNum;
    if (v.isString()) return compareString;

    return function () {};
  }

  function compareType(val1, val2) {
    var v1 = expect(val1);
    var v2 = expect(val2);

    return v1.isArray() && v2.isArray() || v1.isObj() && v2.isObj() || v1.isNumber() && v2.isNumber() || v1.isString() && v2.isString();
  }

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var Event = function () {
    function Event(key) {
      _classCallCheck(this, Event);

      this.key = key;
      // this.map = new Map(key);
      this.items = [];
    }

    _createClass(Event, [{
      key: '_addItem',
      value: function _addItem(key) {
        var item = this._getItem(key);
        if (item) return item;
        item = {
          key: key,
          funcs: []
        };
        this.items.push(item);
        return item;
      }
    }, {
      key: '_getItem',
      value: function _getItem(key) {
        return this.items.filter(function (item) {
          return compareType(key, item.key);
        }).find(function (item) {
          return compareFactory(key)(key, item.key);
        });
      }
    }, {
      key: '_rmItem',
      value: function _rmItem(key) {
        var item = this._getItem(key);
        if (!item) return;
        var index = this.items.indexOf(item);
        this.items.splice(index, 1);
      }

      // _initItem (key) {
      //   this.map.set(key, []);
      //   return this._getItem(key);
      // }

      // _getItem (key) {
      //   return this.map.get(key);
      // }

      // _rmItem (key) {
      //   let k = this._getItem(key);
      //   this.map.delete(key);
      //   return k;
      // }

    }, {
      key: 'on',
      value: function on(key, cal) {
        var item = this._getItem(key) || this._addItem(key);
        item.funcs.includes(cal) || item.funcs.push(cal);
      }
    }, {
      key: 'trigger',
      value: function trigger(key) {
        for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          rest[_key - 1] = arguments[_key];
        }

        var item = this._getItem(key);
        if (!item) return;
        item.funcs.map(function (cal) {
          return cal.apply(null, rest);
        });
      }
    }, {
      key: 'remove',
      value: function remove(key, cal) {
        var item = this._getItem(key);
        if (!item) return;
        var i = item.funcs.findIndex(function (item) {
          return item === cal;
        });
        i && i > -1 && item.funcs.splice(i, 1);
      }
    }, {
      key: 'removeAll',
      value: function removeAll(key) {
        var item = this._getItem(key);
        if (item) {
          item.funcs.splice(0, item.funcs.length - 1);
        }
        this._rmItem(key);
      }
    }]);

    return Event;
  }();

  /**
   * @author hudk
   * 原生事件操作方法
   * 注册与移除
   */

  /**
   * add events for events
   * @param {*} dom
   */
  function addEvents(dom) {
    if (!dom) return;

    // TODO dom元素！
    var bubble = {
      keydown: function keydown(e) {
        var eventBut = getEvent(dom);
        eventBut.trigger(convertKeyFromEvent(e, 'keydown'), e);
      }
      // },
      // click: e => {
      //   let eventBut = getEvent(dom);
      //   eventBut.trigger(
      //     addModifier(e)
      //       .concat(getMouseType(e))
      //       .concat('click', 'bubble'),
      //     e
      //   );
      // },
      // wheel: e => {
      //   let eventBut = getEvent(dom);
      //   eventBut.trigger(addModifier(e).concat('wheel', 'bubble'), e);
      // }
    };
    var capture = {
      keydown: function keydown(e) {
        var eventBut = getEvent(dom);
        eventBut.trigger(convertKeyFromEvent(e, 'keydown', { capture: true }), e);
      }
      // },
      // click: e => {
      //   let eventBut = getEvent(dom);
      //   eventBut.trigger(
      //     addModifier(e)
      //       .concat(getMouseType(e))
      //       .concat('click'),
      //     e
      //   );
      // },
      // wheel: e => {
      //   let eventBut = getEvent(dom);
      //   eventBut.trigger(addModifier(e).concat('wheel'), e);
      // }
    };

    Object.keys(bubble).forEach(function (key) {
      dom.addEventListener(key, bubble[key]);
    });
    Object.keys(capture).forEach(function (key) {
      dom.addEventListener(key, capture[key], true);
    });

    return {
      bubble: bubble,
      capture: capture
    };
  }

  var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var domMap = new Map();

  function InitDOMObject(dom) {
    var nDOMEle = _extends$1({
      e: new Event(),
      events: addEvents(dom)
    }, core(dom));
    domMap.set(dom, nDOMEle);
    return nDOMEle;
  }

  function getDOMObject(dom) {
    return domMap.has(dom) && domMap.get(dom) || null;
  }

  function getEvent(dom) {
    var DOMEle = getDOMObject(dom);
    if (!DOMEle) return null;
    return DOMEle.e;
  }

  /**
   * @author hudk
   * 已知问题 我们没有问题！
   */

  var addDOMEvents = function addDOMEvents() {
    var dom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

    var _ref = getDOMObject(dom) || InitDOMObject(dom),
        addKeyMouseEvent = _ref.addKeyMouseEvent,
        addKeyMouseEvents = _ref.addKeyMouseEvents,
        removeKeyMouseEvent = _ref.removeKeyMouseEvent,
        removeKeyMouseEvents = _ref.removeKeyMouseEvents;

    return {
      addKeyMouseEvent: addKeyMouseEvent,
      addKeyMouseEvents: addKeyMouseEvents,
      removeKeyMouseEvent: removeKeyMouseEvent,
      removeKeyMouseEvents: removeKeyMouseEvents
    };
  };

  var removeDOMEvents = function removeDOMEvents() {
  };

  exports.addDOMEvents = addDOMEvents;
  exports.removeDOMEvents = removeDOMEvents;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

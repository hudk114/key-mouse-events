export const MODIFIER = {
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

const c = {};
[
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
].forEach((key, index) => {
  c[key] = {
    // 兼容大小写，chrome已知问题
    key: [key, key.toUpperCase()],
    // keyCode: [index + 65, index + 97]
    keyCode: index + 65
  };
});

const num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map(
  (key, index) => ({
    key,
    keyCode: [index + 48, index + 96]
  })
);

export const COMMON = {
  ...c,
  ...num,
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
};

export const DIRECTION = {
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

export const FUNCTION = {
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

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(num => {
  FUNCTION[`f${num}`] = {
    key: [`f${num}`, `F${num}`],
    keyCode: 111 + num
  };
});

export const ALL = {
  ...MODIFIER,
  ...COMMON,
  ...DIRECTION,
  ...FUNCTION
};

// 判断key是不是keyevent
export function isKey (key) {
  return !!ALL[standardize(key)];
}

// 规范化key
export function standardize (key) {
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

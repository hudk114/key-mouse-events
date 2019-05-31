import { addDOMEvents } from '@utils/new-key-mouse-event';

[
  'a'
  // 'ctrl+a',
  // 'ctrl+b',
  // 'ctrl+c',
  // 'command+c',
  // 'command+v',
  // 'ctrl+d',
  // 'ctrl+e',
  // 'ctrl+f',
  // 'ctrl+g',
  // 'ctrl+h',
  // 'ctrl+i',
  // 'ctrl+j',
  // 'ctrl+k',
  // 'ctrl+l',
  // 'ctrl+m',
  // 'ctrl+n',
  // 'ctrl+o',
  // 'ctrl+p',
  // 'ctrl+q',
  // 'ctrl+r',
  // 'ctrl+s',
  // 'ctrl+t',
  // 'ctrl+u',
  // 'ctrl+v',
  // 'ctrl+w',
  // 'ctrl+x',
  // 'ctrl+y',
  // 'ctrl+z',

  // 'ctrl+f4',
  // 'ctrl+f5',
  // 'ctrl+f6',
  // 'ctrl+f9',
  // 'ctrl+f10',

  // 'ctrl+shift+c',
  // 'ctrl+shift+v',
  // 'ctrl+shift+f',
  // 'ctrl+shift+p',
  // 'ctrl+shift+g',
  // 'ctrl+shift+h',

  // 'ctrl+[',
  // 'ctrl+]',

  // 'alt+f5',
  // 'alt+f10',
  // 'alt+f9',

  // 'alt+s',
  // 'alt+n',
  // 'alt+u',

  // 'shift+f3',
  // 'shift+f4',
  // 'shift+f5',
  // 'shift+f9',
  // 'shift+f10',

  // 'f2',
  // 'f4',
  // 'f5',
  // 'f12',

  // 'e',
  // 'w',
  // 'space',
  // 'click',
  // 'esc',
  // 'b',
  // 'enter',

  // 'up',
  // 'down',
  // 'left',
  // 'right',

  // 'shift+click',

  // 'sglclick',
  // 'shift+sglclick',
  // 'dblclick',
  // 'alt+dblclick',

  // 'shift+wheel',
  // 'alt+wheel',
  // 'ctrl+wheel',
  // 'command+wheel',
  // 'backspace',

  // 'command+0',
].forEach(key => {
  addDOMEvents(window).addKeyMouseEvent(key, e => {
    console.log(`[sss] ${key}`);
  });
});

// addKeyMouseEvent('click', e => {
//     console.log('right click');
// }, {
//     mouse: 'right'
// });

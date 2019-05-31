export function isMouse (key) {
  return [
    'click',
    'dblclick',
    'mousedown',
    'mouseup',
    'sglclick',
    'wheel'
  ].includes(key);
}

export const mouseType = {
  leftClick: 0,
  midClick: 1,
  rightClick: 2
};

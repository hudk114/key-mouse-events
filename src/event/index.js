import { compareFactory, compareType } from './compare';

export class Event {
  constructor (key) {
    this.key = key;
    // this.map = new Map(key);
    this.items = [];
  }

  _addItem (key) {
    let item = this._getItem(key);
    if (item) return item;
    item = {
      key,
      funcs: []
    };
    this.items.push(item);
    return item;
  }

  _getItem (key) {
    return this.items
      .filter(item => compareType(key, item.key))
      .find(item => compareFactory(key)(key, item.key));
  }

  _rmItem (key) {
    let item = this._getItem(key);
    if (!item) return;
    let index = this.items.indexOf(item);
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

  on (key, cal) {
    let item = this._getItem(key) || this._addItem(key);
    item.funcs.includes(cal) || item.funcs.push(cal);
  }

  trigger (key, ...rest) {
    let item = this._getItem(key);
    if (!item) return;
    item.funcs.map(cal => cal.apply(null, rest));
  }

  remove (key, cal) {
    let item = this._getItem(key);
    if (!item) return;
    let i = item.funcs.findIndex(item => item === cal);
    i && i > -1 && item.funcs.splice(i, 1);
  }

  removeAll (key) {
    let item = this._getItem(key);
    if (item) {
      item.funcs.splice(0, item.funcs.length - 1);
    }
    this._rmItem(key);
  }
}

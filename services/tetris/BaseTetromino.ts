import { Grid } from './interface';
import { deepClone } from './utils';

export default class BaseTetromino {
  static createEmptyGrid(width: number, height: number): Grid {
    const res = [];
    for (let i = 0; i < height; i++) {
      res.push(
        new Array(width)
          .join(',')
          .split(',')
          .map(() => undefined)
      );
    }
    return res;
  }

  posX = 0;
  poxY = 0;

  protected _current: Grid;
  protected _width: number;
  protected _height: number;
  protected _value: number;

  constructor(width: number, height: number, value: number) {
    this._width = width;
    this._height = height;
    this._value = value;
    this._current = BaseTetromino.createEmptyGrid(width, height);
    this._init();
  }

  down(commit = false): Grid | false {
    const temp = deepClone(this._current);
    const last = temp[temp.length - 1];
    const item = last.find((item) => !!item);
    if (item) return false;
    temp.unshift(
      new Array(this._width)
        .join(',')
        .split(',')
        .map(() => undefined)
    );
    temp.splice(temp.length - 1, 1);
    if (commit) this._current = temp;
    return temp;
  }

  up(commit = false): Grid | false {
    const temp = deepClone(this._current);
    const first = temp[0];
    const item = first.find((item) => !!item);
    if (item) return false;
    temp.splice(0, 1);
    temp.push(
      new Array(this._width)
        .join(',')
        .split(',')
        .map(() => undefined)
    );
    if (commit) this._current = temp;
    return temp;
  }

  left(commit = false): Grid | false {
    const temp = deepClone(this._current);
    const left = temp.map((item) => item[0]);
    const item = left.find((item) => !!item);
    if (item) return false;
    temp.forEach((item) => {
      item.splice(0, 1);
      item.push(undefined);
    });
    if (commit) this._current = temp;
    return temp;
  }

  right(commit = false): Grid | false {
    const temp = deepClone(this._current);
    const right = temp.map((item) => item[item.length - 1]);
    const item = right.find((item) => !!item);
    if (item) return false;
    temp.forEach((item) => {
      item.unshift(undefined);
      item.splice(item.length - 1, 1);
    });
    if (commit) this._current = temp;
    return temp;
  }

  transform(commit): Grid | false {
    return false;
  }

  nextState(): void {
    // noop
  }

  get current(): Grid {
    return this._current;
  }

  set current(value: Grid) {
    this._current = value;
  }

  protected _init() {
    // noop
  }
}

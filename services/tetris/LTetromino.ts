import BaseTetromino from './BaseTetromino';
import { Grid } from './interface';

export default class LTetromino extends BaseTetromino {
  static _getPosArray(status: number) {
    switch (status) {
      case 1:
        return [
          [0, 0],
          [1, 0],
          [2, 0],
          [2, 1]
        ];
      case 2:
        return [
          [0, 0],
          [0, 1],
          [0, 2],
          [1, 0]
        ];
      case 3:
        return [
          [0, 0],
          [0, 1],
          [1, 1],
          [2, 1]
        ];
      default:
        return [
          [0, 2],
          [1, 0],
          [1, 1],
          [1, 2]
        ];
    }
  }

  status = 0;

  transform(commit): Grid | false {
    const temp = LTetromino.createEmptyGrid(this._width, this._height);
    const posArray = LTetromino._getPosArray(this.status + 1);
    let y = this.poxY;
    if (this.poxY > 0) {
      if (this.status === 0 || this.status === 2) {
        y--;
      }
    }
    const width = this.status === 0 || this.status === 2 ? 2 : 3;
    let x = Math.floor((this._width - width - 1) / 2) + this.posX;
    if (x < 0) x = 0;
    if (x + width + 1 > this._width) x = this._width - width - 1;
    posArray.forEach((array) => {
      temp[y + array[0]][x + 1 + array[1]] = this._value;
    });
    if (commit) this._current = temp;
    return temp;
  }

  nextState(): void {
    this.status = (this.status + 1) % 4;
  }

  protected _init() {
    this.status = 0;
    const left = Math.floor((this._width - 4) / 2);
    const posArray = LTetromino._getPosArray(this.status);
    posArray.forEach((array) => {
      this.current[array[0]][left + 1 + array[1]] = this._value;
    });
  }
}

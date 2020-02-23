import BaseTetromino from './BaseTetromino';
import { Grid } from './interface';

export default class ITetromino extends BaseTetromino {
  static _getPosArray(status: boolean) {
    return status
      ? [
          [0, 0],
          [0, 1],
          [0, 2],
          [0, 3]
        ]
      : [
          [0, 0],
          [1, 0],
          [2, 0],
          [3, 0]
        ];
  }

  status = true;

  transform(commit): Grid | false {
    const temp = ITetromino.createEmptyGrid(this._width, this._height);
    const posArray = ITetromino._getPosArray(!this.status);
    let y = this.poxY;
    if (this.status) {
      y = Math.max(0, y - 2);
    }
    const width = this.status ? 1 : 4;
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
    this.status = !this.status;
  }

  protected _init() {
    this.status = true;
    const left = Math.floor((this._width - 5) / 2);
    const posArray = ITetromino._getPosArray(this.status);
    posArray.forEach((array) => {
      this.current[array[0]][left + 1 + array[1]] = this._value;
    });
  }
}

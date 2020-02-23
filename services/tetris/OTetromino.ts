import BaseTetromino from './BaseTetromino';

export default class OTetromino extends BaseTetromino {
  protected _init() {
    const left = Math.floor((this._width - 3) / 2);
    this.current[0][left + 1] = this._value;
    this.current[0][left + 2] = this._value;
    this.current[1][left + 1] = this._value;
    this.current[1][left + 2] = this._value;
  }
}

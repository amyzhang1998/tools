import BaseTetromino from './BaseTetromino';
import { Grid } from './interface';
import LTetromino from './LTetromino';

const tetrominoList: Array<typeof BaseTetromino> = [LTetromino];

export const tetrominoValueMap = new Map<typeof BaseTetromino, number>();
tetrominoList.forEach((type, index) => {
  tetrominoValueMap.set(type, index + 1);
});

export function randomTetromino(): typeof BaseTetromino {
  const index = Math.floor(Math.random() * tetrominoList.length);
  return tetrominoList[index];
}

export interface TetriContainerOption {
  width?: number;
  height?: number;
}

const defaultOpt: Required<TetriContainerOption> = {
  width: 10,
  height: 20
};

export default class TetriContainer {
  static validateGrid(a: Grid, b: Grid): boolean {
    if (a.length !== b.length) return false;
    if (!a[0] || !b[0]) return false;
    if (a[0].length !== b[0].length) return false;

    const tempA = a.map((array, row) => {
      return array.map((item, col) => {
        return !!a[row][col] !== !!b[row][col];
      });
    });
    const tempB = a.map((array, row) => {
      return array.map((item, col) => {
        return !!a[row][col] || !!b[row][col];
      });
    });
    for (let i = 0; i < tempA.length; i++) {
      const array = tempA[i];
      for (let j = 0; j < array.length; j++) {
        if (tempA[i][j] !== tempB[i][j]) {
          return false;
        }
      }
    }

    return true;
  }

  private readonly _width: number;
  private readonly _height: number;
  private _current: BaseTetromino;
  private _container: Grid;

  constructor(option: TetriContainerOption) {
    const opt: Required<TetriContainerOption> = { ...defaultOpt, ...option };
    this._width = opt.width;
    this._height = opt.height;
    const Type = randomTetromino();
    this._container = BaseTetromino.createEmptyGrid(this._width, this._height);
    this._current = new Type(this._width, this._height, tetrominoValueMap.get(Type));
  }

  get grid(): Grid {
    return this._container.map((array, row) => {
      return array.map((item, col) => {
        return this._container[row][col] || this._current.current[row][col];
      });
    });
  }

  left() {
    const temp = this._current.left(false);
    if (!temp) return;
    if (!TetriContainer.validateGrid(temp, this._container)) return;
    this._current.current = temp;
    this._current.posX--;
  }

  right() {
    const temp = this._current.right(false);
    if (!temp) return;
    if (!TetriContainer.validateGrid(temp, this._container)) return;
    this._current.current = temp;
    this._current.posX++;
  }

  transform() {
    const temp = this._current.transform(false);
    if (!temp) return;
    if (!TetriContainer.validateGrid(temp, this._container)) return;
    this._current.current = temp;
  }

  down() {
    const temp = this._current.down(false);
    if (!temp) {
      this._nextTetromino();
      return;
    }
    if (!TetriContainer.validateGrid(temp, this._container)) {
      this._nextTetromino();
      return;
    }
    this._current.current = temp;
    this._current.poxY++;
  }

  private _nextTetromino() {
    this._container = this.grid;
    const Type = randomTetromino();
    this._current = new Type(this._width, this._height, tetrominoValueMap.get(Type));
  }
}

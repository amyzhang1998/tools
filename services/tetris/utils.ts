import { Grid } from './interface';

export function deepClone(grid: Grid): Grid {
  return grid.map((item) => [...item]);
}

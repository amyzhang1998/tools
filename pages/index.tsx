import React, { useState } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import LTetromino from '../services/tetris/LTetromino';
import styles from './index.scss';

const instance = new LTetromino(10, 20, 1);

const Home = () => {
  const [grid, setGrid] = useState(instance.current);

  function handleTransform(type: 'up' | 'down' | 'left' | 'right' | 'transform') {
    switch (type) {
      case 'up':
        instance.up(true);
        break;
      case 'down':
        instance.down(true);
        break;
      case 'left':
        instance.left(true);
        break;
      case 'right':
        instance.right(true);
        break;
      case 'transform':
        instance.transform(true);
        break;
    }
    setGrid(instance.current);
  }

  return (
    <div className={styles.root}>
      {grid.map((item, index) => {
        return (
          <div key={index} className={styles.row}>
            {item.map((subItem, subIndex) => {
              return (
                <span
                  key={subIndex}
                  className={classNames(styles.col, `color-${subItem || '0'}`)}
                />
              );
            })}
          </div>
        );
      })}
      <Button onClick={handleTransform.bind(null, 'up')}>Up</Button>
      <Button onClick={handleTransform.bind(null, 'down')}>Down</Button>
      <Button onClick={handleTransform.bind(null, 'left')}>Left</Button>
      <Button onClick={handleTransform.bind(null, 'right')}>Right</Button>
      <Button onClick={handleTransform.bind(null, 'transform')}>Transform</Button>
    </div>
  );
};

export default Home;

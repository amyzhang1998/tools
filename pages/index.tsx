import React, { useState } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import TetriContainer from '../services/tetris/TetriContainer';
import styles from './index.scss';

const instance = new TetriContainer({ width: 10, height: 20 });

const Home = () => {
  const [grid, setGrid] = useState(instance.grid);

  function handleTransform(type: 'up' | 'down' | 'left' | 'right' | 'transform') {
    switch (type) {
      case 'down':
        instance.down();
        break;
      case 'left':
        instance.left();
        break;
      case 'right':
        instance.right();
        break;
      case 'transform':
        instance.transform();
        break;
    }
    setGrid(instance.grid);
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
      <Button onClick={handleTransform.bind(null, 'down')}>Down</Button>
      <Button onClick={handleTransform.bind(null, 'left')}>Left</Button>
      <Button onClick={handleTransform.bind(null, 'right')}>Right</Button>
      <Button onClick={handleTransform.bind(null, 'transform')}>Transform</Button>
    </div>
  );
};

export default Home;

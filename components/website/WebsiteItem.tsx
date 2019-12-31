import React, { forwardRef, memo } from 'react';
import { WebsiteItem } from '../../services/website';
import styles from './WebsiteItem.scss';

export interface WebsiteItemProps {
  data: WebsiteItem;
}

export default memo<WebsiteItemProps>(
  forwardRef(function(props: WebsiteItemProps, ref: any) {
    const data = props.data;
    return (
      <a className={styles.root} href={data.url} target="_blank" ref={ref}>
        <img className={styles.icon} src={data.logo} />
        <span>{data.name}</span>
      </a>
    );
  })
);

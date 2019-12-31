import React, { forwardRef, memo, useCallback } from 'react';
import { Button, Col, Row } from 'antd';

import { WebsiteGroup } from '../../services/website';
import styles from './WebsiteGroup.scss';
import WebsiteItem from './WebsiteItem';
import { open } from './AddItemModal';

export interface WebsiteGroupProps {
  data: WebsiteGroup;
}

export default memo<WebsiteGroupProps>(
  forwardRef(function(props: WebsiteGroupProps, ref: any) {
    const { data } = props;

    const openAddModal = useCallback(() => {
      open(data.id);
    }, [data]);

    console.log(data.items);

    return (
      <div className={styles.root} ref={ref}>
        <div className={styles.nav}>
          <div className={styles.title}>{data.name}</div>
          <Button size="small" onClick={openAddModal}>
            添加
          </Button>
        </div>
        <Row gutter={20}>
          {data.items.map((item) => (
            <Col span={3} key={item.id}>
              <WebsiteItem data={item} />
            </Col>
          ))}
        </Row>
      </div>
    );
  })
);

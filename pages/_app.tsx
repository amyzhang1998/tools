import React from 'react';
import { Typography } from 'antd';
import NextApp from 'next/app';
import styles from './_app.scss';

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Typography>
        <div className={styles.root}>
          <div className={styles.content}>
            <Component {...pageProps} />
          </div>
          <div className={styles.foot}>
            <a className={styles.link} href="http://www.beian.miit.gov.cn/" target="_blank">
              浙ICP备19031225号
            </a>
          </div>
        </div>
      </Typography>
    );
  }
}

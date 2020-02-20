import React from 'react';
import { Menu } from 'antd';
import NextApp from 'next/app';
import Link from 'next/link';
import styles from './_app.scss';

const { Item: MenuItem } = Menu;

export default class App extends NextApp {
  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.main}>
          {router.asPath !== '/' && (
            <div className={styles.menu}>
              <Menu mode="inline" selectedKeys={[router.asPath]}>
                <MenuItem key="/website">
                  <Link href="/website">
                    <a>网址大全</a>
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          )}
          <div className={styles.content}>
            <Component {...pageProps} />
          </div>
        </div>
        <div className={styles.foot}>
          <a className={styles.link} href="http://www.beian.miit.gov.cn/" target="_blank">
            浙ICP备19031225号
          </a>
        </div>
      </div>
    );
  }
}

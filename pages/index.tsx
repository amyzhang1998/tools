import React from 'react';
import { Typography } from 'antd';
import styles from './index.scss';

const { Title } = Typography;

export interface HomeProps {
  url: string;
}

const Home = (props: HomeProps) => {
  const { url } = props;
  return <Title className={styles.root}>您的IP是:{url}</Title>;
};

Home.getInitialProps = async ({ req }): Promise<HomeProps> => {
  return {
    url: req.connection.remoteAddress
  };
};

export default Home;

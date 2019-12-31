import React from 'react';
import { getWebsiteGroups, WebsiteGroup } from '../services/website';
import WebsiteGroupComp from '../components/website/WebsiteGroup';

interface HomeProps {
  websites: WebsiteGroup[];
}

const Home = (props: HomeProps) => {
  const { websites } = props;
  return (
    <div>
      {websites.map((group) => (
        <WebsiteGroupComp key={group.id} data={group} />
      ))}
    </div>
  );
};

Home.getInitialProps = async () => {
  const groups = await getWebsiteGroups();
  return {
    websites: groups
  };
};

export default Home;

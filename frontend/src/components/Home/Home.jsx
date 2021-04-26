import React from 'react';
import Sidebar from '../common/Sidebar';

const Home = () => {
  return (
    <Sidebar defaultSelectedKeys="1">
      <h2 style={{ textAlign: 'center', paddingTop: '20px' }}>Welcome</h2>
    </Sidebar>
  );
};

export default Home;

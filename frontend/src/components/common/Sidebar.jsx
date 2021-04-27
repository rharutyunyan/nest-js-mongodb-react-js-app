import React, { useState } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { DesktopOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import RatingReviewElementLink from './RatingReviewElementLink';
const { Header, Content, Footer, Sider } = Layout;

const Sidebar = (props) => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));
  const { userId } = user;
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (pathname) => {
    if (pathname === '/login') {
      localStorage.removeItem('user');
    }
    history.push({
      pathname,
    });
  };

  return (
    <Row>
      <Col>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
            <div className="logo" style={{ height: '60px' }} />
            <Menu theme="dark" defaultSelectedKeys={[props.defaultSelectedKey]} mode="inline">
              <Menu.Item key="1" icon={<DesktopOutlined />} onClick={() => handleMenuClick('/')}>
                Home
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<UserOutlined />}
                onClick={() => handleMenuClick(`/users/${userId}`)}
              >
                My Account
              </Menu.Item>
              <Menu.Item
                key="3"
                icon={<PieChartOutlined />}
                onClick={() => handleMenuClick('/products')}
              >
                Products
              </Menu.Item>
              <Menu.Item
                key="4"
                icon={<PieChartOutlined />}
                onClick={() => handleMenuClick('/about')}
              >
                About
              </Menu.Item>
              <Menu.Item
                key="5"
                icon={<PieChartOutlined />}
                onClick={() => handleMenuClick('/login')}
              >
                Logout
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout" style={{ width: '100vw' }}>
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <RatingReviewElementLink />
            </Header>
            <Content style={{ margin: '16px' }}>
              <div className="site-layout-background">{props.children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Lokky ©2020</Footer>
          </Layout>
        </Layout>
      </Col>
    </Row>
  );
};

export default Sidebar;

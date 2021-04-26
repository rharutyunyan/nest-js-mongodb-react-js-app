import React, { useState, useEffect } from 'react';
import Sidebar from '../common/Sidebar';
import UserEditModal from './UserEditModal';
import { Spin, Row, Col, Card, Tabs } from 'antd';
import { config } from '../../configs';
import { getUser } from '../api';
import { EditOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { TabPane } = Tabs;

const User = (props) => {
  const myUser = JSON.parse(localStorage.getItem('user'));
  const { userId: myUserId } = myUser;
  const { match } = props;
  const { params } = match;
  const { userId } = params;
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUser(userId);
      setUser(result.data);
      setLoading(false);
    };
    fetchUser();
  }, [userId]);

  const userActions =
    userId === myUserId ? [<EditOutlined key="edit" onClick={() => setModalVisible(true)} />] : '';

  return (
    <Sidebar defaultSelectedKey="2">
      <Spin spinning={loading}>
        <Tabs type="card">
          <TabPane tab="User Details" key="1">
            <Row>
              <Col offset={8}>
                <Card
                  title={'User Details'}
                  style={{ width: 300, margin: '0 auto 20px' }}
                  cover={
                    user?.image && (
                      <img alt="example" src={`${config.APP_API_ENDPOINT}/${user.image}`} />
                    )
                  }
                  actions={userActions}
                >
                  <Meta title={`${user.firstName} ${user.lastName}`} description={user.email} />
                </Card>
                {modalVisible && (
                  <UserEditModal
                    user={user}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    setUser={setUser}
                  />
                )}
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Spin>
    </Sidebar>
  );
};

export default User;

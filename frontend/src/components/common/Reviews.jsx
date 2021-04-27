import React, { useState, useEffect } from 'react';
import { Spin, Button, Row, Col } from 'antd';
import ReviewCreateModal from './ReviewCreateModal';
import PropTypes from 'prop-types';
import Review from './Review';
import { getReview } from '../api';
import Sidebar from './Sidebar';
import { useHistory } from 'react-router-dom';

const Reviews = ({ user = null }) => {
  const myUser = JSON.parse(localStorage.getItem('user'));
  const { userId: myUserId } = myUser;
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [review, setReview] = useState();
  const history = useHistory();

  useEffect(() => {
    const fetchReview = async () => {
      const result = await getReview(myUserId);
      setReview(result.data);
      setLoading(false);
    };
    fetchReview();
  }, [myUserId]);

  return (
    <Sidebar defaultSelectedKeys="5">
      <Row>
        <Col offset={8}>
          <Spin spinning={loading}>
            {user && !review && (
              <Button type="primary" block onClick={() => setModalVisible(true)}>
                Add Review
              </Button>
            )}

            <ReviewCreateModal
              modalVisible={modalVisible}
              review={review}
              setModalVisible={setModalVisible}
              setReview={setReview}
              path={history.location.pathname}
            />
            {review && <Review key={review._id} review={review} myUserId={myUserId} />}
          </Spin>
        </Col>
      </Row>
    </Sidebar>
  );
};

Reviews.propTypes = {
  user: PropTypes.string.isRequired,
};
export default Reviews;

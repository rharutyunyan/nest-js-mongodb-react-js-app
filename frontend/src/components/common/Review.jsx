import React from 'react';
import * as moment from 'moment';
import PropTypes from 'prop-types';
import { Card, Avatar } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const Review = ({ review, myUserId }) => {
  const getFormattedDate = (date) => {
    return moment(date).format('MMM, DD hh:mm A');
  };

  return (
    review.user === myUserId && (
      <Card
        style={{ width: 400, margin: '10px auto' }}
        title={
          <Link to={`/users/${review.user}`}>
            <Meta
              avatar={<Avatar />}
              title={`${review.firstName} ${review.lastName}`}
              extra={review.email}
            />
          </Link>
        }
        extra={<span>{getFormattedDate(review.date)}</span>}
      >
        <Meta title={'My review'} description={review.improvements} />
      </Card>
    )
  );
};

Review.propTypes = {
  review: PropTypes.object.isRequired,
  myUserId: PropTypes.string.isRequired,
};
export default Review;

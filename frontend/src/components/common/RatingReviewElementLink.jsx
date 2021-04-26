import React from 'react';
import PropTypes from 'prop-types';
import { BulbOutlined } from '@ant-design/icons';

import { useHistory, Link } from 'react-router-dom';

const RatingReviewElementLink = ({ text = 'Please review the application' }) => {
  const history = useHistory();
  const currentPathName = history.location.pathname;
  const isRatingReviewPage = currentPathName === '/review';

  return (
    !isRatingReviewPage && (
      <Link to={{ pathname: '/review', state: { prevPath: history.location.pathname } }}>
        <BulbOutlined /> {text}
      </Link>
    )
  );
};

RatingReviewElementLink.propTypes = {
  text: PropTypes.string,
};

export default RatingReviewElementLink;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Form, Input, Modal, notification, InputNumber, Rate, Radio } from 'antd';
import { createReview } from '../api';
const FormItem = Form.Item;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const ReviewCreateModal = ({ modalVisible, setModalVisible, setReview }) => {
  const [starRating, setStarRating] = useState(0);
  const history = useHistory();
  const { prevPath } = history.location?.state;

  const handleSubmit = async (values) => {
    try {
      if (starRating <= 0) {
        return notification.error({ message: 'Please rate our app !' });
      }
      const { firstName, lastName, age, middleName, country, improvements, email, gender } = values;

      const newReview = await createReview({
        firstName,
        lastName,
        middleName,
        age,
        country,
        improvements,
        email,
        gender,
        rate: starRating,
        origin: prevPath,
      });
      setReview(newReview);
      notification.success({ message: 'Thank you for your feedback!' });
      history.push('/');
    } catch (e) {
      notification.error({
        message:
          'We apologize, but your review could not be submitted at this time. Please try again later.',
      });
    }
  };

  const handleRatingChange = (stars) => setStarRating(stars);

  return (
    <Modal
      title="Create Review"
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
      footer={null}
    >
      <Form {...layout} name="basic" onFinish={handleSubmit}>
        <Rate
          defaultValue={starRating}
          onChange={handleRatingChange}
          style={{ marginBottom: '35px', textAlign: 'center', marginLeft: '50%' }}
        />
        <FormItem
          label="First name"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
            },
            { min: 3, message: 'First name should contain at least 3 characters!' },
          ]}
          initialValue=""
        >
          <Input placeholder="Start typing…" name={'firstName'} rows={2} />
        </FormItem>
        <FormItem
          label="Last name"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please input your last name!',
            },
            { min: 3, message: 'Last name should contain at least 3 characters!' },
          ]}
          initialValue=""
        >
          <Input placeholder="Start typing…" name={'lastName'} rows={2} />
        </FormItem>
        <FormItem
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
          initialValue=""
        >
          <Input placeholder="Start typing…" name={'email'} rows={2} />
        </FormItem>
        <FormItem label="Age" name="age" rules={[{ required: false }]} initialValue="">
          <InputNumber placeholder="Start typing…" name={'age'} rows={3} />
        </FormItem>
        <FormItem label="Gender" name="gender" rules={[{ required: false }]} initialValue="">
          <Radio.Group name="gender" label="Radio.Group">
            <Radio value={'male'}>Male</Radio>
            <Radio value={'female'}>Female</Radio>
          </Radio.Group>
        </FormItem>

        <FormItem
          label="Country"
          name="country"
          rules={[
            { required: false },
            { min: 5, message: 'Country should contain at least 5 characters!' },
          ]}
          initialValue=""
        >
          <Input placeholder="Start typing…" name={'country'} rows={2} />
        </FormItem>
        <FormItem
          label="Improvements"
          name="improvements"
          rules={[
            { required: true },
            { max: 20000, message: 'Suggested improvements can not exceed 20000 letters!' },
          ]}
          initialValue=""
        >
          <Input.TextArea placeholder="Start typing…" name={'improvements'} rows={2} />
        </FormItem>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

ReviewCreateModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  setReview: PropTypes.func,
};

export default ReviewCreateModal;

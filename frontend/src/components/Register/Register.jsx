import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Spin, notification, Button, Form, Input } from 'antd';
import { register, uploadUserImage } from '../api';
import './Register.scss';
import UploadImage from '../common/UploadImage';

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

const Register = (props) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [imageError, setImageError] = useState('');

  const handleSubmit = async (values) => {
    if (!image) {
      setImageError('Please upload an image');
      return;
    }
    try {
      setLoading(true);
      const { data } = await register(values);
      await localStorage.setItem('user', JSON.stringify(data));
      const { userId, token } = data;
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      await uploadUserImage(userId, image, headers);
      window.location.href = '/';
    } catch (error) {
      setLoading(false);
      const message = error.response.data.message;
      notification.error({ message });
    }
  };

  return (
    <Spin spinning={loading}>
      <div style={{ width: 600, margin: '50px auto' }}>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item {...tailLayout}>
            <div style={{ fontSize: '20px' }}>Register</div>
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please provide email',
              },
              {
                type: 'email',
                message: 'Please provide a valid email',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            value={image}
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              { min: 6, message: 'Password must be minimum 6 characters.' },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: 'Please provide firstname',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Please provide lastname',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <UploadImage setImage={setImage} />
            {!image && <span style={{ color: 'red' }}>{imageError}</span>}
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Link to="/login"> Login</Link>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default Register;

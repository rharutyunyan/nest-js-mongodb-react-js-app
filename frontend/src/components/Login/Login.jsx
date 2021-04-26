import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Spin, notification, Button, Form, Input } from 'antd';
import { authenticate } from '../api';
import './Login.scss';

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

const Login = (props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const result = await authenticate(values);
      await localStorage.setItem('user', JSON.stringify(result.data));
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
            <div style={{ fontSize: '20px' }}>Login</div>
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
            rules={[
              {
                required: true,
                message: 'Please input your password',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Link to="/register"> Register</Link>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default Login;

import React, { useState } from 'react';
import { Button, Form, Input, Modal, notification } from 'antd';
import UploadImage from '../common/UploadImage';
import { updateUser, uploadUserImage } from '../api';

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

const UserEditModal = ({ user, modalVisible, setModalVisible, setUser }) => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (values) => {
    try {
      let result = await updateUser(user._id, values);
      if (image) {
        result = await uploadUserImage(user._id, image);
      }
      setUser(result.data);
      setModalVisible(false);
    } catch (error) {
      notification.error({ message: error.message });
    }
  };

  return (
    <Modal
      title="Edit User"
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
      footer={null}
    >
      <Form
        {...layout}
        name="basic"
        initialValues={user}
        onFinish={handleSubmit}
      >
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
          <UploadImage currentImage={user.image} setImage={setImage} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserEditModal;

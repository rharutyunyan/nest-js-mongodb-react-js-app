import React, { useState } from 'react';
import { Upload, message } from 'antd';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import { config } from '../../configs';

const UploadImage = ({ currentImage = null, setImage }) => {
  const initialFiles = currentImage
    ? [
        {
          uid: '1',
          name: 'image.png',
          status: 'done',
          url: `${config.APP_API_ENDPOINT}/${currentImage}`,
        },
      ]
    : [];

  const [files, setFiles] = useState(initialFiles);

  const beforeUpload = async (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    const formData = new FormData();
    formData.append('image', file);
    setImage(formData);

    handlePreview(file);

    return false;
  };

  const handlePreview = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFiles([{ ...file, url: reader.result }]);
    };
  };

  return (
    <Upload name="image" listType="picture-card" beforeUpload={beforeUpload} fileList={files}>
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    </Upload>
  );
};

UploadImage.propTypes = {
  currentImage: PropTypes.string,
  setImage: PropTypes.func.isRequired,
};

export default UploadImage;

import React from 'react';
import { Space } from 'antd';

const IconText = ({ icon, text }) => {
  return (
    <Space size="small" className="gap-1">
      {icon}
      {text}
    </Space>
  );
};

export default IconText;
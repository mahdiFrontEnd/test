import React, { useEffect, useState } from 'react';
import { Button, Form } from 'antd';

const SubmitForm = ({ loading }) => {
  const [loadingStatus, setLoadingStatus] = useState(loading);
  useEffect(() => {
    setLoadingStatus(loading);
  }, [loading]);

  return (
    <Form.Item className="mb-0 px-2">
      <Button htmlType="submit" loading={loadingStatus} className="defBtn orangeBtn">
        ثبت اطلاعات
      </Button>
    </Form.Item>
  );
};

export default SubmitForm;

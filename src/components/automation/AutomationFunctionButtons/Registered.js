import React, { useState } from 'react';

import { Button, Modal } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Automation from '../../../api/http_request/Model/automation/Automation';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';

const Registered = ({ rowData }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);
  const dispatch = useDispatch();


  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = () => {


    Automation.request({
      beforeSend: () => {
        setLoading(true);
      }, success: (res) => {
        handleCancel();
        navigate(`/automation/${automationAddress}/${automationAddress}_detail/${rowData?.id}?activeTab=2`);
        toast.success(res.message);
        dispatch(getAgainHandler());
      }, error: ({ response }) => {

        toast.error(response?.data?.message);


      }, final: () => {
        setLoading(false);
      },
    }).reply(`automation_${automationAddress}`, rowData?.id, { success: true });


  };


  return (
    <>
      {/*{hasPermission(`automation_sent_letter`, ['status']) && */}
      <div onClick={showModal}>
        <Button className="defBtn greenBtn">
          <span>صادر شد</span>
        </Button>

      </div>

      <Modal
        open={open}
        title="ثبت شد "
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            انصراف
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={onFinish}>
            ثبت
          </Button>,
        ]}
      >
        آیا برای ثبت کردن اطمینان دارید؟
      </Modal>
    </>
  );
};


export default Registered;
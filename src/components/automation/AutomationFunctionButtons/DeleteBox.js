import React, { useState } from 'react';

import { Button, Modal } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoTrashOutline } from 'react-icons/io5';
import { hasPermission } from '../../../permission/module';
import IconBtn from '../../MicroComponents/button/IconBtn';
import Automation from '../../../api/http_request/Model/automation/Automation';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';

const DeleteBox = ({ rowData, onSuccess, type = 'iconBtn' }) => {
  const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = () => {
    setLoading(true);
    Automation.request({
      success: (res) => {
        handleCancel();
        dispatch(getAgainHandler());
        toast.success(res.message);
        // eslint-disable-next-line no-unused-expressions
        onSuccess && onSuccess();
      },
      error: (error) => {
        handleCancel();
        toast.error(error.message);
      },
      final: () => {
        setLoading(false);
      },
    }).deleteAutomation(`automation_${automationAddress}`, rowData.id);
  };

  const getShowBtn = () => {
    switch (type) {
      case 'iconBtn':
        return <IconBtn TooltipText="حذف" btnClass="redIconBtn" icon={<IoTrashOutline size={22} />} />;
      case 'textBtn':
        return (
          <Button className="d-flex gap-1 defBtn redBtn align-items-center">
            <AiOutlineDelete size={18} />
            <span>حذف</span>
          </Button>
        );
      case 'dropDownBtn':
        return (
          <div>
            <div className="d-none d-md-block">
              <IconBtn TooltipText="حذف" btnClass="redIconBtn" icon={<IoTrashOutline size={20} />} />
            </div>
            <div className="d-md-none" style={{ width: '160px' }}>
              <Button className="text-black d-flex align-items-center gap-2 px-0 redText" type="link">

                <IoTrashOutline size={20} />
                <span>حذف</span>
              </Button>
            </div>
          </div>
        );
      default:
        return (
          <Button className="defBtn redBtn">
            <span>حذف</span>
          </Button>
        );
    }
  };
  return (
    <>
      {hasPermission(`automation_${automationAddress}`, ['delete']) && <div onClick={showModal}>{getShowBtn()}</div>}

      <Modal
        open={open}
        title="حذف "
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            انصراف
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={onFinish}>
            حذف
          </Button>,
        ]}
      >
        آیا برای حذف اطمینان دارید؟
      </Modal>
    </>
  );
};

export default DeleteBox;

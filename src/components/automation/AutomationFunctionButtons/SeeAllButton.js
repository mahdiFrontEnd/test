import React, { useState } from 'react';
import { Button, Popconfirm } from 'antd';
import { TbEyeDown } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Automation from '../../../api/http_request/Model/automation/Automation';
 import { getHomeData } from '../../../api/http_request/Model/User/HomeRequest';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';

const SeeAllButton = ({ address }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const confirm = () => {
    setLoading(true);
    Automation.request({
      success: () => {
        dispatch(getAgainHandler());
        getHomeData(dispatch);
        toast.success(' عملیات با موفقیت انجام یافت.');
      },
      error: () => {
        toast.error('error.data.message');
      },
      final: () => {
        setLoading(false);

      },
    }).seeAll(`automation_${address}`);
  };
  return (
    <div>
      <Popconfirm
        title="دیده شدن تمام موارد"
        description="بعد از تایید تمامی موارد این لیست به دیده شده تغییر وضعیت میدهد."
        onConfirm={confirm}
        okText="تایید"
        cancelText="انصراف"
      >
        <Button loading={loading} className="d-flex align-items-center gap-1 defBtn orangeBtn"><TbEyeDown
          size={20} /><span> دیده شدن همه</span>
        </Button>
      </Popconfirm>
    </div>
  );
};

export default SeeAllButton;
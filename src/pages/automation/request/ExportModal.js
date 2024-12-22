import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import Automation from '../../../api/http_request/Model/automation/Automation';
import { baseURL } from '../../../api/http_request/url';

const ExportModal = () => {

  const [loading, setLoading] = useState(false);
  const filter = useSelector((state) => state.TableRedux.filter);


  const onFinish = () => {

    if(filter.from_date && filter.end_date){
      setLoading(true);


      Automation.request({
        success: (result) => {
          toast.success(result.message);

          window.open(baseURL + result.result, '_blank');
        },
        error: ({ response }) => {

          toast.error(response?.data?.message);

        },
        final: () => {
          setLoading(false);
        },
      }).addParams({ ...filter}).getReport();
    }else {
      toast.error("لطفا از جدول پایین از قسمت ، جزییات و تاریخ ، یک بازه زمانی انتخاب کنید.");

    }

  };

  return (
    <>
      <Button loading={loading} className="defBtn blueBtn" onClick={onFinish}>خروجی اکسل</Button>

    </>
  );
};
export default ExportModal;

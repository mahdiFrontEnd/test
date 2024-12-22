import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaRegFolderClosed } from 'react-icons/fa6';
import { FaRegFolderOpen } from 'react-icons/fa';
import { Popconfirm } from 'antd';
import IconBtn from '../../MicroComponents/button/IconBtn';
import Automation from '../../../api/http_request/Model/automation/Automation';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';

const ChangeStatusCorrespondence = ({ rowData }) => {

  const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);
  const correspondenceStatus = useSelector((state) => state.automationAddressRedux.correspondenceStatus);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChangeStatus = (status) => {
    const newStatus = status === 'pending' ? 'complete' : 'pending';
    setLoading(true);
    Automation.request({
      success: (res) => {

        dispatch(getAgainHandler());
        toast.success(res.message);

      },
      error: (error) => {

        toast.error(error.message);
      },
      final: () => {
        setLoading(false);
      },
    }).changeCorrespondenceStatus(rowData.id,{"automation_status" : newStatus});
  };


  return (<>
      {automationAddress === 'correspondence' && <div>

        {correspondenceStatus === 'pending' ?
          <Popconfirm placement="left"
                      title="تغییر وضعیت مکاتبه"
                      description="ایا از تغییر وضعیت به مکاتبه بسته اطمینان دارید؟"
                      onConfirm={() => handleChangeStatus(rowData.automation_status)}
            // onCancel={cancel}
                      okText="بله"
                      cancelText="خیر"
          ><IconBtn loading={loading} TooltipText="بستن مکاتبه" btnClass="orangeIconBtn"
                    icon={<FaRegFolderClosed size={20} />} /> </Popconfirm> :
          <Popconfirm placement="left"
                      title="تغییر وضعیت مکاتبه"
                      description="ایا از تغییر وضعیت به مکاتبه باز اطمینان دارید؟ "
                      onConfirm={() => handleChangeStatus(rowData.automation_status)}
            // onCancel={cancel}
                      okText="بله"
                      cancelText="خیر"
          ><IconBtn loading={loading} TooltipText="باز کردن مکاتبه" btnClass="greenIconBtn"
                    icon={<FaRegFolderOpen size={20} />} /></Popconfirm>}


      </div>
      }</>
  );
};

export default ChangeStatusCorrespondence;
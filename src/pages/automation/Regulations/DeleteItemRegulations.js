import React, { useState } from 'react';
import { Popconfirm } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { IoTrashOutline } from 'react-icons/io5';
import { hasPermission } from '../../../permission/module';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import Automation from '../../../api/http_request/Model/automation/Automation';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import { getHomeData } from '../../../api/http_request/Model/User/HomeRequest';

const DeleteItemRegulations = ({ item }) => {
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState();

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [openPopConfirm, setOpenPopConfirm] = useState(false);
  const deleteItem = (id) => {

    Automation.request({
      beforeSend: () => {
        setLoadingDelete(true);

      }, success: () => {
        getHomeData(dispatch);
        dispatch(getAgainHandler());

      }, error: (error) => {


        toast.error(error?.message);

      },

      final: () => {
        setLoadingDelete(false);
        setDeleteId();
      },
    }).deleteRegulations(id);
  };
  return (


    <div>
      {hasPermission('regulations', ['delete']) && (<Popconfirm
          title="حذف یادداشت"
          description="آیا از حذف این مورد اطمینان دارید؟"
          onConfirm={() => {
            setDeleteId(item.id);
            setLoadingDelete(true);
            deleteItem(item.id);
          }}
          onCancel={() => {
            setOpenPopConfirm(false);
            setDeleteId();
          }}
          okText="بله"
          cancelText="خیر"
          open={openPopConfirm && item.id === deleteId}
        ><IconBtn btnClass="text-danger" icon={<IoTrashOutline size={20} />} onClick={() => {
          setOpenPopConfirm(true);
          setDeleteId(item.id);
        }}
                  loading={item.id === deleteId && loadingDelete} />
        </Popconfirm>
      )}
    </div>
  );
};

export default DeleteItemRegulations;
import React, { useState } from 'react';
import { Popconfirm } from 'antd';
import { IoTrashOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import User from '../../../api/http_request/Model/User/User';
import { setCalendarDateData } from '../../../store/calendar/calendarSlice';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';

const DeleteCalendarItem = ({ index, id }) => {
  const dispatch = useDispatch();

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [openPopConfirm, setOpenPopConfirm] = useState(false);
  const calendarDateData = useSelector((state) => state.calendarRedux.calendarDateData);

  const deleteItem = () => {

    User.request({
      beforeSend: () => {
        setLoadingDelete(true);

      }, success: () => {

        const array = [...calendarDateData];
        array.splice(index, 1);
        dispatch(setCalendarDateData([...array]));
        dispatch(getAgainHandler());

      }, final: () => {
        setLoadingDelete(false);

      },
    }).deleteTodo({ id });
  };

  return (<div>
      <Popconfirm
        title="حذف یادداشت"
        description="آیا از حذف این مورد اطمینان دارید؟"
        onConfirm={() => {

          setLoadingDelete(true);
          deleteItem();
        }}
        onCancel={() => {
          setOpenPopConfirm(false);

        }}
        okText="بله"
        cancelText="خیر"
        open={openPopConfirm && id === deleteId}>
        <IconBtn icon={<IoTrashOutline size={20} />} btnClass="redIconBtn"
                 onClick={() => {
                   setOpenPopConfirm(true);
                   setDeleteId(id);
                 }}
                 loading={id === deleteId && loadingDelete} />
      </Popconfirm>
    </div>);
};

export default DeleteCalendarItem;
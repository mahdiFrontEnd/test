import React from 'react';
import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ShowCalendarDateData from './ShowCalendarDateData';
import { setCalendarModalOpen } from '../../../store/calendar/calendarSlice';


const SingleBlackBoard = () => {
  const dispatch = useDispatch();
  const calendarModalOpen = useSelector((state) => state.calendarRedux.calendarModalOpen);
  const selectedYear = useSelector((state) => state.calendarRedux.selectedYear);
  const selectedMonth = useSelector((state) => state.calendarRedux.selectedMonth);
  const selectedDay = useSelector((state) => state.calendarRedux.selectedDay);

  const handleCancel = () => {
    dispatch(setCalendarModalOpen(false));

  };


  return (<Modal
      open={calendarModalOpen}
      title={`یادداشت های روز ${`${selectedYear}/${selectedMonth}/${selectedDay}`}`}
      width={900}
      onCancel={handleCancel}
      footer={[<Button key="back" onClick={handleCancel}>
        انصراف
      </Button>]}
    >
      <ShowCalendarDateData />
    </Modal>
  );
};

export default SingleBlackBoard;
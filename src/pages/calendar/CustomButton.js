import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { setSelectedMonth } from '../../store/calendar/calendarSlice';

const CustomButton = ({ direction, handleClick, disabled }) => {
  const dispatch = useDispatch();
  const selectedMonth = useSelector((state) => state.calendarRedux.selectedMonth);
  return (
    <i
      onClick={(x) => {
        let newMonth;
        if (direction === 'right') {

          newMonth = 1;
        } else {

          newMonth = -1;
        }

        dispatch(setSelectedMonth(`${Number(selectedMonth) + newMonth}`));


        handleClick(x);
      }}
      style={{
        padding: '0 10px',
        fontWeight: 'bold',
        color: disabled ? 'gray' : 'orange',
      }}
      className={disabled ? 'cursor-default' : 'cursor-pointer'}
    >
      {direction === 'right' ? <IoIosArrowBack size={28} /> : <IoIosArrowForward size={28} />}
    </i>
  );
};

export default CustomButton;
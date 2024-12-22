import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'jalali-moment';
import { Tooltip, Typography } from 'antd';
import { BsReplyFill } from 'react-icons/bs';
import { TbEyeOff } from 'react-icons/tb';
import { convertPersianToEnglish } from '../../helper/convertPersianToEnglish';
import CustomButton from './CustomButton';
import User from '../../api/http_request/Model/User/User';
import {
  setActiveKey,
  setCalendarDateData,
  setCalendarModalOpen,
  setSelectedDay,
  setSelectedMonth,
  setSelectedYear,
} from '../../store/calendar/calendarSlice';
import Loader from '../../layouts/loader/Loader';
import { getAgainHandler } from '../../store/loading/LoadingSlice';
import { holiday } from '../../components/datePicker/holiday';

const { Paragraph } = Typography;

const CalendarMultiDatePicker = () => {
  const dispatch = useDispatch();
  const selectedDay = useSelector((state) => state.calendarRedux.selectedDay);
  const getAgain = useSelector((state) => state.loadingReducer.getAgain);
  const selectedYear = useSelector((state) => state.calendarRedux.selectedYear);
  const selectedMonth = useSelector((state) => state.calendarRedux.selectedMonth);
  const [loading, setLoading] = useState(false);

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    if (selectedDay) {
      // console.log(getListData(selectedDay, selectedMonth));
      dispatch(setCalendarDateData(getListData(selectedDay, selectedMonth)));
    }
  }, [dataList]);


  useEffect(() => {


    User.request({
      beforeSend: () => {
        setLoading(true);
      }, success: ({ result }) => {
        setDataList(result);


      }, final: () => {
        setLoading(false);
      },
    }).getTodo({ month: selectedMonth, year: selectedYear });

  }, [getAgain, selectedMonth, selectedYear]);
  const getListData = (day, month) => {

    const monthArray = dataList[`${Number(month)}`];
    if (monthArray && monthArray[`${day}`]) {
      return monthArray[`${day}`] ?? [];
    }


    return [];
  };

  const onChangeDate = (date, isChangeDay) => {
    dispatch(getAgainHandler());
    const day = date.format('D');
    const month = date.format('M');
    const year = date.format('YYYY');
    dispatch(setSelectedDay(`${convertPersianToEnglish(day)}`));
    dispatch(setSelectedMonth(`${convertPersianToEnglish(month)}`));
    dispatch(setSelectedYear(`${convertPersianToEnglish(year)}`));
    if (isChangeDay) {
      dispatch(setCalendarModalOpen(true));
      dispatch(setActiveKey(''));
      dispatch(setCalendarDateData(getListData(convertPersianToEnglish(day), convertPersianToEnglish(month))));
    }

  };

  const maxDate = `${Number(moment().locale('fa').format('YYYY')) + 1}/${moment().locale('fa').format('MM/DD')}`;
  return (<div className="position-relative">
    {loading && <div className="layer bg-transparent pointer-event">
      <Loader />
    </div>}
    <Calendar className="custom-date-picker orange" calendar={persian} minDate="1403/5/1"
              maxDate={maxDate}
              locale={persian_fa}
              onMonthChange={onChangeDate}
              onYearChange={onChangeDate}
              onChange={(date) => onChangeDate(date, true)}
              renderButton={<CustomButton />}
              mapDays={({ date, today, selectedDate, currentMonth, isSameDate }) => {


                const props = {};
                const dataListInDate = getListData(convertPersianToEnglish(date.format('D')), convertPersianToEnglish(date.format('M')));
                props.style = {
                  borderRadius: '3px', backgroundColor: date.month.index === currentMonth.index ? '#f3f3f3' : '',
                };

                if (isSameDate(date, today)) {
                  console.log(date);
                  props.style = {
                    backgroundColor: '#f3f3f3', border: '1px solid #b1b1b1', borderRadius: '3px',
                  };
                }
                if (isSameDate(date, selectedDate)) props.style = {
                  ...props.style,
                  fontWeight: 'bold',
                };
                props.children = <div
                  className="d-flex flex-column justify-content-evenly h-100 pb-2"
                  style={{
                    fontSize: '14px', borderRadius: '3px', backgroundColor: dataListInDate.length ? '#fbe8d0' : '',
                  }}>
                  <div className="py-2 text-black"> {date.day}</div>
                  <div className="flex-1 overflow-auto custom-scroll  d-none d-xxl-block px-1">
                    {dataListInDate.map((item) => (

                      <div key={item.id} className="d-flex text-center justify-content-center gap-2 align-items-center">
                        {(!item.seen) ?
                          <div className="position-absolute" style={{ top: '4px', left: '4px' }}><TbEyeOff size={16}
                                                                                                           color="red" />
                          </div> : ''}


                        {!item.is_editable ?
                          <div className="mb-2 text-warning"><Tooltip className="position-relative"
                                                                      title={`ارجاع شده توسط ${item.from_name}`}>
                            <BsReplyFill
                              size={14} /> </Tooltip></div> : ''}
                        <Paragraph  className="mb-0" style={{ fontSize: '12px' }} ellipsis={{ rows: 1 }}>
                          {item.title}
                        </Paragraph>

                      </div>

                    ))}
                  </div>
                </div>;
                const isWeekend = [6]?.includes(date.weekDay.index);
                const isHoliday = holiday?.includes(`${date?.year}-${date?.month?.number}-${date?.day}`);
                if (isWeekend || isHoliday) return {
                  style: { fontSize: '14px', borderRadius: '3px',backgroundColor:'#f3f3f3', borderBottom: '0.5px solid red', },
                };


                return props;
              }}
    />
  </div>);
};

export default CalendarMultiDatePicker;


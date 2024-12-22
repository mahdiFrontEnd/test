import React from 'react';
import DatePicker, { getAllDatesInRange } from 'react-multi-date-picker';

import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';

import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import ConvertTimestampToDate from '../../helper/ConvertTimestampToDate';
import { holiday } from './holiday';

const MultiDatePicker = ({
                           activeAll,
                           dates,
                           numberOfMonths = 1,
                           setDates,
                           placeholder = '',
                           setAllDates,
                           isMulti,
                           currentDate = '',
                           onOpenPickNewDate = true,
                           required,
                           requiredTitle,
                           AD,
                           useDatePanel,
                           onChange,
                           inputClass = 'form-control w-100',
                           disabled,
                           containerClassName = 'w-100',

                         }) => {


  return (<>


    <DatePicker
      mapDays={({ date }) => {

        const isWeekend = [6]?.includes(date.weekDay.index);
        const isHoliday = holiday?.includes(`${date?.year}-${date?.month?.number}-${date?.day}`);
         if (!activeAll) {
          if (isWeekend || isHoliday) return {

            disabled: true, style: { color: '#ccc' }, // onClick: () => alert("weekends are disabled")
          };
        }

        return false;
      }}

      // value={dates}
      value={isMulti ? dates : Array.isArray(dates) ? dates[0] : dates}
      numberOfMonths={numberOfMonths}
      onChange={(dateObjects) => {
         if (!setDates) {

          onChange(dateObjects);
        } else if (dateObjects) {


          if (Array.isArray(dateObjects)) {
            if (dateObjects.length === 1) {
              dateObjects[0].hour = 0;
              dateObjects[0].minute = 0;
              dateObjects[0].second = 0;
              setDates(dateObjects);
            } else if (dateObjects.length === 2) {

              dateObjects[1].hour = 23;
              dateObjects[1].minute = 59;
              dateObjects[1].second = 59;
              if (ConvertTimestampToDate(dateObjects[0].toUnix()) !== ConvertTimestampToDate(dateObjects[1].toUnix())) { // todo check if
                setDates(dateObjects);
              }
            }
          } else {
            dateObjects.hour = 0;
            dateObjects.minute = 0;
            dateObjects.second = 0;
            setDates([dateObjects]);
          }

        } else {
          setDates(null);
        }

        if (isMulti && setAllDates) {


          const datesList = getAllDatesInRange(dateObjects);
          let newDatesArray = [];
          datesList.forEach((date) => {
            const isWeekend = [6]?.includes(date.weekDay.index);
            const isHoliday = holiday?.includes(`${date?.year}-${date?.month?.number}-${date?.day}`);
            const Repetitious = newDatesArray?.includes(date);


            if (!isWeekend && !isHoliday && !Repetitious || activeAll) {
              newDatesArray = [...newDatesArray, date];
            }

          });
          // eslint-disable-next-line array-callback-return
          newDatesArray.map(item => {
            item.hour = 0;
            item.minute = 0;
            item.second = 0;
          });
          setAllDates(newDatesArray);


        }
      }}
      range={isMulti}
      rangeHover
      sort={isMulti}
      placeholder={placeholder}
      plugins={(isMulti && useDatePanel) ? [<DatePanel eachDaysInRange position="left" />] : null}
      calendar={AD ? gregorian : persian}
      locale={AD ? gregorian_en : persian_fa}
      fixMainPosition
      currentDate={currentDate}
      onOpenPickNewDate={onOpenPickNewDate}
      calendarPosition="bottom-right"
      inputClass={`${inputClass} ${required}`}
      containerClassName={`${containerClassName}`}
      disabled={disabled}


    />
    <div className={required} />
    <div className="invalid-feedback">{requiredTitle}</div>
  </>);
};

export default MultiDatePicker;

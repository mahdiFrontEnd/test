import { SearchOutlined } from '@ant-design/icons';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import MultiDatePicker from '../../datePicker/MultiDatePicker';


const DateFilterTable = () => {
  const searchInput = useRef(null);
  const filter = useSelector((state) => state.TableRedux.filter);


  const getColor = (filterNameArray) => {
    let color;
    // eslint-disable-next-line array-callback-return
     filterNameArray.map((item) => {
      if (filter[item]) {
        color = '#1677ff';
      }

    });
    return color;
  };

  const getColumnDateProps = (initialValue = [], callbackData, hidden, filterName = []) => (hidden ? {} : {

    filterDropdown: () => {


      return <div
        style={{
          padding: 8, width: '200px',
        }}
      >


        <MultiDatePicker ref={searchInput} dates={initialValue} activeAll
                         onChange={(e) => {
                            if (e) {
                             callbackData({ 'from_date': e[0]?.unix, 'end_date': e[1]?.unix });
                           } else {
                             callbackData({ 'from_date': null, 'end_date': null });
                           }
                         }}
                         isMulti
                         placeholder="تاریخ"
                         currentDate />


      </div>;
    }, filterIcon: () => (<SearchOutlined
      style={{
        color: getColor(filterName),
      }}
    />), onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });


  return [getColumnDateProps];
};

export default DateFilterTable;
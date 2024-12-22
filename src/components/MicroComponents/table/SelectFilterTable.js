import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import { Select } from 'antd';
import { useSelector } from 'react-redux';


const SelectFilterTable = (loading) => {
  const filter = useSelector((state) => state.TableRedux.filter);

  const getColumnSelectProps = (initialValue = '[]', dataIndex, placeholder, dataArray, getData, callbackData, mode = 'multiple', hidden) => (


    hidden ? {} : {
      filterDropdown: () => (<div className={`p-3 w-fit `} onKeyDown={(e) => e.stopPropagation()}>
        <Select style={{ width: '180px' }} loading={loading}
                defaultValue={mode === 'multiple' ? filter[dataIndex] ? JSON.parse(initialValue) : [] : ''}

                value={mode === 'multiple' ? filter[dataIndex] ? JSON.parse(filter[dataIndex]) : [] : filter[dataIndex]}
                filterOption={(input, option) => {

                  return (option?.label.toLowerCase() ?? '').includes(input.toLowerCase());

                }}
                optionFilterProp="label"
                onChange={callbackData}
                options={dataArray} mode={mode} allowClear placeholder={placeholder} />

      </div>),
        filterIcon: () => (<SearchOutlined style={{ color: initialValue !== '[]' ? '#1677ff' : undefined }} />),
      // onFilter: (value, record) => (record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())),
      onFilterDropdownOpenChange: (show) => {

        if (show && !dataArray.length) {
          getData();
        }

      },

    });


  return [getColumnSelectProps];
};

export default SelectFilterTable;
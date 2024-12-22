import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import { Cascader } from 'antd';
import { useSelector } from 'react-redux';

const CascaderFilterTable = () => {
  const filter = useSelector((state) => state.TableRedux.filter);

  const getColumnCascaderProps = (
    initialValue = '[]',
    dataIndex,
    placeholder,
    dataArray,
    getData,
    callbackData,
    loading,
    mode = 'multiple',
    hidden,
  ) =>
    hidden
      ? {}
      : {
          filterDropdown: () => (
            <div
              style={{
                padding: 8,
                width: '200px',
              }}
            >
              <Cascader
                mode={mode}
                placeholder="کالا"
                fieldNames={{ label: 'name', value: 'id', children: 'skus' }}
                showSearch
                allowClear
                initialValue={initialValue}
                loading={loading}
                defaultValue={
                  mode === 'multiple' ? (filter[dataIndex] ? JSON.parse(initialValue) : []) : ''
                }
                value={
                  mode === 'multiple'
                    ? filter[dataIndex]
                      ? JSON.parse(filter[dataIndex])
                      : []
                    : filter[dataIndex]
                }
                options={dataArray}
                onChange={callbackData}
              />
            </div>
          ),
          filterIcon: () => (
            <SearchOutlined
              style={{
                color: initialValue !== '[]' ? '#1677ff' : undefined,
              }}
            />
          ),
          onFilterDropdownOpenChange: (show) => {
            if (show && !dataArray.length) {
              getData();
            }
          },
        };

  return [getColumnCascaderProps];
};

export default CascaderFilterTable;

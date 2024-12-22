import {SearchOutlined} from "@ant-design/icons";
import React from "react";
import {Select} from "antd";
import {statusList} from "../../../helper/jsons/statusList";


const StatusFilterTable = () => {
  const getColumnStatusProps = (
    initialValueUsers = '[]',
    initialValueStatuses = '[]',
    dataIndex,
    dataArray,
    getDataArray,
    getSelectedUsers,
    getSelectedStatuses,
    hidden,
    statusArray = statusList,placeholderFirst="کاربران",
  ) =>
    hidden
      ? {}
      : {
          filterDropdown: () => (
            <div style={{ width: '200px' }} className="p-3" onKeyDown={(e) => e.stopPropagation()}>
              <Select
                style={{ width: '100%' }}
                defaultValue={JSON.parse(initialValueUsers)}
                filterOption={(input, option) => {
                  return (option?.label.toLowerCase() ?? '').includes(input.toLowerCase());
                }}
                optionFilterProp="label"
                onChange={getSelectedUsers}
                options={dataArray}
                mode="multiple"
                allowClear
                placeholder={placeholderFirst}
              />

              <Select
                style={{ width: '100%' }}
                defaultValue={JSON.parse(initialValueStatuses)}
                filterOption={(input, option) => {
                  return (option?.label.toLowerCase() ?? '').includes(input.toLowerCase());
                }}
                optionFilterProp="label"
                onChange={getSelectedStatuses}
                options={statusArray}
                mode="multiple"
                allowClear
                placeholder="وضعیت"
              />
            </div>
          ),
          filterIcon: () => (
            <SearchOutlined style={{ color: (initialValueUsers !== '[]'||
                initialValueStatuses !== '[]') ? '#1677ff' : undefined }} />
          ),
          onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownOpenChange: (show) => {
            if (show && !dataArray.length) {
              getDataArray();
            }
          },
        };

  // const handleChange = (x) => {
  //     callbackData(x)
  // }

  return [getColumnStatusProps];
};

export default StatusFilterTable;
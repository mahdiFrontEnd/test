import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { useSearchParams } from 'react-router-dom';
import GetWarehouseLocationList from '../../../api/http_request/Model/common/GetWarehouseLocationList';
import GetWarehouses from '../../../api/http_request/Model/common/GetWarehouses';

const WarehouseFilterTable = () => {
  const [locationList, setLocationList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    GetWarehouseLocationList(setLocationList);
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      GetWarehouses(setWarehouseList, setLoading, { warehouse_location_id: selectedLocation });
    }
  }, [selectedLocation]);

  const onChange = (e) => {
    let searchObj = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const [k, v] of searchParams.entries()) {
      searchObj = { ...searchObj, [k]: v };
    }

    delete searchObj.warehouse_ids;

    setSearchParams({ ...searchObj });

    if (e) {
      setSelectedLocation(e);
    }
  };
  const getColumnWarehouseProps = (
    initialValueUsers = '[]',
    dataIndex,
    getSelectedWarehousees,
    initialValueLocation = '[]',
    getSelectedLocation,
    hidden,
  ) =>
    hidden
      ? {}
      : {
        filterDropdown: () => (
          <div style={{ width: '200px' }} className="p-3" onKeyDown={(e) => e.stopPropagation()}>
            <Select
              style={{ width: '100%' }}
              defaultValue={JSON.parse(initialValueLocation)}
              filterOption={(input, option) => {
                return (option?.label.toLowerCase() ?? '').includes(input.toLowerCase());
              }}
              optionFilterProp="label"
              onChange={(e) => {
                getSelectedLocation(e);
                onChange(e);
              }}
              options={locationList}
              allowClear
              placeholder="مرکز نگهداری"
            />

            <Select
              loading={loading}
              style={{ width: '100%' }}
              fieldNames={{ label: 'name', value: 'id' }}
              defaultValue={JSON.parse(initialValueUsers)}
              value={JSON.parse(initialValueUsers)}
              filterOption={(input, option) => {
                return (option?.label.toLowerCase() ?? '').includes(input.toLowerCase());
              }}
              optionFilterProp="label"
              onChange={(e) => {
                getSelectedWarehousees(e);
              }}
              options={warehouseList}
              mode="multiple"
              allowClear
              placeholder="انبار"
            />
          </div>
        ),
        filterIcon: () => (
          <SearchOutlined style={{
            color: (initialValueUsers !== '[]' ||
              initialValueLocation !== '[]') ? '#1677ff' : undefined,
          }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        // onFilterDropdownOpenChange: (show) => {
        //   if (show && !dataArray.length) {
        //     getDataArray();
        //   }
        // },
      };

  return [getColumnWarehouseProps];
};

export default WarehouseFilterTable;

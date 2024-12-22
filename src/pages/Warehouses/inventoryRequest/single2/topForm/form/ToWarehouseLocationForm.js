import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { setToWarehouseLocation } from '../../../../../../store/inventoryRequest/InventoryRequest2';
import GetWarehouseLocationList from '../../../../../../api/http_request/Model/common/GetWarehouseLocationList';

const FromWarehouseLocationForm = ({ address }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [type] = useState(searchParams.get('type'));
  const toWarehouseLocation = useSelector(
    (state) => state.InventoryRequestRedux2.toWarehouseLocation,
  );

  const [locationLoading, setLocationLoading] = useState(false);
  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    let params = {};
    if (type) {
      params = { type };
    }
    GetWarehouseLocationList(
      (e) => {
        setLocationList(e);
      },
      setLocationLoading,
      params,
    );
  }, []);
  return (
    <Form.Item
      className="mb-0  w-100"
      name="to_warehouse_location_id"
      rules={[
        {
          required: true,
          message: 'لطفا  مقصد_مرکز نگهداری انبار را انتخاب کنید!',
        },
      ]}
    >
      <Select
        placeholder="مقصد_مرکز نگهداری انبار"
        loading={locationLoading}
        showSearch
        disabled={address === 'inventory_temporary_receipt'}
        options={locationList}
        allowClear
        filterOption={(input, option) => {
          return (option?.label.toLowerCase() ?? '').includes(input.toLowerCase());
        }}
        onChange={(e, x) => {
          dispatch(setToWarehouseLocation(x));
        }}
        value={toWarehouseLocation}
      />
    </Form.Item>
  );
};

export default FromWarehouseLocationForm;

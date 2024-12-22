import React, { useEffect, useState } from 'react';
import { Form, Select } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { setFromWarehouseLocation } from '../../../../../../store/inventoryRequest/InventoryRequest2';
import GetWarehouseLocationList from '../../../../../../api/http_request/Model/common/GetWarehouseLocationList';

const FromWarehouseLocationForm = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [type] = useState(searchParams.get('type'));
  const fromWarehouseLocation = useSelector(
    (state) => state.InventoryRequestRedux2.fromWarehouseLocation,
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
    <Form.Item       className="mb-0  w-100"

                     name="warehouse_location_id"
      rules={[
        {
          required: true,
          message: 'لطفا  مبدا_مرکز نگهداری انبار را انتخاب کنید!',
        },
      ]}
    ><Select
      placeholder="مبدا_مرکز نگهداری انبار"
      loading={locationLoading}
      showSearch
      options={locationList}
      allowClear
      filterOption={(input, option) => {
        return (option?.label.toLowerCase() ?? '').includes(input.toLowerCase());
      }}
      onChange={(e, x) => {
        dispatch(setFromWarehouseLocation(x));
      }}
      value={fromWarehouseLocation}
    /></Form.Item>
  );
};

export default FromWarehouseLocationForm;

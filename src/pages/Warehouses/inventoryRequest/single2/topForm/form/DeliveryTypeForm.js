import React, { useEffect, useState } from 'react';
import { Form, Select } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import GetInventoryDeliveryTypeList from '../../../../../../api/http_request/Model/common/inventoryDeliveryTypeList';
import { setDeliveryType } from '../../../../../../store/inventoryRequest/InventoryRequest2';

const DeliveryTypeForm = () => {
  const dispatch = useDispatch();
  const deliveryType = useSelector((state) => state.InventoryRequestRedux2.deliveryType);
  const [deliveryList, setDeliveryList] = useState([]);
  const [deliveryLoading, setDeliveryLoading] = useState(false);

  useEffect(() => {
    GetInventoryDeliveryTypeList(setDeliveryList, setDeliveryLoading);
  }, []);
  return (
    <Form.Item       className="mb-0  w-100"

                     name="delivery_type_id"
      rules={[
        {
          required: true,
          message: 'لطفا  نوع تحویل را انتخاب کنید!',
        },
      ]}
    ><Select
      showSearch
      placeholder="نوع تحویل"
      loading={deliveryLoading}
      options={deliveryList}
      allowClear
      filterOption={(input, option) => {
        return (option?.label.toLowerCase() ?? '').includes(input.toLowerCase());
      }}
      onChange={(e, x) => {
        dispatch(setDeliveryType(x));
      }}
      value={deliveryType || null}
    /></Form.Item>
  );
};

export default DeliveryTypeForm;

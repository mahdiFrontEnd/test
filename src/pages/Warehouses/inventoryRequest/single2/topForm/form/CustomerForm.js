import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setCustomer } from '../../../../../../store/inventoryRequest/InventoryRequest2';
import customerList from '../../../../../../api/http_request/Model/common/customerList';

const CustomerForm = () => {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.InventoryRequestRedux2.customer);
  const items = useSelector((state) => state.InventoryRequestRedux2.items);

  const [customerLoading, setCustomerLoading] = useState(false);
  const [customersList, setCustomersList] = useState([]);

  useEffect(() => {
    customerList(setCustomersList, setCustomerLoading);
  }, []);
  return (
    <Form.Item
      className="mb-0  w-100"
      name="customer_id"
      rules={[
        {
          required: true,
          message: 'لطفا  مشتری را انتخاب کنید!',
        },
      ]}
    >
      <Select
        placeholder="مشتری"
        loading={customerLoading}
        showSearch
        options={customersList}
        allowClear
        filterOption={(input, option) => {
          return (option?.label.toLowerCase() ?? '').includes(input.toLowerCase());
        }}
        onChange={(e, x) => {
          dispatch(setCustomer(x));
        }}
        disabled={items.length}
        value={customer}
      />
    </Form.Item>
  );
};

export default CustomerForm;

import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setSupplier } from '../../../../../../store/inventoryRequest/InventoryRequest2';
import GetSupplierList from '../../../../../../api/http_request/Model/commerce/supplier';

const DeliveryTypeForm = () => {
  const dispatch = useDispatch();
  const supplier = useSelector((state) => state.InventoryRequestRedux2.supplier);

  const [suppliers, setSuppliers] = useState([]);
  const [suppliersLoading, setSuppliersLoading] = useState(false);

  useEffect(() => {
    GetSupplierList((result) => {
      let arr = [];
      // eslint-disable-next-line array-callback-return
      result.map((item) => {
        arr = [...arr, { value: `${item.id}`, label: item.name }];
      });

      setSuppliers(arr);
    }, setSuppliersLoading);
  }, []);
  return (
    <Form.Item       className="mb-0  w-100"

                     name="supplier_id"
      rules={[
        {
          required: true,
          message: 'لطفا  تامین کننده را انتخاب کنید!',
        },
      ]}
    >
      <Select
        placeholder="تامین کننده"
        loading={suppliersLoading}
        showSearch
        options={suppliers}
        allowClear
        filterOption={(input, option) => {
          return (option?.label.toLowerCase() ?? '').includes(input.toLowerCase());
        }}
        onChange={(e, x) => {
          dispatch(setSupplier(x));
        }}
        value={supplier}
      />
    </Form.Item>
  );
};

export default DeliveryTypeForm;

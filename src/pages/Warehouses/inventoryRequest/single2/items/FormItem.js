import React, { useState } from 'react';
import { Form } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BatchNumber from './form/BatchNumber';
import Product from './form/Product';
import Quantity from './form/Quantity';
import InventoryPlaceConsumption from './form/InventoryPlaceConsumption';
import FromWarehouse from './form/FromWarehouse';
import ToWarehouse from './form/ToWarehouse';
import Description from './form/Description';
import SubmitFormItem from './form/SubmitFormItem';
import { setItems } from '../../../../../store/inventoryRequest/InventoryRequest2';
import { setEditedDataRow } from "../../../../../store/inventoryRequest/InventoryRequest";

const FormItem = ({ address }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { editedDataRow, items } = useSelector((state) => state.InventoryRequestRedux2);

  const [type] = useState(searchParams.get('type'));

   const onFinish = () => {
    const newItems = [...items, { ...editedDataRow }];
    dispatch(setItems([...newItems]));
     dispatch(setEditedDataRow({ ...editedDataRow, unit: '' }));

     form.resetFields()
  };
  return (
    <Form name="basic" form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
      <div className="d-flex  p-3">
        {address === 'inventory_temporary_receipt' ? <BatchNumber /> : <Product />}

        <Quantity />
        <InventoryPlaceConsumption />
        {(address !== 'inventory_receipt' || type !== 'purchase') && <FromWarehouse />}
        {address !== 'inventory_remittance' && <ToWarehouse />}
        <Description />
        <SubmitFormItem form={form} />
      </div>
    </Form>
  );
};

export default FormItem;

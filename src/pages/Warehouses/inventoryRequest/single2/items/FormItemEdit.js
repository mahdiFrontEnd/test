import React, { useState } from 'react';
import { Button, Form, Modal } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit } from 'react-icons/fi';
import IconBtn from '../../../../../components/MicroComponents/button/IconBtn';
import Quantity from './edit/Quantity';
import InventoryPlaceConsumption from './edit/InventoryPlaceConsumption';
import FromWarehouse from './edit/FromWarehouse';
import BatchNumber from './edit/BatchNumber';
import Product from './edit/Product';
import ToWarehouse from './edit/ToWarehouse';
import Description from './edit/Description';
import { setEditeBeforeDataRow, setItems } from '../../../../../store/inventoryRequest/InventoryRequest2';

const FormItemEdit = ({ address, item, index }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { items, editeBeforeDataRow } = useSelector((state) => state.InventoryRequestRedux2);

  const [type] = useState(searchParams.get('type'));
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
    dispatch(setEditeBeforeDataRow(item));
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = () => {
    const newItems = [...items];
    newItems[index] = editeBeforeDataRow;
    dispatch(setItems([...newItems]));
    handleCancel();
  };
  return (
    <>
      <IconBtn btnClass="orangeIconBtn" icon={<FiEdit size={22} />} onClick={showModal} />
      <Modal
        width={1000}
        open={open}
        title="ویرایش"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            انصراف
          </Button>,
          <Button key="submit" type="primary" onClick={form.submit}>
            ویرایش
          </Button>,
        ]}
      >
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            batch_number: item.batch_number,
            product_sku_id: item.productIds,
            quantity: item.quantity,
            inventory_place_consumption_id: item.place_consumption_name?.id,
            warehouse_id: item.warehouse?.id,
            to_warehouse_id: item.to_warehouse?.id,
            description: item.description,
          }}
        >
          <div className="row p-3">
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              {address === 'inventory_temporary_receipt' ? <BatchNumber /> : <Product />}
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <Quantity />
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <InventoryPlaceConsumption />
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              {(address !== 'inventory_receipt' || type !== 'purchase') && <FromWarehouse />}
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              {address !== 'inventory_remittance' && <ToWarehouse />}
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <Description />
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default FormItemEdit;

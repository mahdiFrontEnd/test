import React, { useState } from 'react';
import { Form } from 'antd';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import SectionForm from './form/SectionForm';
import CostCenterCodeBox from './form/CostCenterCodeBox';
import DeliveryTypeForm from './form/DeliveryTypeForm';
import SupplierForm from './form/SupplierForm';
import FromWarehouseLocationForm from './form/FromWarehouseLocationForm';
import ToWarehouseLocationForm from './form/ToWarehouseLocationForm';
import CustomerForm from './form/CustomerForm';
import SubmitForm from './form/SubmitForm';
import Inventory from '../../../../../api/http_request/Model/inventory/Inventory';

const TopForm = ({ address, pageType, linkAddress }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const [type] = useState(searchParams.get('type'));
  const { items, cost_center_code } = useSelector((state) => state.InventoryRequestRedux2);
  const navigate = useNavigate();

  const onFinish = (values) => {
    let data = {};
    const arr = [];
    data = {
      delivery_type_id: Number(values.delivery_type_id),
      section_id: Number(values.section_id),
      cost_center_code: Number(cost_center_code),
      warehouse_location_id: Number(values.warehouse_location_id),
      to_warehouse_location_id: Number(values.to_warehouse_location_id),
      supplier_id: Number(values.supplier_id),
      customer_id: Number(values.customer_id),
      type,
    };
    if (address === 'inventory_remittance') {
      data.type = 'sell';
    }

    items.map((item) => {
      const val = {
        sku_id: Number(item.productIds[item.productIds.length - 1]),
        quantity: Number(item.quantity),
        place_consumption_id: Number(item.place_consumption_name?.id),
        warehouse_id: Number(item.warehouse?.id),
        description: item.description,
      };
      if (item.to_warehouse) {
        val.to_warehouse_id = Number(item.to_warehouse?.id);
      }
      if (item.batch_number) {
        val.batch_number = item.batch_number;
      }
      arr.push(val);

      return null;
    });

    data.items = arr;

    setLoading(true);
    Inventory.request({
      success: (result) => {
        toast.success(result.message);
        navigate(`/warehouses/${linkAddress}`);
      },
      error: (response) => {
        if (response?.response) {
          toast.error(response?.response?.data?.message);
        } else {
          toast.error(response?.message);
        }
      },
      final: () => {
        setLoading(false);
      },
    }).inventoryRequest(data, pageType === 'edit' ? 'put' : 'post', id, address);
  };

  return (
    <Form name="basic" form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
      <div className="d-flex justify-content-center align-items-center border-bottom border-1">
        <div className="d-flex gap-2 flex-1 justify-content-center px-3 py-2 align-items-center ">
          <SectionForm />

          <CostCenterCodeBox />
          <DeliveryTypeForm />

          {address === 'inventory_receipt' && type === 'purchase' ? (
            <SupplierForm />
          ) : (
            <FromWarehouseLocationForm />
          )}

          {address === 'inventory_remittance' ? (
            <CustomerForm />
          ) : (
            <ToWarehouseLocationForm address={address} />
          )}
        </div>
        <SubmitForm loading={loading} form={form} />
      </div>
    </Form>
  );
};

export default TopForm;

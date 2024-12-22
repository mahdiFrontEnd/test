import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import GetWarehouses from '../../../../../../api/http_request/Model/common/GetWarehouses';
import { setEditeBeforeDataRow } from '../../../../../../store/inventoryRequest/InventoryRequest2';

const ToWarehouse = ({ address }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [type] = useState(searchParams.get('type'));

  const { editeBeforeDataRow, toWarehouseLocation } = useSelector(
    (state) => state.InventoryRequestRedux2,
  );

  const [toWarehouseLoading, setToWarehouseLoading] = useState(false);
  const [toWarehouseList, setToWarehouseList] = useState([]);

  useEffect(() => {
    const params = {};
    if (address !== 'inventory_receipt' || type !== 'purchase') {
      params.warehouse_location_id = toWarehouseLocation.value;
    }

    GetWarehouses(setToWarehouseList, setToWarehouseLoading, params);
  }, [toWarehouseLocation]);

  return (
    <div className="flex-2 px-0">
      <Form.Item
        className="mb-0 pe-2"
        name="to_warehouse_id"
        rules={[{ required: true, message: 'لطفا مقصد را انتخاب کنید!' }]}
      >
        <Select
          allowClear
          onChange={(e, x) => {
            dispatch(setEditeBeforeDataRow({ ...editeBeforeDataRow, to_warehouse: x }));
          }}
          value={editeBeforeDataRow?.to_warehouse?.id}
          placeholder=" مقصد"
          loading={toWarehouseLoading}
          fieldNames={{ label: 'name', value: 'id' }}
          options={toWarehouseList}
        />
      </Form.Item>
    </div>
  );
};

export default ToWarehouse;

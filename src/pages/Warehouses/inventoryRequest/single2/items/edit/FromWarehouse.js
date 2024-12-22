import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import GetWarehouses from '../../../../../../api/http_request/Model/common/GetWarehouses';
import { setEditeBeforeDataRow } from "../../../../../../store/inventoryRequest/InventoryRequest2";

const FromWarehouse = ({ address }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [type] = useState(searchParams.get('type'));

  const { fromWarehouseLocation, editeBeforeDataRow } = useSelector(
    (state) => state.InventoryRequestRedux2,
  );

  const [fromWarehouseLoading, setFromWarehouseLoading] = useState(false);
  const [fromWarehouseList, setFromWarehouseList] = useState([]);

  useEffect(() => {
    if (fromWarehouseLocation) {
      // const product_id = editedDataRow?.productIds[editedDataRow?.productIds?.length - 1];
      const params = {};
      if (address !== 'inventory_receipt' || type !== 'purchase') {
        params.warehouse_location_id = fromWarehouseLocation.value;
      }


      GetWarehouses(setFromWarehouseList, setFromWarehouseLoading, params);
    }
  }, [fromWarehouseLocation]);

  return (
    <div className="flex-2 px-0">
      <Form.Item
        className="mb-0 pe-2"
        name="warehouse_id"
        rules={[{ required: true, message: 'لطفا مبدا را انتخاب کنید!' }]}
      >
        <Select
          allowClear
          onChange={(e, x) => {
            dispatch(setEditeBeforeDataRow({ ...editeBeforeDataRow, warehouse: x }));
          }}
          value={editeBeforeDataRow?.warehouse?.id}
          placeholder=" مبدا"
          loading={fromWarehouseLoading}
          fieldNames={{ label: 'name', value: 'id' }}
          options={fromWarehouseList}
        />
      </Form.Item>
    </div>
  );
};

export default FromWarehouse;

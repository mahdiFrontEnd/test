import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import GetWarehouses from '../../../../../../api/http_request/Model/common/GetWarehouses';
import { setEditedDataRow } from '../../../../../../store/inventoryRequest/InventoryRequest';

const FromWarehouse = ({ address }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [type] = useState(searchParams.get('type'));

  const { fromWarehouseLocation, editedDataRow } = useSelector(
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
      // if (product_id) {
      //   params.product_id = product_id;
      // }

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
            dispatch(setEditedDataRow({ ...editedDataRow, warehouse: x }));
          }}
          value={editedDataRow?.warehouse?.id}
          disabled={!editedDataRow?.productIds?.length && !editedDataRow?.batch_number}
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

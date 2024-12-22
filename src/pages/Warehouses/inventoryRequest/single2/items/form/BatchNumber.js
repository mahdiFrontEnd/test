import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import GetBatchList from '../../../../../../api/http_request/Model/common/GetBatchList';
import { setEditedDataRow } from '../../../../../../store/inventoryRequest/InventoryRequest2';

const BatchNumber = () => {
  const dispatch = useDispatch();
  const { fromWarehouseLocation,editedDataRow, deliveryType, toWarehouseLocation, customer } = useSelector(
    (state) => state.InventoryRequestRedux2,
  );

  const [batchList, setBatchList] = useState([]);
  const [batchLoading, setBatchLoading] = useState(false);

  useEffect(() => {
    if ((toWarehouseLocation || customer) && fromWarehouseLocation && deliveryType) {
      GetBatchList(setBatchList, setBatchLoading);
    }
  }, [toWarehouseLocation, customer, fromWarehouseLocation, deliveryType]);

  return (
    <div className="flex-3">
      <Form.Item
        className="mb-0  pe-2"
        name="batch_number"
        rules={[
          {
            required: true,
            message: 'لطفا  شماره بچ را انتخاب کنید!',
          },
        ]}
      >
        <Select
          className="w-100"
          showSearch
          allowClear
          onChange={(e, x) => {
            // setBatchNumber(e);
            dispatch(
              setEditedDataRow({
                ...editedDataRow,
                type_name: x.type_name,
                batch_number: e,
                product: x.product_name,
                productIds: [],
                unit: x.measurement_name,
              }),
            );
            // setUnit(x.measurement_name);
          }}
          disabled={(!toWarehouseLocation && !customer) || !fromWarehouseLocation}
          placeholder="شماره بچ"
          loading={batchLoading}
          options={batchList}
        />
      </Form.Item>
    </div>
  );
};

export default BatchNumber;

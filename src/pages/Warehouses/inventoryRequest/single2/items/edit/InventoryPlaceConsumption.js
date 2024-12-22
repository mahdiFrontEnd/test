import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
 import GetInventoryPlace from '../../../../../../api/http_request/Model/common/GetInventoryPlace';
import { setEditeBeforeDataRow } from "../../../../../../store/inventoryRequest/InventoryRequest2";

const InventoryPlaceConsumption = () => {
  const dispatch = useDispatch();

  const {editeBeforeDataRow} = useSelector((state) => state.InventoryRequestRedux2);
  const [inventoryPlaceList, setInventoryPlaceList] = useState([]);
  const [inventoryPlaceLoading, setInventoryPlaceLoading] = useState(false);

  useEffect(() => {
    GetInventoryPlace(
      setInventoryPlaceList,
      setInventoryPlaceLoading,
      // editedDataRow?.productIds[editedDataRow?.productIds?.length - 1] ||
      null,
    );
  }, []);
  return (
    <div className="flex-2">
      <Form.Item
        className="mb-0 pe-2"
        name="inventory_place_consumption_id"
        rules={[
          {
            required: true,
            message: 'لطفا محل مصرف را انتخاب کنید!',
          },
        ]}
      >
        <Select
          allowClear
          onChange={(e, x) => {
            dispatch(
              setEditeBeforeDataRow({
                ...editeBeforeDataRow,
                place_consumption_name: x,
              }),
            );
          }}
            placeholder=" محل مصرف"
          loading={inventoryPlaceLoading}
          fieldNames={{ label: 'name', value: 'id' }}
          options={inventoryPlaceList}
        />
      </Form.Item>
    </div>
  );
};

export default InventoryPlaceConsumption;

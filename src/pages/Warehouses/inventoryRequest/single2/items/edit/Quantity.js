import React from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setEditeBeforeDataRow } from "../../../../../../store/inventoryRequest/InventoryRequest2";

const Quantity = () => {
  const dispatch = useDispatch();

  const { editeBeforeDataRow } = useSelector((state) => state.InventoryRequestRedux2);

  return (
    <div >
      <Form.Item
        className="mb-0 pe-2"
        name="quantity"
        rules={[
          {
            required: true,
            message: 'لطفا مقدار را وارد کنید!',
          },
        ]}
      >


        <Input
          addonAfter={editeBeforeDataRow.unit}
          placeholder="مقدار"
            onChange={(e) => {
            dispatch(setEditeBeforeDataRow({ ...editeBeforeDataRow, quantity: e.target.value }));
          }}
        />
      </Form.Item>
    </div>


)
  ;
};

export default Quantity;
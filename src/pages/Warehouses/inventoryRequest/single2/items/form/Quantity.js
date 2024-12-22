import React from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setEditedDataRow } from "../../../../../../store/inventoryRequest/InventoryRequest";

const Quantity = () => {
  const dispatch = useDispatch();

  const editedDataRow = useSelector((state) => state.InventoryRequestRedux2.editedDataRow);

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
          addonAfter={editedDataRow.unit}
          placeholder="مقدار"
          disabled={!editedDataRow?.productIds?.length && !editedDataRow?.batch_number}
           onChange={(e) => {
            dispatch(setEditedDataRow({ ...editedDataRow, quantity: e.target.value }));
          }}
        />
      </Form.Item>
    </div>


)
  ;
};

export default Quantity;
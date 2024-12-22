import React from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setEditedDataRow } from "../../../../../../store/inventoryRequest/InventoryRequest";

const Description = () => {
  const dispatch = useDispatch();

  const editedDataRow = useSelector((state) => state.InventoryRequestRedux2.editedDataRow);

  return (

    <div className="flex-2 px-0">
      <Form.Item className="mb-0 pe-2" name="description">
        <Input
          placeholder="توضیحات"
          disabled={!editedDataRow?.productIds?.length && !editedDataRow?.batch_number}
          onChange={(e) => {
            dispatch(setEditedDataRow({ ...editedDataRow, description: e.target.value }));
          }}
        />
      </Form.Item>
    </div>



)
  ;
};

export default Description;
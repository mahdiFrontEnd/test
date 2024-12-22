import React from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setEditeBeforeDataRow } from "../../../../../../store/inventoryRequest/InventoryRequest2";

const Description = () => {
  const dispatch = useDispatch();

  const { editeBeforeDataRow } = useSelector((state) => state.InventoryRequestRedux2);

  return (

    <div className="flex-2 px-0">
      <Form.Item className="mb-0 pe-2" name="description">
        <Input
          placeholder="توضیحات"
          onChange={(e) => {
            dispatch(setEditeBeforeDataRow({ ...editeBeforeDataRow, description: e.target.value }));
          }}
        />
      </Form.Item>
    </div>



)
  ;
};

export default Description;
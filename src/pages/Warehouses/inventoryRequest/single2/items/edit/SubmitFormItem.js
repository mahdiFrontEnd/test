import React from 'react';
import { Form } from 'antd';
import { IoCheckmark } from 'react-icons/io5';
import IconBtn from '../../../../../../components/MicroComponents/button/IconBtn';

const SubmitFormItem = ({ form }) => {
  // const items = useSelector((state) => state.InventoryRequestRedux2.items);
  return (
    <Form.Item className="mb-0">
      <IconBtn
        htmlType="submit"
        btnClass="blueIconBtn"
        // disabled={items?.length}
        icon={<IoCheckmark size={22} />}
        onClick={form.submit}
      />
    </Form.Item>
  );
};

export default SubmitFormItem;

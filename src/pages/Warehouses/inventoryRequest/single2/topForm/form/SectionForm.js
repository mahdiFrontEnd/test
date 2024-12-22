import React, { useEffect, useState } from 'react';
import { Form, Select } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import GetSectionList from '../../../../../../api/http_request/Model/common/GetSectionList';
import { setCostCenterCode, setSection } from "../../../../../../store/inventoryRequest/InventoryRequest2";

const SectionForm = (props) => {

  const dispatch = useDispatch();
  const section = useSelector((state) => state.InventoryRequestRedux2.section);
  const [sectionListLoading, setSectionListLoading] = useState(false);
  const [sectionList, setSectionList] = useState([]);

  useEffect(() => {
    GetSectionList(setSectionList, setSectionListLoading, 'inventory');
  }, []);

  return (
    <Form.Item
      className="mb-0 w-100 "
      name="section_id"
      rules={[
        {
          required: true,
          message: 'لطفا  واحد درخواست کننده را انتخاب کنید!',
        },
      ]}
    >


      <Select
      {...props}
      // className={className}
      // placeholder={placeholder}

      placeholder="واحد درخواست کننده"
      onChange={(e, x) => {
        dispatch(setSection(x));
        dispatch(setCostCenterCode(x.cost_center_code));
      }}
      value={section}
      loading={sectionListLoading}
      defaultActiveFirstOption
      options={sectionList}
      fieldNames={{ label: 'name', value: 'id' }}
    /></Form.Item>
  );
};

export default SectionForm;

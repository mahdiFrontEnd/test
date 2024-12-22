import React, { useState } from 'react';
import { Button, Select } from 'antd';

const ChooseAttributeOptions = ({ attributeList, attributeListLoading }) => {
  const [options, setOptions] = useState([]);
  const [optionsValue, setOptionsValue] = useState([]);
  const [attribute, setAttribute] = useState();
  const [varientList, setVarientList] = useState([]);
  const onChangeAttr = (x, y) => {
    setAttribute(y);
    setOptions(y.options);
    setOptionsValue([]);
  };
  const onChangeOptions = (x, y) => {
    setOptionsValue(y);
  };
  const handleAdd = () => {
    setVarientList([...varientList, { attribute, optionsValue }]);
  };
  const handleDelete = (x, index) => {
    const newArr = [...varientList];
    newArr.splice(index, 1);
    setVarientList(newArr);
  };
  return (
    <div>
      <div className="w-100 d-flex justify-content-between">
        <Select
          style={{ width: '200px' }}
          loading={attributeListLoading}
          fieldNames={{ label: 'name', value: 'id', options: 'option' }}
          options={attributeList}
          value={attribute?.id}
          onChange={onChangeAttr}
        />

        <Select
          style={{ width: '200px' }}
          mode="multiple"
          allowClear
          value={optionsValue?.id}
          onChange={onChangeOptions}
          fieldNames={{ label: 'value', value: 'id' }}
          options={options}
          filterOption={(input, option) => {
            return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase());
          }}
        />
        <Button onClick={handleAdd}>add</Button>
      </div>
      <div>
        {varientList?.map((item, index) => (
          <div className="keyValue">
            <Button onClick={() => handleDelete(item, index)}>delete</Button>
            <div className="key">{item?.attribute?.name}:</div>
            {item.optionsValue.map((option) => (
              <div className="value mx-2">{option.value}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseAttributeOptions;

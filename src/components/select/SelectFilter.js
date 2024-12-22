import React from 'react';
import Select from 'react-select';
import { resetPageNumber } from '../../helper/resetPageNumber';

const SelectFilter = ({ errorText, data, defaultValue, title, isMulti, setSkip, onChange }) => {


  const handleSelect = (item) => {
    onChange(item);
    if (setSkip) {
      setSkip(0);
    }
    resetPageNumber();
  };

  return (
    <>
      {data && (
        <Select
          name="select"
          options={data}
          isSearchable
          isMulti={isMulti}
          placeholder={title}
          defaultValue={
            isMulti
              ? data?.filter((i) => defaultValue?.includes(i.value))
              : data?.filter((i) => i.value === defaultValue)
          }
          onChange={(e) => handleSelect(e)}
          className={`p-0 w-100 m-0 ${errorText ? ' is-invalid' : ''}`}
        />
      )}
    </>
  );
};

export default SelectFilter;

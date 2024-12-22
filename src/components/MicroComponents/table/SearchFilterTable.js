import {SearchOutlined} from "@ant-design/icons";
import React, {useRef,} from "react";
import DebouncingInput from "../DebouncingInput";


const SearchFilterTable = () => {
    const searchInput = useRef(null);

    const getColumnSearchProps = (placeholder = 'جستجو...',  initialValue, callbackData,hidden) => (
        hidden ? {} :{
        filterDropdown: (/*{setSelectedKeys, selectedKeys, confirm,  clearFilters}*/) => (<div
            style={{
                padding: 8, width: '180px'
            }}
        >
            <DebouncingInput allowClear ref={searchInput} defaultValue={initialValue}
                             onChange={(value) => {

                                 callbackData(value)}}
                             placeholder={placeholder}/>


        </div>), filterIcon: () => (<SearchOutlined
            style={{
                color: initialValue ? '#1677ff' : undefined,
            }}
        />), onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });


    return [getColumnSearchProps];
};

export default SearchFilterTable;
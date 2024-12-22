import {SearchOutlined} from "@ant-design/icons";
// import Highlighter from "react-highlight-words";
import React, {useRef,} from "react";
import DebouncingInput from "../DebouncingInput";


const SearchFilterTable = () => {
    // const [searchText, setSearchText] = useState('');
    // const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);


    const getColumnSearchProps = ( placeholder = 'جستجو...', callbackData,hidden) => (
        hidden ? {} : {
        filterDropdown: (/*{setSelectedKeys, selectedKeys, confirm,  clearFilters}*/) => (
            <div
                style={{
                    padding: 8,
                    width: '180px'
                }}
                // onKeyDown={(e) => e.stopPropagation()}
            >
                <DebouncingInput allowClear ref={searchInput}
                                 onChange={(value) => {
                                     callbackData(value)
                                 }}
                                 placeholder={placeholder}/>


                {/*<Input allowClear*/}
                {/*       ref={searchInput}*/}
                {/*       placeholder={placeholder}*/}
                {/*       value={selectedKeys[0]}*/}
                {/*       onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}*/}
                {/*       onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}*/}
                {/*       style={{*/}
                {/*           marginBottom: 8,*/}
                {/*           width: '180px'*/}
                {/*       }}*/}
                {/*/>*/}

            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        // onFilter: (value, record) => (
        //     record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //     searchedColumn === dataIndex ? (
        //         <Highlighter
        //             highlightStyle={{
        //                 backgroundColor: '#ffc069',
        //                 padding: 0,
        //             }}
        //             searchWords={[searchText]}
        //             autoEscape
        //             textToHighlight={text ? text.toString() : ''}
        //         />
        //     ) : (
        //         text
        //     ),
    });
    // const handleSearch = (selectedKeys, confirm, dataIndex) => {
    //     confirm();
    //     setSearchText(selectedKeys[0]);
    //     setSearchedColumn(dataIndex);
    // };
    // const handleReset = (clearFilters) => {
    //     clearFilters();
    //     setSearchText('');
    // };


    return [getColumnSearchProps];
};

export default SearchFilterTable;
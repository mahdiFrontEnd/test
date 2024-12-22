import {SearchOutlined} from "@ant-design/icons";
import React, {useRef,} from "react";
import DebouncingCurrencyInput from "../DebouncingCurrencyInput";


const PriceFilterTable = () => {
    // const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);


    const getColumnPriceProps = (initialValue1='',callbackNumber1,initialValue2='',callbackNumber2, placeholder1 = 'مبلغ از', placeholder2 = 'مبلغ تا',hidden) => (
        hidden ? {} : {
        filterDropdown: (/*{setSelectedKeys, selectedKeys, confirm,  clearFilters}*/) => (
            <div className='d-flex flex-column gap-2'
                 style={{
                     padding: 8,
                     width: '180px'
                 }}
             >

                <DebouncingCurrencyInput defaultValue={initialValue1}
                    onChange={(value) => {
                        callbackNumber1(value)
                    }}
                    placeholder={placeholder1}/>

                <DebouncingCurrencyInput defaultValue={initialValue2}
                    onChange={(value) => {
                        callbackNumber2(value)
                    }}
                    placeholder={placeholder2}/>



            </div>
        ),
        filterIcon: () => (
            <SearchOutlined
                style={{
                    color: (initialValue1 !== "" || initialValue2 !== ""  ) ? '#1677ff' : undefined,
                }}
            />
        ),

        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },

    });



    return [getColumnPriceProps];
};

export default PriceFilterTable;
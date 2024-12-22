import React from 'react';
import {useSelector} from "react-redux";
import DebouncingInput from "../DebouncingInput";
import UseSetParams from "../../../helper/UseSetParams";
import {getFilter,} from "../../../store/TableRedux/TableRedux";

const SearchInputTopTable = ({searchName='search'}) => {
    const filter = useSelector((state) => state.TableRedux.filter);
    const [handleSetParams,] = UseSetParams(getFilter)
    const funcHandleSetParams = (newFilter) => {
        handleSetParams(newFilter)
    }
    return (
        <div  style={{minWidth:"150px"}}>


            <DebouncingInput allowClear defaultValue={filter[searchName]}
                             onChange={(value) => {
                                 funcHandleSetParams([{key: searchName, value}])
                             }}


                             placeholder="جستجو..."/>


        </div>
    )

}

export default SearchInputTopTable;
import React, {useEffect, useState} from 'react';
import {Select} from 'antd';
import {useSelector} from "react-redux";
import DateObject from "react-date-object";
import Commerce from "../../../api/http_request/Model/commerce/Commerce";
import DebouncingInput from "../../MicroComponents/DebouncingInput";
import MultiDatePicker from "../../datePicker/MultiDatePicker";
import UseSetParams from "../../../helper/UseSetParams";
import Companies from "../../../api/http_request/Model/companies/Companies";
import {getProducts} from "../../../api/common";
import {getFilter} from "../../../store/commerce/purchase/PurchaseTableRedux";

const SearchPurchase = () => {
    const [dateNameList, setDateNameList] = useState([])
    const [companiesList, setCompaniesList] = useState([])
    const [productList, setProductList] = useState([])
    const [dateLoading, setDateLoading] = useState(true)
    const filter = useSelector((state) => state.PurchaseTableRedux.filter);
    const [values, setValues] = useState(filter.from_date && filter.end_date ? [new DateObject({
        date: filter.from_date * 1000,
    }), new DateObject({
        date: filter.end_date * 1000,
    })] : filter.from_date ? [new DateObject({
        date: filter.from_date * 1000,
    })] : null)


    const [handleSetParams,] = UseSetParams(getFilter)

    const funcHandleSetParams = (newFilter) => {
        handleSetParams(newFilter)
    }
    useEffect(() => {

        Commerce.request({

            beforeSend: () => {
                setDateLoading(true)
            }, error: () => {
            }, success: async (data) => {
                setDateNameList(data?.result);
            }, failed: () => {
            }, final: () => {
                setDateLoading(false)
            }
        }).dateName()


        Companies.request({
            beforeSend: () => {
                setDateLoading(true)
            }, error: () => {
            }, success: async (data) => {
                setCompaniesList(data?.result);
            }, failed: () => {
            }, final: () => {
            }
        }).addParam('is_commerce', 1).companies()


        getProducts(({result}) => {
            setProductList(result);

        });


    }, [])
    return (<div className='row   '>
        <div className="col-sm-6 col-md-4 mt-4">
            <DebouncingInput placeholder='جستجو...'
                             defaultValue={filter.search} onChange={(e) => {
                funcHandleSetParams([{key: 'search', value: e}])
            }}

                             className='form-control'
                             type='text'
            /></div>
        <div className="col-sm-6 col-md-4 mt-4">
            <Select mode='multiple' className='w-100'
                    value={filter.companies ? JSON.parse(filter.companies) : []}
                    defaultValue={filter.companies && JSON.parse(filter.companies)}
                    loading={dateLoading} placeholder='کشتیرانی ها'
                    onChange={(e) => {
                        funcHandleSetParams([{
                            key: 'companies', value: JSON.stringify(e)
                        }])

                    }}


                    filterOption={(input, option) => {
                        return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase())
                    }}


                    fieldNames={{label: 'name', value: 'id'}}
                    options={companiesList}
            /></div>
        <div className="col-sm-6 col-md-4 mt-4">
            <Select mode='multiple' className='w-100'
                    defaultValue={filter.date_names && JSON.parse(filter.date_names)}
                    value={filter.date_names ? JSON.parse(filter.date_names) : []}
                    loading={dateLoading} placeholder='نام تاریخ'
                    onChange={(e) => {
                        funcHandleSetParams([{key: 'date_names', value: e}])

                    }}

                    filterOption={(input, option) => {
                        return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase())
                    }}

                    fieldNames={{label: 'name', value: 'value'}}
                    options={dateNameList}
            /></div>
        <div className="col-sm-6 col-md-4 mt-4">
            <Select mode='multiple' className='w-100'
                    defaultValue={filter.products && JSON.parse(filter.products)}
                    value={filter.products ? JSON.parse(filter.products) : []}
                    loading={dateLoading} placeholder='محصول'
                    onChange={(e) => {
                        funcHandleSetParams([{key: 'products', value: e}])

                    }}

                    filterOption={(input, option) => {
                        return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase())
                    }}

                    fieldNames={{label: 'name', value: 'id'}}
                    options={productList}
            /></div>
        <div className="col-sm-6 col-md-4 mt-4">
            <Select mode='multiple' className='w-100'
                    defaultValue={filter.shipping_methods && JSON.parse(filter.shipping_methods)}
                    value={filter.shipping_methods ? JSON.parse(filter.shipping_methods) : []}
                    loading={dateLoading} placeholder='نوع سفر'
                    onChange={(e) => {
                        funcHandleSetParams([{
                            key: 'shipping_methods', value: JSON.stringify(e)
                        }])

                    }}


                    filterOption={(input, option) => {
                        return (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
                    }}


                    options={[{label: 'هواپیما', value: 'plane'}, {
                        label: 'کشتی', value: 'ship'
                    }]}
            /></div>
        <div className="col-sm-6 col-md-4 mt-4">
            <MultiDatePicker activeAll
                             onChange={(e) => {
                                 if (e) {
                                     const from = e[0] ? e[0] : null
                                     const end = e[1] ? e[1] : null
                                     setValues(e)
                                     funcHandleSetParams([from && {key: 'from_date', value: from.toUnix()}, end && {
                                         key: 'end_date', value: end.toUnix()
                                     }])
                                 } else {
                                     funcHandleSetParams([{key: 'from_date', value: null}, {
                                         key: 'end_date', value: null
                                     }])
                                 }

                             }}
                             dates={values}
                             inputClass='form-control  ant-input ant-input-rtl   '
                             isMulti
                             placeholder='تاریخ'
                             currentDate
            /></div>


    </div>);
};

export default SearchPurchase;

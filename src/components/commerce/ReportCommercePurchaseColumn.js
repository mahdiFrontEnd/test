import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateObject from 'react-date-object';
import { BsFileEarmarkExcelFill, BsPinAngle, BsPinAngleFill } from 'react-icons/bs';
import SelectFilterTable from '../MicroComponents/table/SelectFilterTable';
import PriceFilterTable from '../MicroComponents/table/PriceFilterTable';
import UseSetParams from '../../helper/UseSetParams';
import Commerce from '../../api/http_request/Model/commerce/Commerce';
import { getAgainHandler, isLoading } from '../../store/loading/LoadingSlice';
import GetAutomationUserList from '../../api/http_request/Model/automation/automationUserList';
import DateFilterTable from '../MicroComponents/table/DateFilterTable';
import { currencyTypeList } from '../../helper/jsons/currencyTypeList';
import { baseURL } from '../../api/http_request/url';

const PurchaseColumn = () => {
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);


  const [typeList, setTypeList] = useState([]);
  const filter = useSelector((state) => state.TableRedux.filter);
  // const [getColumnSearchProps,] = SearchFilterTable()
  const [getColumnSelectProps] = SelectFilterTable();
  const [getColumnPriceProps] = PriceFilterTable();
  const [getColumnDateProps] = DateFilterTable();

  const [handleSetParams] = UseSetParams();

  const funcHandleSetParams = (newFilter) => {
    handleSetParams(newFilter);
  };

  const getTypeList = () => {

    Commerce.request({
      success: ({ result }) => {

        setTypeList(result?.map((item) => ({
          value: item.value, label: item?.name,
        })));


      }, error: () => {

      }, final: () => {
      },
    }).purchaseReportType();


  };
  const GetAutomationUser = () => {
    GetAutomationUserList((x) => {

      setUserList(x?.map((item) => ({
        value: item.id, label: item?.name,
      })));
    });
  };

  const handlePin = (id, type) => {
    dispatch(isLoading('isDataTable'));

    Commerce.request({
      success: () => {

        dispatch(getAgainHandler());
      }, error: () => {

      }, final: () => {
      },
    }).pinned(id, { type });


  };
  const columns = [
    //     {
    //     title: 'ردیف', dataIndex: 'row', key: 'row', render: (text, row, index) => {
    //         return index + 1
    //     },
    // },
    {

      title:


        <span className="cursor-pointer" onClick={() => {
          funcHandleSetParams([{ key: 'is_pinned', value: filter.is_pinned ? 0 : 1 }]);
        }}>
               {

                 Number(filter.is_pinned) ? <BsPinAngleFill size={16} color="#FFC107" />
                   : <BsPinAngle size={16} color="#495057" />
               }
             </span>,


      //   <i onClick={() => {
      //   funcHandleSetParams([{ key: 'is_pinned', value: filter.is_pinned ? 0 : 1 }]);
      //
      //
      // }} className={`bi cursor-pointer ${Number(filter.is_pinned) ? 'bi-pin-fill' : 'bi-pin'}`}></i>,
      dataIndex: 'is_pinned',
      key: 'is_pinned',
      render: (text, v) => {
        return <span className="cursor-pointer" onClick={() => {
          // e.stopPropagation();
          handlePin(v.id, v.is_pinned ? 0 : 1);
        }}>
               {

                 text ? <BsPinAngleFill size={16} color="#FFC107" />
                   : <BsPinAngle size={16} color="#495057" />
               }
             </span>;


        //
        // <i onClick={() => {
        //   // e.stopPropagation();
        //   handlePin(v.id, v.is_pinned ? 0 : 1);
        //
        //
        // }}
        //    className={`bi cursor-pointer  ${text ? 'bi-pin-fill' : 'bi-pin'}`}></i>;
      },

    }, {
      title: 'نوع گزارش',
      dataIndex: 'type',
      key: 'type', ...getColumnSelectProps(filter.type, 'type', 'نوع گزارش', typeList, getTypeList, (res) => {
        funcHandleSetParams([{ key: 'type', value: res }]);
      }),
    }, {
      title: ' ایجادکننده',
      dataIndex: 'created_by',
      key: 'created_by', ...getColumnSelectProps(filter.from, 'created_by', 'ایجادکننده', userList, GetAutomationUser, (res) => {
        funcHandleSetParams([{ key: 'created_by', value: res }]);
      }),
    }, {
      title: 'نوع ارز',
      dataIndex: 'currency_type',
      key: 'currency_type', ...getColumnSelectProps(filter.currency_type, 'currency_type', ' ایجادکننده', currencyTypeList, null, (res) => {
        funcHandleSetParams([{ key: 'currency_type', value: res }]);
      }),
    }, {
      title: 'مبلغ ارز',
      dataIndex: 'currency_value',
      key: 'currency_value', ...getColumnPriceProps(filter.currency_value, (res1) => {
        funcHandleSetParams([{ key: 'min_price', value: res1 }]);
      }, filter.max_price, (res2) => {
        funcHandleSetParams([{ key: 'max_price', value: res2 }]);
      }),
    }, {
      title: 'لینک', dataIndex: 'link', key: 'link', render: (text) => {
        return <a target="_blank" rel="noopener noreferrer" href={baseURL + text}>
                <span style={{ overflow: 'hidden', whiteSpace: 'normal' }}>
                  {/*<i className="bi bi-file-earmark-excel-fill fs-2"></i>*/}

                  <BsFileEarmarkExcelFill size={22} />
                </span>
        </a>;
      },

    }, {
      title: 'زمان', dataIndex: 'created_at', key: 'created_at',

      ...getColumnDateProps([filter.from_create_date && new DateObject({
        date: filter.from_create_date * 1000,
      }), filter.end_create_date && new DateObject({
        date: filter.end_create_date * 1000,
      })], (res) => {
        funcHandleSetParams([{ key: 'from_create_date', value: res.from_date }, {
          key: 'end_create_date', value: res.end_date,
        }]);
      }),
    },

  ];
  return [columns];
};

export default PurchaseColumn;
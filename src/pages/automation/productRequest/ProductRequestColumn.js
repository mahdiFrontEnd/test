import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import { CiSearch } from 'react-icons/ci';
import SearchFilterTable from '../../../components/MicroComponents/table/SearchFilterTable';
import UseSetParams from '../../../helper/UseSetParams';
import SelectFilterTable from '../../../components/MicroComponents/table/SelectFilterTable';
import GetAutomationUserList from '../../../api/http_request/Model/automation/automationUserList';
import GetRequestProductIdList from '../../../api/http_request/Model/automation/GetRequestProductIdList';
import RejectAcceptBox from './RejectAcceptBox';
import ShowProcess from './ShowProcess';

const ProductRequestColumn = () => {
  const filter = useSelector((state) => state.TableRedux.filter);
  const [ListLoading, setListLoading] = useState(false);
  const [getColumnSelectProps] = SelectFilterTable(ListLoading);
  const [userList, setUserList] = useState([]);
  const [idsList, setIdsList] = useState([]);

  const [handleSetParams] = UseSetParams();

  const GetAutomationUser = () => {
    GetAutomationUserList((x) => {
      setUserList(
        x?.map((item) => ({
          value: item.id,
          label: item?.name,
        })),
      );
    }, setListLoading, { deactivate: 1 });
  };
  const GetRequestProductIds = () => {
    GetRequestProductIdList(setIdsList, setListLoading);
  };
  const funcHandleSetParams = (newFilter) => {
    handleSetParams(newFilter);
  };
  const [getColumnSearchProps] = SearchFilterTable();


  const columns = [{
    title: 'درخواست کننده',
    dataIndex: 'created_by',
    render: (text, row) => {

      return (
        <div className="text-start d-flex align-items-center gap-2 ">
          <img
            className="circleImageMini "
            src={row.image_of_created_by?.length > 4 ? row.image_of_created_by : '/noImage.png'}
            alt="userImage"
          />


          <Tooltip title="جستجوی این کاربر"><span onClick={() => {
            funcHandleSetParams([{ key: 'from', value: [row.created_user_id] }]);
          }}><CiSearch /></span></Tooltip>

          <span>{text}</span>


        </div>
      );
    },
    key: 'created_by',
    ...getColumnSelectProps(
      filter?.from,
      'from',
      'فرستنده',
      userList,
      GetAutomationUser,
      (res) => {
        funcHandleSetParams([{ key: 'from', value: res }]);
      },
    ),
  },
    {
      title: 'شماره درخواست',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSelectProps(
        filter?.id,
        'id',
        'شماره درخواست',
        idsList,
        GetRequestProductIds,
        (res) => {
          funcHandleSetParams([{ key: 'id', value: res }]);
        },
      ),

    },

    {
      title: 'نام کالا ',
      dataIndex: 'request_name',
      ...getColumnSearchProps('نام کالا', filter.request_name, (res) => {
        funcHandleSetParams([{ key: 'request_name', value: res }]);
      }),
    },

    {
      title: 'مقدار',
      dataIndex: 'count_request',
      render: (text, row) => {

        return (
          <div className="text-start d-flex align-items-center gap-2 ">
            {text} {row.unit?.unit}
          </div>
        );
      },
    },


    {
      title: 'محدودیت زمانی خرید',
      dataIndex: 'dead_time',

    },

    {
      title: 'وضعیت کنونی',
      dataIndex: 'status',
      render: (text) => {

        return (
          <div className="">
            {text.persian_title}
          </div>
        );
      },
    },
    {
      title: 'در انتظار',
      dataIndex: 'status',
      render: (text) => {

        return (
          <div className="">
            {text.waiting_status}
          </div>
        );
      },

    },

    {
      title: 'عملیات', dataIndex: 'function', key: 'function', fixed: 'right', render: (text, row) => {
        return <div className="text-center d-flex gap-1 d-flex justify-content-center">
          <RejectAcceptBox data={row} />
          <ShowProcess data={row} TooltipText="نمایش فرایند انجام شده" />

        </div>;
      },
    },

  ];
  return [columns];
};

export default ProductRequestColumn;
import React from 'react';


import UpdateCreateCustomer from './UpdateCreateCustomer';
import DeleteBox from '../../components/automation/AutomationFunctionButtons/DeleteBox';
import { hasPermission } from '../../permission/module';

const CustomerColumn = () => {


  const columns = [

    {
      title: 'تصویر',
      dataIndex: 'image',
      key: 'image',
      render: (text) => {
        return (
          <img
            alt="category"
            className="main-img img-responsive img-circle"
            // src={text ?? '/noImage.png'}
            src={text?.length > 4 ? text : '/noImage.png'}
            width={40}
            height={40}
          />
        );
      },
    },
    {
      title: 'نام ',
      dataIndex: 'first_name',
      key: 'first_name',

      // ...getColumnSearchProps('نام', filter.first_name, (res) => {
      //     funcHandleSetParams([{key: 'first_name', value: res}])
      // }),
    },
    {
      title: 'نام خانوادگی',
      dataIndex: 'last_name',
      key: 'last_name',
      // ...getColumnSearchProps('نام خانوادگی', filter.last_name, (res) => {
      //     funcHandleSetParams([{key: 'last_name', value: res}])
      // }),
    },
    {
      title: 'تلفن همراه',
      dataIndex: 'mobile',
      key: 'mobile',
      // ...getColumnSearchProps('تلفن همراه', filter.mobile, (res) => {
      //     funcHandleSetParams([{key: 'mobile', value: res}])
      // }),
    },
    {
      title: 'درجه ',
      dataIndex: 'customer_group_name',
      key: 'customer_group_name',
      // ...getColumnSelectProps(filter.customer_group_name, 'customer_group_name', "نام شرکت", customerGroupList, getCustomerGroupListList, (res) => {
      //     funcHandleSetParams([{key: 'customer_group_name', value: res}])
      // })
    },
    {
      title: 'ایمیل ',
      dataIndex: 'email',
      key: 'email',
      // ...getColumnSearchProps('ایمیل', filter.email, (res) => {
      //     funcHandleSetParams([{key: 'email', value: res}])
      // })
    },
    {
      title: 'وضعیت',
      dataIndex: 'activated',
      render: (text) => {
        return (
          <span className={`${Number(text) ? 'text-success' : 'text-danger'}`}>
            {Number(text) ? 'فعال' : 'غیر فعال'}
          </span>
        );
      },
      key: 'activated',
      // ...getColumnSelectProps(filter.activated, 'activated', "وضعیت", activateStatuses, null, (res) => {
      //     funcHandleSetParams([{key: 'activated', value: res}])
      // }),
    },

    {
      title: 'عملیات',
      dataIndex: 'function',
      key: 'function',
      fixed: 'right',
      render: (text, row) => {
        return (
          <div className="text-center d-flex flex-column w-100">
            <div className="text-center d-flex gap-1 d-flex justify-content-center">
              {hasPermission('customer', ['edit']) && <UpdateCreateCustomer rowData={row} />}
              {hasPermission('customer', ['delete']) && (
                <DeleteBox inDetail address="customer" rowData={row} />
              )}
            </div>
          </div>
        );
      },
    },
  ];
  return [columns];
};

export default CustomerColumn;

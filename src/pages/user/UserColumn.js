import React from 'react';
import { useSelector } from 'react-redux';
import UseSetParams from '../../helper/UseSetParams';
import { hasPermission } from '../../permission/module';
import SearchFilterTable from '../../components/MicroComponents/table/SearchFilterTable';
import DeleteBox from '../../components/automation/AutomationFunctionButtons/DeleteBox';
import UpdateCreateUser from './UpdateCreateUser';

const UserColumn = (permissionList, roleList, managerList) => {
  const filter = useSelector((state) => state.TableRedux.filter);
  const [getColumnSearchProps] = SearchFilterTable();

  const [handleSetParams] = UseSetParams();

  const funcHandleSetParams = (newFilter) => {
    handleSetParams(newFilter);
  };


  const columns = [

    {
      title: 'تصویر', dataIndex: 'image', key: 'image', render: (text) => {
        return <img
          alt="user"
          className="main-img img-responsive img-circle"
          // src={text ? getImageUrl() + text :  noImage }
          src={text?.length > 4 ? text : '/noImage.png'}
          width={40}
          height={40}

        />;
      },
    }, {
      title: 'نام', dataIndex: 'first_name', key: 'first_name', ...getColumnSearchProps('نام', filter?.name, (res) => {
        funcHandleSetParams([{ key: 'name', value: res }]);
      }), render: (text, row) => {
        return <div className="d-flex align-items-center gap-2">
          <span>{row.first_name}</span><span>{row.last_name}</span></div>;
      },
    }, {
      title: 'تلفن همراه',
      dataIndex: 'mobile',
      key: 'mobile', ...getColumnSearchProps('تلفن همراه', filter.mobile, (res) => {
        funcHandleSetParams([{ key: 'mobile', value: res }]);
      }),
    }, {
      title: 'ایمیل', dataIndex: 'email', key: 'email',
    }, {
      title: 'نام کاربری',
      dataIndex: 'username',
      key: 'username', ...getColumnSearchProps('نام کاربری ', filter.username, (res) => {
        funcHandleSetParams([{ key: 'username', value: res }]);
      }),
    }, {
      title: 'فعال ', dataIndex: 'activated', key: 'activated', render: (x) => {
        return x === 1 ? 'بله' : 'خیر';
      },
    }, {
      title: 'تنخواه  ', dataIndex: 'is_cashier', key: 'is_cashier', render: (x) => {
        return x === 1 ? 'بله' : 'خیر';
      },
    }, {
      title: 'عملیات', dataIndex: 'function', key: 'function', fixed: 'right', render: (text, row) => {
        return <div className="text-center d-flex flex-column w-100">
          <div className="text-center d-flex gap-1 d-flex justify-content-center">

            {hasPermission('user', ['edit']) && <UpdateCreateUser rowData={row} permissionList={permissionList}
                                                                  roleList={roleList}
                                                                  managerList={managerList} />}
            {hasPermission('user', ['delete']) && <DeleteBox inDetail address="user" rowData={row} />}


          </div>
        </div>;

      },
    },

  ];
  return [columns];
};

export default UserColumn;
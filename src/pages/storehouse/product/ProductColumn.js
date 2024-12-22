import React from 'react';
import { useSelector } from 'react-redux';
import SearchFilterTable from '../../../components/MicroComponents/table/SearchFilterTable';
import UseSetParams from '../../../helper/UseSetParams';
import { hasPermission } from '../../../permission/module';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import UpdateCreateProduct from './UpdateCreateProduct';
import ShowImageBox from '../../../components/MicroComponents/ShowImageBox';


const UserColumn = () => {
  const filter = useSelector((state) => state.TableRedux.filter);
  const [getColumnSearchProps] = SearchFilterTable();

  const [handleSetParams] = UseSetParams();

  const funcHandleSetParams = (newFilter) => {
    handleSetParams(newFilter);
  };

  const columns = [

    {
      title: 'تصویر',
      dataIndex: 'image',
      key: 'image',
      render: (text,row) => {
        return (
          <ShowImageBox row={row} />
        );
      },
    },
    {
      title: 'نام محصول',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('نام محصول', filter?.name, (res) => {
        funcHandleSetParams([{ key: 'name', value: res }]);
      }),
    },
    {
      title: 'کد ',
      dataIndex: 'sku',
      key: 'sku',

      // , ...getColumnSearchProps('کد', filter.sku, (res) => {
      //     funcHandleSetParams([{key: 'sku', value: res}])
      // }),
    },
    {
      title: 'توضیحات ',
      dataIndex: 'description',
      key: 'description',

      // ...getColumnSearchProps('توضیحات', filter.description, (res) => {
      //     funcHandleSetParams([{key: 'description', value: res}])
      // }),
    },

    //
    //     {
    //     title: 'موجود',
    //     dataIndex: 'username',
    //     key: 'username', ...getColumnSearchProps('نام کاربری ', filter.username, (res) => {
    //         funcHandleSetParams([{key: 'username', value: res}])
    //     }),
    // },
    //

    {
      title: 'دسته بندی ',
      dataIndex: 'category_name',
      key: 'category_name',
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
              {hasPermission('category', ['edit']) && <UpdateCreateProduct rowData={row} />}

              {hasPermission('product', ['delete']) && (
                // <DeleteBox inDetail address="product" rowData={row} />
                <ConfirmDeleteModal apiAddress="storehouse/product/remove" id={row?.id} />

              )}
            </div>
          </div>
        );
      },
    },
  ];
  return [columns];
};

export default UserColumn;

import React from 'react';
import { useSelector } from 'react-redux';
import UpdateCreateCategory from './UpdateCreateCategory';
import { hasPermission } from '../../../permission/module';
import SearchFilterTable from '../../../components/MicroComponents/table/SearchFilterTable';
import UseSetParams from '../../../helper/UseSetParams';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';

const CategoryColumn = () => {
  const filter = useSelector((state) => state.TableRedux.filter);
  const [getColumnSearchProps] = SearchFilterTable();

  const [handleSetParams] = UseSetParams();

  const funcHandleSetParams = (newFilter) => {
    handleSetParams(newFilter);
  };

  const columns = [
    {
      title: 'نام',
      dataIndex: 'row',
      className: 'text-start ',
      key: 'row',
      ...getColumnSearchProps('نام', filter.name, (res) => {
        funcHandleSetParams([{ key: 'name', value: res }]);
      }),
      render: (text, row) => {
        return (
          <div className="d-flex gap-2 align-items-center">
            <img
              alt="category"
              className="main-img img-responsive img-circle"
              src={row.icon || '/noImage.png'}
              width={40}
              height={40}
            />
            <span>{row?.name}</span>
          </div>
        );
      },
    },

    {

      title: 'کد',
      dataIndex: 'complete_code',
      key: 'complete_code',
      ...getColumnSearchProps('کد', filter.complete_code, (res) => {
        funcHandleSetParams([{ key: 'complete_code', value: res }]);
      }),

    },


    {
      title: 'عملیات',
      dataIndex: 'function',
      key: 'function',
      fixed: 'right',
      render: (text, row) => {
        return (
          <div className="text-center  d-flex flex-column w-100">
            <div className="text-center d-flex gap-1 d-flex justify-content-center">
              {hasPermission('storehouse_category', ['edit']) && <UpdateCreateCategory rowData={row} />}
              {hasPermission('storehouse_category', ['delete']) && (
                <ConfirmDeleteModal apiAddress="storehouse/category/remove" id={row?.id} />
              )}
            </div>
          </div>
        );
      },
    },
  ];
  return [columns];
};

export default CategoryColumn;

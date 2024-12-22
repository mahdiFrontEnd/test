import React from 'react';
import { useSelector } from 'react-redux';
import { hasPermission } from '../../../permission/module';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import UpdateCreateBrands from './UpdateCreateBrands';
import UseSetParams from '../../../helper/UseSetParams';
import SearchFilterTable from '../../../components/MicroComponents/table/SearchFilterTable';
import ShowImageBox from '../../../components/MicroComponents/ShowImageBox';

const StorehouseColumn = () => {
  const filter = useSelector((state) => state.TableRedux.filter);
  const [getColumnSearchProps,] = SearchFilterTable()
  const [handleSetParams,] = UseSetParams()

  const funcHandleSetParams = (newFilter) => {
      handleSetParams(newFilter)
  }

  const columns = [
    {
      title: 'نام',
      dataIndex: 'name',
      className: 'text-start ',
      key: 'name',
      ...getColumnSearchProps('نام', filter.name, (res) => {
          funcHandleSetParams([{key: 'name', value: res}])
      }),
      render: (text, row) => {
        return (
          <ShowImageBox row={row} />
        );
      },
    },
    {
      title: 'نام انگلیسی',
      dataIndex: 'english_name',
      ...getColumnSearchProps('نام', filter.english_name, (res) => {
        funcHandleSetParams([{key: 'english_name', value: res}])
      }),
    },
    {
      title: 'توضیحات',
      dataIndex: 'description',
      ...getColumnSearchProps('نام', filter.description, (res) => {
        funcHandleSetParams([{key: 'description', value: res}])
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
              {hasPermission('category', ['edit']) && <UpdateCreateBrands rowData={row} />}
              {hasPermission('category', ['delete']) && (
                <ConfirmDeleteModal apiAddress="storehouse/brand/remove" id={row?.id} />
              )}
            </div>
          </div>
        );
      },
    },
  ];
  return [columns];
};

export default StorehouseColumn;

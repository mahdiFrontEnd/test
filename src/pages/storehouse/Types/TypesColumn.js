import React from 'react';
import { useSelector } from 'react-redux';
import UseSetParams from "../../../helper/UseSetParams";
import { hasPermission } from '../../../permission/module';
import SearchFilterTable from "../../../components/MicroComponents/table/SearchFilterTable";
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import UpdateCreateTypes from './UpdateCreateTypes';

const StorehouseColumn = () => {

  const [handleSetParams,] = UseSetParams()
  const [getColumnSearchProps] = SearchFilterTable();
  const filter = useSelector((state) => state.TableRedux.filter);

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

    },

    {
      title: 'توضیحات',
      dataIndex: 'description',
      ...getColumnSearchProps('توضیحات', filter.description, (res) => {
        funcHandleSetParams([{key: 'description', value: res}])
      }),


      // render: (text) => {
      //   return (
      //
      //     <span>{text?.name}</span>
      //
      //   );
      // },
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
              {hasPermission('category', ['edit']) && <UpdateCreateTypes rowData={row} />}
              {hasPermission('category', ['delete']) && (
                <ConfirmDeleteModal apiAddress="storehouse/type/remove" id={row?.id} />
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

import React from 'react';
import { useSelector } from 'react-redux';
import { hasPermission } from '../../../permission/module';
import SearchFilterTable from '../../../components/MicroComponents/table/SearchFilterTable';
import UseSetParams from '../../../helper/UseSetParams';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import UpdateCreateAttributeCategories from './UpdateCreateAttributeCategories';

const AttributeCategoriesColumn = () => {
  const filter = useSelector((state) => state.TableRedux.filter);
  const [getColumnSearchProps] = SearchFilterTable();

  const [handleSetParams] = UseSetParams();

  const funcHandleSetParams = (newFilter) => {
    handleSetParams(newFilter);
  };

  const columns = [
    {
      title: 'نام',
      dataIndex: 'name',
      className: 'text-start ',
      key: 'name',
      ...getColumnSearchProps('نام', filter.name, (res) => {
        funcHandleSetParams([{ key: 'name', value: res }]);
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
              {hasPermission('category', ['edit']) && <UpdateCreateAttributeCategories rowData={row} />}
              {hasPermission('category', ['delete']) && (
                <ConfirmDeleteModal apiAddress="storehouse/attribute_category/remove" id={row?.id} />
              )}
            </div>
          </div>
        );
      },
    },
  ];
  return [columns];
};

export default AttributeCategoriesColumn;

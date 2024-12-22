import React from 'react';
import { useSelector } from 'react-redux';
import UseSetParams from '../../../helper/UseSetParams';
import { hasPermission } from '../../../permission/module';
import SearchFilterTable from '../../../components/MicroComponents/table/SearchFilterTable';
import DeleteBox from '../../../components/automation/AutomationFunctionButtons/DeleteBox';
import UpdateCreateWarehouses from './UpdateCreateWarehousesLocation';

const WarehousesLocation = () =>
{
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
      key: 'name',
      ...getColumnSearchProps('نام', filter?.name, (res) => {
        funcHandleSetParams([{ key: 'name', value: res }]);
      }),
    },
    {
      title: 'مدیریت',
      dataIndex: 'manager_name',
      key: 'manager_name',
    },
    {
      title: 'فعال ',
      dataIndex: 'activated',
      key: 'activated',
      render: (x) => {
        return x === 1 ? 'بله' : 'خیر';
      },
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
              {hasPermission('warehouse_location', ['edit']) && <UpdateCreateWarehouses rowData={row} />}
              {hasPermission('warehouse_location', ['delete']) && (
                <DeleteBox inDetail address="warehouse_location" rowData={row} />
              )}
            </div>
          </div>
        );
      },
    },
  ];
  return [columns];
};

export default WarehousesLocation;

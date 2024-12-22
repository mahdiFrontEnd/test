import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UseSetParams from '../../../helper/UseSetParams';
import { hasPermission } from '../../../permission/module';
import DeleteBox from '../../../components/automation/AutomationFunctionButtons/DeleteBox';
import UpdateCreateWarehouses from './UpdateCreateWarehouses';
import SelectFilterTable from '../../../components/MicroComponents/table/SelectFilterTable';
import GetWarehouseTypeList from '../../../api/http_request/Model/common/GetWarehouseTypeList';
import GetWarehouseLocationList from '../../../api/http_request/Model/common/GetWarehouseLocationList';
import SearchFilterTable from "../../../components/MicroComponents/table/SearchFilterTable";

const UserColumn = () => {
  const filter = useSelector((state) => state.TableRedux.filter);
  const [getColumnSelectProps] = SelectFilterTable();
  const [locationList, setLocationList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [handleSetParams] = UseSetParams();
  const handleGetWarehouseTypeList = () => {
    GetWarehouseTypeList(setTypeList);
  };
  const handleGetWarehouseLocationList = () => {
    GetWarehouseLocationList(setLocationList);
  };

  const funcHandleSetParams = (newFilter) => {
    handleSetParams(newFilter);
  };
  const [getColumnSearchProps] = SearchFilterTable();

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
      title: 'نوع',
      dataIndex: 'warehouse_type_id',
      key: 'warehouse_type_id',

      ...getColumnSelectProps(
        filter.warehouse_type_id,
        'warehouse_type_id',
        'موضوع',
        typeList,
        handleGetWarehouseTypeList,
        (res) => {
          funcHandleSetParams([{ key: 'warehouse_type_id', value: res }]);
        },
        'single',
      ),
      render: (item,row) => {
        return row.warehouse_type_name;
      },
    },
    {
      title: 'موقعیت ',
      dataIndex: 'warehouse_location_id',
      key: 'warehouse_location_id',

      ...getColumnSelectProps(
        filter.warehouse_location_id,
        'warehouse_location_id',
        'موقعیت',
        locationList,
        handleGetWarehouseLocationList,
        (res) => {
          funcHandleSetParams([{ key: 'warehouse_location_id', value: res }]);
        },
        'single',
      ),
      render: (item,row) => {
        return row.warehouse_location_name;
      },
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
              {hasPermission('warehouse', ['edit']) && <UpdateCreateWarehouses rowData={row} />}
              {hasPermission('warehouse', ['delete']) && (
                <DeleteBox inDetail address="warehouse" rowData={row} />
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

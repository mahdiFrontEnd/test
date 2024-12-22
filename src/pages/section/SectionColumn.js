import React from 'react';
import { hasPermission } from '../../permission/module';
import DeleteBox from '../../components/automation/AutomationFunctionButtons/DeleteBox';
import UpdateCreateSection from './UpdateCreateSection';

const SectionColumn = () => {
  // const filter = useSelector((state) => state.TableRedux.filter);
  // const [getColumnSearchProps,] = SearchFilterTable()

  // const [handleSetParams,] = UseSetParams()

  // const funcHandleSetParams = (newFilter) => {
  //     handleSetParams(newFilter)
  // }

  const columns = [
    {
      title: 'نام',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'نام فارسی',
      dataIndex: 'name_fa',
      key: 'name_fa',
    },
    {
      title: 'نام مدیر',
      dataIndex: 'manager_name',
      key: 'manager_name',
    },
    {
      title: 'کد مرکز هزینه',
      dataIndex: 'cost_center_code',
      key: 'cost_center_code',
    },
    {
      title: 'فعال',
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
              {hasPermission('section', ['edit']) && <UpdateCreateSection rowData={row} />}
              {hasPermission('section', ['delete']) && (
                <DeleteBox inDetail address="section" rowData={row} />
              )}
            </div>
          </div>
        );
      },
    },
  ];
  return [columns];
};

export default SectionColumn;

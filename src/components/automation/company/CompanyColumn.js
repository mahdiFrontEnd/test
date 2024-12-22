import React from 'react';
import { useSelector } from 'react-redux';
import DeleteBox from '../AutomationFunctionButtons/DeleteBox';
import SearchFilterTable from '../../MicroComponents/table/SearchFilterTable';
import UseSetParams from '../../../helper/UseSetParams';
import UpdateCreateCompanies from './UpdateCreateCompanies';
import { hasPermission } from '../../../permission/module';

const CompanyColumn = () => {
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
      ...getColumnSearchProps('نام', filter.name, (res) => {
        funcHandleSetParams([{ key: 'name', value: res }]);
      }),
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
              {hasPermission('automation_company', ['edit']) && (
                <UpdateCreateCompanies rowData={row} />
              )}
              {hasPermission('automation_company', ['delete']) && (
                <DeleteBox inDetail address="automation_company" rowData={row} />
              )}
            </div>
          </div>
        );
      },
    },
  ];
  return [columns];
};

export default CompanyColumn;

import React from 'react';

 import DeleteBox from '../../../components/automation/AutomationFunctionButtons/DeleteBox';
import { hasPermission } from '../../../permission/module';

const CleaningColumn = () => {


  const columns = [
        {
        title: 'ردیف', dataIndex: 'row', key: 'row', render: (text, row, index) => {
            return index + 1
        },
    },

    {
      title: 'مکان',
      dataIndex: 'location',
      key: 'location',

    },
    {
      title: 'ناظر',
      dataIndex: 'supervisor',
      key: 'supervisor',

    },
    {
      title: 'بازه زمانی',
      dataIndex: 'period',
      key: 'period',

    },
    {
      title: 'تاریخ ',
      dataIndex: 'date',
      key: 'date',

    },

    {
      title: 'وضعیت',
      dataIndex: 'activated',
      render: (text) => {
        return (
          <span className={`${Number(text) ? 'text-success' : 'text-danger'}`}>
            {Number(text) ? 'انجام شده' : 'انجام نشده'}
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
               {hasPermission('customer', ['delete']) && (
                <DeleteBox inDetail address="hse" rowData={row} />
              )}
            </div>
          </div>
        );
      },
    },
  ];
  return [columns];
};

export default CleaningColumn;

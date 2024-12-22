import React from 'react';
import { Table } from 'antd';
import Loader from '../../../layouts/loader/Loader';
import usePagination from './usePagination';


const TableBox = ({
                    columns,
                    dataRows,
                    totalCount,
                    expandable,
                    loading,
                    onDoubleClickRow,
                    showSizeChanger,
                    showPagination,
                    handleRowClassName,
                  }) => {

  const [paginationJson] = usePagination(totalCount, showSizeChanger, showPagination);


  return <Table size="small" rowKey={(record) => record.id} onRow={(record) => {
    return {
      onDoubleClick: (f) => {
        // eslint-disable-next-line no-unused-expressions
        onDoubleClickRow && onDoubleClickRow(record, f);
      },

    };
  }}

                loading={{
                  indicator: <Loader />, spinning: loading === 'isDataTable',
                }}
                columns={columns}
                rowClassName={(record) => {
                  if (handleRowClassName) {
                    return handleRowClassName(record);
                  } 

                    return record.seen === false && 'red20';
                  
                }}
                pagination={paginationJson}
                dataSource={dataRows} expandable={expandable}
  />;
};
export default TableBox;
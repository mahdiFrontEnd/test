import React from 'react';

const ShowTopTable = ({ address, data }) => {
  return (
    <div className="d-flex">
      <div className="keyValue d-flex flex-1 justify-content-center border-1 px-3 py-2 align-items-center  border-end">
        <div className="key">واحد درخواست کننده:</div>
        <div className="value">{data.section_name}</div>
      </div>
      <div className="d-flex justify-content-center border-1 px-3 py-2 align-items-center  border-end  keyValue">
        <div className="key">کد مرکز هزینه:</div>
        <div className="value">{data.cost_center_code || '....'}</div>
      </div>

      {address !== 'inventory_temporary_receipt' && (
        <div className="d-flex justify-content-center border-1 py-2  border-end flex-1 align-items-center">
          <div className="keyValue  ">
            <div className="key">نوع تحویل:</div>
            <div className="value">{data.delivery_type_name}</div>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-center flex-1   border-end  py-2   align-items-center  ">
        <div className="keyValue  ">
          <div className="key">مبدا_مرکز نگهداری انبار:</div>
          <div className="value">{data.warehouse_location_name}</div>
        </div>
      </div>
      <div className="d-flex justify-content-center flex-1   py-2   align-items-center  ">
        <div className="keyValue  ">
          <div className="key">
            {address === 'inventory_remittance' ? 'مشتری:' : 'مقصد_مرکز نگهداری انبار:'}
          </div>
          <div className="value">
            {address === 'inventory_remittance'
              ? data.customer_name
              : data.to_warehouse_location_name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowTopTable;

import React from 'react';
import { useSelector } from 'react-redux';

const CostCenterCodeBox = () => {
  const costCenterCode = useSelector((state) => state.InventoryRequestRedux2.costCenterCode);

  return (
       <div className="w-100  d-flex justify-content-center border-1 px-3 py-2 align-items-center  keyValue">
        <div className="key">کد مرکز هزینه:</div>
        <div className="value">{costCenterCode}</div>
      </div>
   );
};

export default CostCenterCodeBox;

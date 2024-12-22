import React from 'react';

const InventoryPlaceConsumption = ({ data }) => {
  return (
    <div className="keyValue">
      <div className="key">محل مصرف:</div>
      <div className="value">{data?.name}</div>
    </div>
  );
};

export default InventoryPlaceConsumption;

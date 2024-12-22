import React from 'react';

const FromWarehouse = ({ data }) => {
  return (
    <div className="keyValue">
      <div className="key">مبدا:</div>
      <div className="value">{data?.name}</div>
    </div>
  );
};

export default FromWarehouse;

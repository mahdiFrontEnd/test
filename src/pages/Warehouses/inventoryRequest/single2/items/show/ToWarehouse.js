import React from "react";

const ToWarehouse = ({data}) => {
  return (
    <div className="keyValue">
      <div className="key">مقصد:</div>
      <div className="value">{data?.name}</div>
    </div>
  );
};

export default ToWarehouse;
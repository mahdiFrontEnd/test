import React from "react";

const BatchNumber = ({data}) => {
  return (
    <div className="keyValue">
      <div className="key">شماره بچ: </div>
      <div className="value">{data}</div>

    </div>
  );
};

export default BatchNumber;
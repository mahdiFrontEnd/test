import React from "react";

const Quantity = ({data,unit}) => {
  return (


    <div className="keyValue">
      <div className="key">مقدار: </div>
      <div className="value">
        <div className="d-flex gap-2">
          <span>{data}</span>
          <span>{unit}</span>
        </div>
      </div>

    </div>


  )
    ;
};

export default Quantity;
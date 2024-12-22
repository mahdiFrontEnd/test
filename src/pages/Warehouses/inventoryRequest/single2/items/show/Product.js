import React from "react";

const Product = ({data}) => {
  return (

      <div className="keyValue">
        <div className="key">نام محصول:</div>
        <div className="value">{data}</div>

    </div>
  );
};

export default Product;
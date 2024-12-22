import React from "react";

const Description = ({data}) => {
  return (
    <div className="keyValue">
      <div className="key">توضیحات:</div>
      <div className="value">{data}</div>
    </div>
  );
};

export default Description;
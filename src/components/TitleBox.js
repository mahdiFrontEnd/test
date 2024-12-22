import React from 'react';
import ComponentCard from './ComponentCard';

const TitleBox = ({ children, title, adterBox }) => {
  return (
    <div>
      <ComponentCard>
        <div className="d-flex justify-content-between align-items-start  gap-3 flex-wrap">
          <h4 className="mainTitle">{title}</h4>
          <div className="d-flex flex-1 gap-2 align-items-center justify-content-end flex-wrap">
            {children}
          </div>
        </div>
        {adterBox}
      </ComponentCard>
    </div>
  );
};

export default TitleBox;
import React from 'react';

const LoadingAutoDetail = () => {
  return (
    <div className="w-100 h-100 infoDetail  " aria-hidden="true">

      <div className="d-flex mt-3 gap-1">

        <span className="placeholder image-avatar col-4"></span>

        <div className="ms-3 w-100">
          <div>
            <p className="placeholder col-12 pb-4"></p>
          </div>
          <p className="placeholder col-12 pt-5" style={{ height: '70px' }}></p>
        </div>
      </div>
    </div>
  );
};

export default LoadingAutoDetail;

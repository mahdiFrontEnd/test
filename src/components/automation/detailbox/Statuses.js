import React from 'react';
import { imageOnError, imageOnLoad } from '../../../functions';

const StatusesDetail = ({ data }) => {
  return (
    <div className="mb-2 me-2 text-center" style={{ maxWidth: '100px' }}>

      <div className="image-box d-flex flex-column align-items-center justify-content-center">
        <img
          src={data.signature_image || data.image}
          alt="avatar"
          className="image-box-inner rounded-circle"
          onLoad={imageOnLoad}
          onError={imageOnError}
          style={{ width: '50px' }}
        />
        <span style={{ fontSize: '13px' }} className="mt-2">
            {data.name}
          </span>
        {data.status === 1 ? (
          <span className="text-success">تایید می شود</span>
        ) : (
          <span className="text-danger">رد می شود</span>
        )}
      </div>

      <span className="text-primary" style={{ fontSize: '13px' }}>
        {data.created_at}
      </span>
    </div>
  );
};

export default StatusesDetail;

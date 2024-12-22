import React from 'react';
import { baseURL } from '../../api/http_request/url';

const ShowImageBox = ({row}) => {
  return (
    <div>
      <div className="d-flex gap-2 align-items-center">
        <img
          alt="category"
          className="main-img img-responsive img-circle"
          src={row?.attachments[0] ? `${baseURL}/${row?.attachments[0]?.path[0]?.indexArray?.small}` : '/noImage.png'}
          width={40}
          height={40}
        />
        <span>{row?.name}</span>
      </div>
    </div>
  );
};

export default ShowImageBox;
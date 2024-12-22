import React from 'react';
import { Link } from 'react-router-dom';
import FileIconDisplay from '../../FileIconDisplay';
import { baseURL } from '../../../api/http_request/url';

const AttachmentsShow = ({ data , handleClickLink}) => {
  return (
    <div className="d-flex gap-4 flex-wrap align-items-center ">
      {data.map((x) => (
        <Link
          onClick={()=>{
            // eslint-disable-next-line no-unused-expressions
            handleClickLink && handleClickLink()
          }}
          key={x}
          to={baseURL + x}
          download={x}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div key={x}>
            <FileIconDisplay fileAddress={x} />
          </div>
        </Link>

      ))}


    </div>


  );
};

export default AttachmentsShow;

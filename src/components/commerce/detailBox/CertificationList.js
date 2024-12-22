import React from 'react';
import {Media} from 'reactstrap';
import {imageOnError, imageOnLoad} from '../../../functions';
import AttachmentsShow from '../../automation/detailbox/AttachmentsShow';

const CertificationList = ({ data }) => {
  return (
    <Media className="automationCm">
      <Media href="#">
        <img
          src={data.image_of_created_by}
          alt="avatar"
          width="80"
          className="rounded-circle"
          style={{ paddingLeft: '1rem' }}
          onLoad={imageOnLoad}
          onError={imageOnError}
        />
      </Media>
      <Media className="w-100">
        <Media className="w-100 position-relative d-flex align-items-center justify-content-between">
          <Media>{data.created_by}</Media>
          <Media className="date">{data.created_at}</Media>
        </Media>
        <div className="text-box">
          {data.status && <div>{data.status}</div>}
          {data.body && <div dangerouslySetInnerHTML={{ __html: data.body }}/>}
          {data.price && data.status === 'حواله ارزی' && (
            <div className="mt-3">
              <span>مبلغ حواله : </span>
              <span className="text-primary">{Number(data.price).toLocaleString()}</span>
              <span className="ms-1 text-primary">یورو</span>
            </div>
          )}
          {data.attachments.length > 0 && <AttachmentsShow data={data.attachments} />}
        </div>
      </Media>
    </Media>
  );
};

export default CertificationList;

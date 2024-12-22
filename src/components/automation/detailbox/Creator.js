import React from 'react';
import {Card, CardBody, CardTitle} from 'reactstrap';
import {imageOnError, imageOnLoad} from '../../../functions';

const CreatorDetail = ({ data }) => {
  
  return (
    <Card>
      <CardBody className="p-4 border-bottom">
        <h5 className="mb-3">ایجاد شده توسط :</h5>
        <div className="text-center">
          <img
            src={data.image_of_created_by}
            className="rounded-circle"
            width="90"
            alt="avatar"
            onLoad={imageOnLoad}
            onError={imageOnError}
          />
        </div>

        <CardTitle tag="h4" className="fw-bold mt-3 mb-0 text-center ">
          {data.created_by}
        </CardTitle>
      </CardBody>
    </Card>
  );
};

export default CreatorDetail;

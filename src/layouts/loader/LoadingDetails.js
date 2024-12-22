import React from 'react';
import { Card, CardBody, Row } from 'reactstrap';

const LoadingDetails = () => {
  return (<div className="w-100 h-100 infoDetail" aria-hidden="true">
      <div className="automation-detail-data">
        <Row className="flex-column-reverse flex-lg-row">

          <Card className="p-2">
            <CardBody>
              <div className="text-center pb-3">
                <span className="placeholder image-avatar col-8"></span>
              </div>
              <div className="text-center pb-3">
                <span className="placeholder col-7"></span>
              </div>

              <p className="card-textplaceholder-glow w-100">
                <span className="placeholder w-100 p-2 "></span>

              </p>

              <p className="card-textplaceholder-glow w-100">
                <span className="placeholder w-100 p-2 "></span>

              </p>

            </CardBody>
          </Card>
        </Row>
      </div>
    </div>);
};

export default LoadingDetails;
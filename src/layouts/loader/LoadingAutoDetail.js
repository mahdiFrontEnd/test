import React from 'react';
import {Card, CardBody, Row} from 'reactstrap';

const LoadingAutoDetail = () => {
  return (
    <div className="w-100 h-100 infoDetail" aria-hidden="true">
      <div className="automation-detail-data">
        <Row className="flex-column-reverse flex-lg-row">

            <Card className="px-0 mb-2">
              <CardBody>
                <p className="card-text d-flex pb-4 justify-content-between  placeholder-glow w-100">
                  <span className="placeholder col-3"></span>
                  <span className="placeholder col-8"></span>
                </p>
                <p className="card-text d-flex pb-4 justify-content-between align-items-start  placeholder-glow w-100">
                  <span className="placeholder col-3"></span>
                  <span className="placeholder col-8" style={{ height: '70px' }}></span>
                </p>
                <p className="card-text d-flex pb-4 justify-content-between  placeholder-glow w-100">
                  <span className="placeholder col-3"></span>
                  <span className="placeholder col-8"></span>
                </p>
                <p className="card-text d-flex pb-4 justify-content-between  placeholder-glow w-100">
                  <span className="placeholder col-3"></span>
                  <span className="placeholder col-8"></span>
                </p>
              </CardBody>
            </Card>

            <Card  className="px-0 mb-2">
              <CardBody>
                <h5 className="mb-4 d-flex align-items-center justify-content-between">
                  <span className="placeholder col-3"></span>
                </h5>
                <div className="d-flex mt-3">
                  <div href="#">
                    <span className="placeholder image-avatar col-4"></span>
                  </div>
                  <div className="ms-3 w-100">
                    <div>
                      <p className="placeholder col-12 pb-4"></p>
                    </div>
                    <p className="placeholder col-12 pt-5" style={{ height: '70px' }}></p>
                  </div>
                </div>
              </CardBody>
            </Card>


        </Row>
      </div>
    </div>
  );
};

export default LoadingAutoDetail;

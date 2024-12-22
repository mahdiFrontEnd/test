import React from 'react';
import { Card, CardBody } from 'reactstrap';
import DateObject from 'react-date-object';
import StatusModal from '../modalbox/StatusModal';
import { hasPermission } from '../../../permission/module';

const PurchaseInfoBox = ({ data }) => {
  return (
    <div>
      <Card className="mb-2 w-100 w-lg-300">

        <CardBody className="position-relative d-md-flex d-lg-block justify-content-between align-items-end">
          <div className="row">
            <div className="col-sm-6  col-lg-12  px-2">
              <div className="keyValue justify-content-between mb-3">
                <div className="key">شماره پرفرما</div>
                <div className="value">{data.performa_id}</div>
              </div>
            </div>
            <div className="col-sm-6  col-lg-12  px-2">
              <div className="keyValue justify-content-between mb-3">
                <div className="key">شماره صورت حساب</div>
                <div className="value">{data.invoice_id ?? '---'}</div>
              </div>
            </div>
            <div className="col-sm-6  col-lg-12  px-2">
              <div className="keyValue justify-content-between mb-3">
                <div className="key">تاریخ پرفرما:</div>
                <div className="value">     {new DateObject(data.performa_date * 1000).format('YYYY MMM DD')}</div>
              </div>
            </div>
            <div className="col-sm-6  col-lg-12  px-2">
              <div className="keyValue justify-content-between mb-3">
                <div className="key">نام شرکت :</div>
                <div className="value">{data.supplier_name}</div>
              </div>
            </div>
            <div className="col-sm-6  col-lg-12  px-2">
              <div className="keyValue justify-content-between mb-3">
                <div className="key">تاریخ ثبت :</div>
                <div className="value">{data.created_at}</div>
              </div>
            </div>
            <div className="col-sm-6  col-lg-12  px-2"></div>
            <div className="col-sm-6  col-lg-12  px-2"></div>
          </div>


          <hr />
          <div className="d-flex justify-content-end">
            {hasPermission('commerce_purchase', ['approve', 'reject']) && <StatusModal
              btnText="وضعیت یا مجوز جدید" btnClass="w-100"
              rowData={data} />}
          </div>

        </CardBody>
      </Card>
    </div>
  );
};

export default PurchaseInfoBox;
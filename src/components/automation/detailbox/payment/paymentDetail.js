import React, { useRef } from 'react';
import { Media } from 'reactstrap';
import { imageOnError, imageOnLoad } from '../../../../functions';
import { ComponentToPrint } from '../../../ComponentToPrint';
import PrintPayment from '../PrintPayment';
import PrintButton from '../PrintButton';
import AttachmentsShow from '../AttachmentsShow';

const PaymentDetail = ({ data, detail }) => {


  const componentRefDetailPayment = useRef();
  return (
    <Media className="automationCm  ">

      <Media className="w-100">

        <div className="text-box">
          <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
            <div className="d-flex align-items-center gap-2">
              <img
                src={data.image_of_created_by}
                alt={data.created_by}
                width="50"
                className="rounded-circle"
                onLoad={imageOnLoad}
                onError={imageOnError}
              />


              <span className="white-space-nowrap">{data.created_by}</span>


            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex justify-content-end gap-2 align-items-center">
                <span>{data.created_at}</span>


              </div>

              <PrintButton content={componentRefDetailPayment} />

            </div>
          </div>

          {data.price && (<>
              <div className={data.body && 'mb-9'}>
                <span>مبلغ پرداخت شده : </span>
                <span className="text-primary">{Number(data.price).toLocaleString()}</span>
                <span className="ms-1 text-primary">ریال</span>
              </div>
              {data.bank && <div className={data.body && 'mb-9 mt-4'}>
                <span>از </span>
                <span>{data.bank}</span>

              </div>}
            </>
          )}
          {data.body && <div className="mt-4" dangerouslySetInnerHTML={{ __html: data.body }} />}
          {data?.attachments?.length > 0 && <AttachmentsShow data={data.attachments} />}


        </div>

      </Media>
      <ComponentToPrint ref={componentRefDetailPayment}>

        <PrintPayment detail={detail} item={data} key={data.id} />

      </ComponentToPrint>
    </Media>
  );
};


export default PaymentDetail;
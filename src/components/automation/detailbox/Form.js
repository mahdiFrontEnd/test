import React from 'react';

import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import { AiOutlineDoubleLeft } from 'react-icons/ai';
import { Card, CardBody } from 'reactstrap';
import { Typography } from 'antd';
import { useSelector } from 'react-redux';
import AttachmentsShow from './AttachmentsShow';
import PrepaymentBox from '../AutomationFunctionButtons/PrePrintBox';
import EditBox from './EditBox';


const { Paragraph } = Typography;


const FormDetail = ({ data, PrintButton }) => {
  const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);

  return (<>
    <Card className=" mb-2">
      <CardBody>

        <div className="d-flex justify-content-between flex-wrap">
          {(data.subject || data.type) && (
            <div className="d-flex align-items-center gap-2 pe-5 ">

              <AiOutlineDoubleLeft size={26} className="orangeText" />
              <h3 className="  mb-0 orangeText">
                {`${data.type && data.type}${(data.subject && data.type) ? '-' : ''}${data.subject ?? ''}`}
              </h3>
            </div>)}

          <div className="  flex-1 d-flex align-items-center gap-1 justify-content-end ">

            {PrintButton}
            <EditBox data={data} />
            {automationAddress === 'payment' && <div className="w-fit-content"><PrepaymentBox rowData={data} /></div>}


          </div>
        </div>

        <hr className="mb-4" />
        {data.price && (<div className="d-flex align-items-center gap-2 pb-3">

            <div>مبلغ ( ریال ):</div>
            <div className=" text-black">
              <Paragraph className="mb-0"
                         copyable={{
                           text: data.price,
                         }}
              >
                {Number(data.price).toLocaleString()}
              </Paragraph>


            </div>
          </div>

        )}

        {automationAddress === 'payment' && <>
          <div className="d-flex align-items-center gap-2 pb-3">

            <div>نوع پرداخت:</div>
            <div className=" text-black">
              {data.pay_type ? data.pay_type === 'cheque' ? 'چکی' : 'نقدی' : 'نامشخص'}
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 pb-3">

            <div>در وجه:</div>
            <div className=" text-black">
              {data.pay_to}
            </div>
          </div>

          {data.pay_type === 'cheque' ? <div className="d-flex align-items-center gap-2 pb-3">

              <div>{data.target_type === 1 ? 'شماره ملی' : 'شناسه ملی'}:</div>
              <div className=" text-black">
                <Paragraph className="mb-0"
                           copyable={{
                             text: data.id_number,
                           }}
                >
                  {data.id_number}
                </Paragraph>

              </div>
            </div>
            : <div className="d-flex align-items-center gap-2 pb-3">
              {data?.sheba && <>
                <div>شماره شبا:</div>
                <div className=" text-black">
                  <Paragraph className="mb-0"
                             copyable={{
                               text: data?.sheba,
                             }}
                  >
                    IR{data?.sheba}
                  </Paragraph>


                </div>
              </>}
            </div>
          }
        </>}


        {data.new_price && (<div className="d-flex align-items-center gap-2 pb-3">

            <div> آخرین مبلغ ارجاع شده ( ریال ):</div>
            <div className=" text-black">
              {Number(data.new_price).toLocaleString()}
            </div>
          </div>


        )}
        {data.destination && (<div className="d-flex align-items-center gap-2 pb-3">

            <div> مقصد:</div>
            <div className=" text-black">
              {data.destination}
            </div>
          </div>

        )}
        {data.start_date && (<div className="d-flex align-items-center gap-2 pb-3">

          <div> {data.end_date ? 'از تاریخ' : 'روز'}:</div>
          <div className=" text-black">
            {data.start_date && new DateObject({
              date: data.start_date * 1000, calendar: persian,
            }).format('YYYY/MM/DD')}
          </div>
        </div>)}

        {data.end_date && (<div className="d-flex align-items-center gap-2 pb-3">

          <div> تا تاریخ:</div>
          <div className=" text-black">
            {data.end_date && new DateObject({
              date: data.end_date * 1000, calendar: persian,
            }).format('YYYY/MM/DD')}
          </div>
        </div>)}
        {data.start_time && (<div className="d-flex align-items-center gap-2 pb-3">

            <div> از ساعت:</div>
            <div className=" text-black">
              {data.start_time}
            </div>
          </div>

        )}
        {data.end_time && (<div className="d-flex align-items-center gap-2 pb-3">

            <div> تا ساعت:</div>
            <div className=" text-black">
              {data.end_time}
            </div>
          </div>

        )}
        {data.company && (<div className="d-flex align-items-center gap-2 pb-3">

          <div> شرکت:</div>
          <div className=" text-black">
            {data.company}
          </div>
        </div>)}
        {data.body && (<div className="d-flex align-items-start gap-2 ">

            <div className="d-block"> متن:</div>
            <div className="text-gray flex-1 ps-3 border-start fs-5" style={{}}>
              <div dangerouslySetInnerHTML={{ __html: data.body }} />
            </div>
          </div>

        )}


        {data?.attachments?.length > 0 ? (


          <div className="pb-3 pt-5">

            {/*<div> فایل ضمیمه ({data?.attachments?.length} مورد ) :</div>*/}
            <div className=" text-black">
              <AttachmentsShow data={data?.attachments} />
            </div>
          </div>) : ''

        }
      </CardBody>
    </Card>
  </>);
};

export default FormDetail;
;

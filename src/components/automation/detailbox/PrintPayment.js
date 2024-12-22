import React from 'react';
import Clock from 'react-live-clock';
import PN from 'persian-number';
import { ConvertToPrice } from '../../../helper/ConvertToPrice';
import ConvertTimestampToDate from '../../../helper/ConvertTimestampToDate';

const PrintPayment = ({ detail, item }) => {


  return (<div className="text-black border border-black  m-auto bg-white mt-4 w-75"
               style={{ fontSize: '10px' }}>
    <div className="px-4 pt-4">
      <div className="text-center">
        <h4 className="fw-bold text-black">شرکت کشاورزی حاصل نوین</h4>
        <span>(سهامی خاص)</span>
        <h3 className="fw-bold text-black mt-4">پرداخت وجه</h3>
      </div>
      <div className="d-flex align-items-end justify-content-between">

        <div className="keyValue">
          <p className="mb-1">درخواست کننده:</p>
          <p className="mb-1">{detail?.created_by}</p>
        </div>


        <div className="d-flex align-items-end flex-column">


          <div className="keyValue" style={{ fontSize: '10px' }}>
            <p className="mb-1">تاریخ:</p>
            <p className="mb-1"><Clock
              format={`${new Intl.DateTimeFormat('fa-IR', {
                year: 'numeric', month: 'numeric', day: 'numeric',
              }).format()} `}
              ticking
            /></p>
          </div>

          <div className="keyValue">
            <p className="mb-1">پیوست:</p>
            <p className="mb-1">..................</p>
          </div>


        </div>


      </div>
    </div>
    <hr />

    <div className="px-4">
      <h4 className="fw-bold mb-4 text-center text-black">امور مالی</h4>


      <div className="keyValue mb-4">
        <p className="mb-1 white-space-nowrap">پرداخت وجه به مبلغ:</p>
        <div className="value mb-1">{ConvertToPrice(item?.price)}(ریال)</div>
        <p className="mb-1  me-2 white-space-nowrap">به حروف:</p>
        <p className="mb-1"> {PN.convert(item?.price)} (ریال)</p>
      </div>

      <div className="d-flex align-items-center justify-content-between">
        {item.cheque_date && <div className="keyValue ">
          <p className="mb-1">تاریخ چک:</p>
          <p className="mb-1">{ConvertTimestampToDate(item.cheque_date)}</p>

        </div>}
        {item.cheque_number && <div className="keyValue ">
          <p className="mb-1">شماره چک:</p>
          <p className="mb-1">{item.cheque_number}</p>

        </div>}
        {detail?.sheba && <div className="keyValue ">
          <p className="mb-1">شماره شبا:</p>
          <p className="mb-1">IR{detail?.sheba}</p>

        </div>}

      </div>


      <div className="d-flex justify-content-between my-4">
        <div className="keyValue ">
          <p className="mb-1">بابت:</p>
          <p className="mb-1">{detail?.subject}</p>

        </div>
        <div className="keyValue ">
          <p className="mb-1">در وجه:</p>
          <p className="mb-1">{detail?.pay_to}</p>

        </div>

      </div>
      <div className="keyValue ">

        <p className="mb-1">از {item?.bank?.title}</p>

      </div>


    </div>
    <hr />
    <div className="d-flex px-4">
      <div className="flex-1 border-start border-black px-4">
        <h6 className="text-black">مدیرت محترم عامل</h6>
        <p className="text-gray">با انتقال وجه با مشخصات فوق موافقت میشود.</p>
        <p className="text-black text-center mt-4 ms-5">امور مالی</p>
      </div>
      <div className="flex-1  px-4">
        <h6 className="text-black">امور مالی</h6>
        <p className="text-gray">با انتقال وجه با مشخصات فوق موافقت میشود.</p>
        <p className="text-black text-center mt-4 ms-5">مدیر عامل</p>
      </div>
    </div>
    <hr />
    <div className="px-4">
      <p className="text-black">پرداخت وجه انجام گردید.</p>
      <p className="text-black text-center mt-4 ms-5">و امضا پرداخت کننده</p>
    </div>
  </div>);
};

export default PrintPayment;
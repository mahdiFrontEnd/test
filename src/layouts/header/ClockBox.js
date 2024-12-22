import React from 'react';
import { IoFingerPrint } from 'react-icons/io5';
import { LuScanFace } from 'react-icons/lu';
import { Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ClockBox = () => {
  const attendance = useSelector((state) => state.AttendanceRedux.attendance);

  return (<div><Link to="/automation/attendance">
    <div style={{ fontSize: '13px' }} className=" d-none d-sm-flex align-items-center gap-2 ">
      {/*<Clock*/}
      {/*  format={`${new Intl.DateTimeFormat('fa-IR', {*/}
      {/*    weekday: 'long',*/}
      {/*  }).format()} `}*/}
      {/*  ticking*/}
      {/*/>*/}


      <div className="d-flex align-items-center gap-2 text-gray">
        <span className="fs-7">ساعت ورود:  </span>
        {
          attendance?.type ?
            <>
              <span className="text-success fw-bold fs-4">{attendance?.time_in}</span>

              <Tooltip title={attendance?.type === 'finger' ? 'ورود با اثر انگشت' : 'ورود با تشخیص چهره'}>
                {attendance?.type === 'finger' ? <IoFingerPrint size={22} /> : <LuScanFace size={22} />

                }
              </Tooltip>

            </>
            :
            <span className="fw-bold text-danger ">ثبت نشده</span>
        }


      </div>

      {/*<span className="opacity-50">|</span>*/}
      {/*<Clock*/}
      {/*  format={`${new Intl.DateTimeFormat('fa-IR', {*/}
      {/*    year: 'numeric',*/}
      {/*    month: 'short',*/}
      {/*    day: 'numeric',*/}
      {/*  }).format()} `}*/}
      {/*  ticking*/}
      {/*/>*/}
      {/*<span className="opacity-50">|</span>*/}
      {/*<Clock format="HH:mm:ss " ticking />*/}
    </div>
    <div className=" d-sm-none   align-items-center gap-3">

      <Tooltip title={<div>
        <div>
          <div className="d-flex align-items-center gap-2">
            <span className="fs-7">ساعت ورود  </span>
            {
              attendance?.type ?<>
              <span className="text-success fw-bold fs-4">{attendance?.time_in}</span>

              {attendance?.type === 'finger' ? <IoFingerPrint size={22} /> : <LuScanFace size={22} />}

            </> :
                <span className="fw-bold text-danger ">ثبت نشده</span>}

          </div>
        </div>
        {/*<div>*/}
        {/*  <Clock*/}
        {/*    format={`${new Intl.DateTimeFormat('fa-IR', {*/}
        {/*      year: 'numeric', month: 'short', day: 'numeric',*/}
        {/*    }).format()} `}*/}
        {/*    ticking*/}
        {/*  />*/}


        {/*</div>*/}
      </div>}>
        {/*<LuClock size={22} />*/}
        <IoFingerPrint size={22} color="#333" />
      </Tooltip>

    </div>
  </Link>

  </div>);
};

export default ClockBox;
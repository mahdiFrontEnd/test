import { useDispatch, useSelector } from 'react-redux';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
import DashboardReq from '../../api/http_request/Model/dashboard/DashboardReq';
import { whatIsStatusCode } from '../../store/loading/LoadingSlice';
import Loader from '../../layouts/loader/Loader';
import BlackBoard from '../calendar/BlackBoard';
import AnyComponent from './VoiceBox';

const { Paragraph } = Typography;
const Dashboard = () => {
    const getAgain = useSelector((state) => state.loadingReducer.getAgain);

    const [data, setData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      DashboardReq.request({
        success: async (res) => {
          setData(res.result);
        }, error502: async () => {
          navigate('/error/502');
          dispatch(whatIsStatusCode(502));
        },
      }).Dashboard();
    }, [getAgain]);


    return (<div>
<AnyComponent/>
      {/*homeDesign is bgImage class for dashboard and comment css bg */}
      {data.options ? <div className="d-md-flex gap-2  justify-content-end">
        <div className="mx-auto flex-1  ">
          <BlackBoard />


        </div>

        {(data.birthdate || data.options?.managers || data.notice || data.calendar.reply_pending.length || data.calendar.to_pending.length) ?
          <div className="leftBoxDashboard d-flex flex-column h-fit-content  flex-sm-row flex-md-column gap-2"
          >


            {data.options?.managers ? <div className="flex-1   defBorder bgColorTransparent rounded-2 p-3 ">

              <div>

                {data.options.managers.map((item, index) => (<div>
                    <h5 className="fw-bold mb-3 d-flex align-items-center gap-1 orangeText">
                      {item.title}
                    </h5>


                    {item.body.map((name) => (<div className="d-flex gap-2 justify-content-between mb-2">
                      <div className="fw-bold" style={{ fontSize: '13px' }}>{name.name}</div>
                      <div style={{ fontSize: '12px' }}>{name.time}</div>
                      <div style={{ fontSize: '12px' }}>{name.date}</div>
                    </div>))}
                    {data.options.managers[index + 1] ? <hr /> : ""}

                  </div>

                ))}


              </div>

            </div> : ""}

            {data.notice ? (<div>

              <div className="bgColorTransparent shadow border rounded-2 p-3 text-center "
                   dangerouslySetInnerHTML={{ __html: data.notice }} />

            </div> ) : ""}


            {data.birthdate ? <div className="flex-1 defBorder bgColorTransparent rounded-2 p-3">
              {data.birthdate?.length ? (<div>


                <div className="d-flex justify-content-between align-items-center mb-3 ">
                  <h4 className="mb-0 text-center lh-md flex-1">سالروز <br />تولدتان مبارک</h4>
                  <img width="80" src="/happy-birthday.png" alt="happy-birthday" />
                  {/*<LiaBirthdayCakeSolid size={150} color="#f78e20" />*/}
                </div>

                {data.birthdate.map((item) => (<div key={item.first_name + item.last_name}>
                  <p className="d-flex align-items-center gap-1">

                  <span
                    style={{ fontSize: '13px' }}>{`${item.role} گرامی ${item.gender === 1 ? 'آقای' : 'خانم'} `}</span>
                    <br />
                    <strong style={{
                      fontSize: '16px', color: '#f78e20',
                    }}>{`${item.first_name} ${item.last_name}`}</strong>
                    <br />

                  </p>
                </div>))}
                {/*<span>مبارک</span>*/}
              </div>) : ""}
            </div> : ""}

            {(data.calendar.to_pending.length || data.calendar.reply_pending.length) ? (

              <>
                {data.calendar.to_pending.length ?
                  <div className="flex-1 bgColorTransparent shadow border rounded-2 p-3  overflow-auto custom-scroll"
                       style={{ maxHeight: '212px' }}
                  >
                    <h5 className="mt-2 fw-bold mb-4 d-flex align-items-center gap-1 orangeText">
                      تسک های تقویمی ارجاع شده به شما
                    </h5>

                    {data.calendar.to_pending.map((item, index) => (
                      <div key={item.id}>


                        <Paragraph className="mb-0 fw-bold" ellipsis={{ rows: 1 }}>
                          {item.title}
                        </Paragraph>


                        <div className="d-flex justify-content-between gap-2 fs-7">


                          <span>{item.from_user.first_name} {item.from_user.last_name}</span>

                          <span>{item.year}/{item.month}/{item.day}</span>
                        </div>
                        {data.calendar.to_pending[index + 1] ? <hr /> : ''}
                      </div>


                    ))}</div> : ''}


                {data.calendar.reply_pending.length ? (


                  <div className="flex-1 bgColorTransparent shadow border rounded-2 p-3  overflow-auto custom-scroll"
                       style={{ maxHeight: '212px' }}
                  >

                    <h5 className="mt-2 fw-bold mb-4 d-flex align-items-center gap-1 orangeText">
                      گزارش های ارسال شده به شما
                    </h5>
                    {data.calendar.reply_pending.map((item, index) => (

                      <div key={item.id}>


                        <Paragraph className="mb-0 fw-bold" ellipsis={{ rows: 1 }}>
                          {item.title}
                        </Paragraph>
                        <div className="d-flex justify-content-between gap-2 fs-7">


                          <span>{item.from_user.first_name} {item.from_user.last_name}</span>

                          <span>{item.year}/{item.month}/{item.day}</span>
                        </div>
                        {data.calendar.reply_pending[index + 1] ? <hr /> : ''}
                      </div>


                    ))}</div>

                ) : ''
                }</>


            ) : ''}


          </div> : ""}
      </div> : <Loader />}


    </div>)
      ;
  }
;

export default Dashboard;

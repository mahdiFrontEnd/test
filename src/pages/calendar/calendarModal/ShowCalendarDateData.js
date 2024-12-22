import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Collapse, Tag } from 'antd';
import { FiEdit } from 'react-icons/fi';
import { BsReplyFill } from 'react-icons/bs';
import ExtraCalendar from './ExtraCalendar';
import CalendarForm from './CalendarForm';
import DeleteCalendarItem from './DeleteCalendarItem';
import { setActiveKey } from '../../../store/calendar/calendarSlice';
import ReplyBox from './ReplyBox';
import User from '../../../api/http_request/Model/User/User';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';


const ShowCalendarDateData = () => {
  const dispatch = useDispatch();

  const calendarDateData = useSelector((state) => state.calendarRedux.calendarDateData);
  const activeKey = useSelector((state) => state.calendarRedux.activeKey);
  const [showStatus, setShowStatus] = useState(true);

  const handlePanelChange = (x) => {

    setShowStatus(true);
    dispatch(setActiveKey(x));
    const item = calendarDateData[x - 1];
    if (x > 0 && !item?.seen) {


      User.request({
        success: () => {

          dispatch(getAgainHandler());

        }
      }).seenTodo({ id: item?.id, type: 'normal' });
    }
  };
  return (<div>

    <Collapse activeKey={activeKey} expandIconPosition="end" accordion onChange={handlePanelChange}>
      <Collapse.Panel showArrow={false} key="0"
                      extra={<Button style={{ transform: 'rotate(0)' }}
                                     className={`defBtn text-white ${activeKey[0] === '0' ? 'orangeBtn' : 'greenBtn'}`}>
                        {activeKey[0] === '0' ? 'بستن' : '   + ایجاد '}
                      </Button>}>

        <CalendarForm isCreate />
      </Collapse.Panel>


      {calendarDateData.map((item, index) => (
        <Collapse.Panel header={item.title} extra={<ExtraCalendar index={index} item={item} />} key={`${index + 1}`}>


          {showStatus ? <>   {item.body}
            <div className="d-md-flex justify-content-between gap-3 align-items-center mt-3">


              <div className="d-flex align-items-start gap-2">
                <div className="white-space-nowrap">{item.to_user?.length ? 'ارجاع شده به:' : 'ایجاد شده توسط:'} </div>
                <div>
                  {item.to_user?.length ? item.to_user?.map((x) => (
                    <Tag bordered={false} color={x.seen ? 'success' : 'default'}
                         className="mb-2">{x.name}</Tag>)) : item.from_name}
                </div>
              </div>

              <div className="d-flex gap-1 align-items-center justify-content-end mt-4 mt-md-0">
                <Button onClick={() => {
                  setShowStatus(!showStatus);
                }} className={`defBtn ${item.is_editable ? 'orangeBtn' : 'grayBtn'}`}>{item.is_editable ?
                  <div className="d-flex align-items-center gap-1">
                    <FiEdit size={20} />
                    <span>ویرایش </span>
                  </div> : <div className="d-flex align-items-center gap-1">
                    <BsReplyFill size={20} />
                    <span>پاسخ یا گزارش </span>
                  </div>}

                </Button>
                {item.is_editable ? <DeleteCalendarItem id={item.group_id} index={index} /> : ''}
              </div>
            </div>


            <div className="mt-4">
              {item.reply?.map((v) => (<div className="keyValue" key={item.name}>
                  <div className="key">{v.name}:</div>
                  <div className="value">{v.body}</div>
                </div>

              ))}
            </div>


          </> : <>{item.is_editable ? <CalendarForm data={item} handleCancel={() => {
            setShowStatus(true);
          }} /> : <ReplyBox setShowStatus={setShowStatus} item={item} />}</>}


        </Collapse.Panel>))}
    </Collapse>


  </div>);
};

export default ShowCalendarDateData;
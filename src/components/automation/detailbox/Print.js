import React from 'react';

import {Col, Row} from 'reactstrap';
import AttachmentsShow from './AttachmentsShow';
import CommentsDetail from './comment/Comments';
import StatusDetail from './Statuses';
import RefersDetail from "./refers/Refers";
import ConvertTimestampToDate from "../../../helper/ConvertTimestampToDate";

const Detail = ({
                    detail, data, comments, refers
                }) => {

    return (<div className="automation-detail-data print bg-white">
        <Row className="mt-5">
            <Col lg="12">
                <div
                    className="d-flex flex-column align-items-end w-50 justify-content-first"
                    style={{marginRight: 'auto'}}
                >
                    <div className="d-flex justify-content-end">
              <span>
                <h6>شماره نامه :</h6>
              </span>
                        <span style={{width: '150px', textAlign: 'left'}}>{data?.number}</span>
                    </div>
                    <div className="d-flex justify-content-end">
              <span>
                <h6>تاریخ :</h6>
              </span>
                        <span style={{width: '150px', textAlign: 'left'}}>{data?.created_at}</span>
                    </div>
                </div>
            </Col>
        </Row>
        {detail && <>
            <table className="table table-borderless">
                <tbody>
                <tr>
                    <td width="150">
                        <h6>فرستنده :</h6>
                    </td>
                    <td> {detail.created_by}</td>
                </tr>

                {(detail.subject || detail.type) && (<tr>
                    <td width="150">
                        <h6> موضوع :</h6>
                    </td>
                    <td className='d-flex align-items-center gap-2'>
                        <span>{detail.type}</span> {detail.subject && detail.type &&
                        <span>-</span>}<span>{detail.subject}</span></td>
                </tr>)}


                {detail.price && (<tr>
                    <td width="150">
                        <h6>مبلغ :</h6>
                    </td>
                    <td>
                        {Number(detail.price).toLocaleString()}
                        <span style={{marginRight: '5px'}}>ريال</span>
                    </td>
                </tr>)}
                {detail.new_price && (<tr>
                    <td width="150">
                        <h6 className='white-space-nowrap'> آخرین مبلغ ارجاع شده :</h6>
                    </td>
                    <td> {detail.new_price}</td>
                </tr>)}


                <tr>
                    {detail.start_date && <>


                        <td width="150">
                            <h6>  {detail.end_date && 'از'} تاریخ :</h6>
                        </td>
                        <td> {ConvertTimestampToDate(detail.start_date)

                        }

                        </td>
                    </>}

                    {detail.end_date && <>
                        <td width="150">
                            <h6> تا تاریخ :</h6>
                        </td>
                        <td> {ConvertTimestampToDate(detail.end_date)}

                        </td>

                    </>}


                </tr>
                <tr>
                    {detail.start_time && detail.end_time && <>


                        <td width="150">
                            <h6>از ساعت :</h6>
                        </td>
                        <td> {detail.start_time

                        }

                        </td>

                        <td width="150">
                            <h6> تا ساعت :</h6>
                        </td>
                        <td> {detail.end_time}

                        </td>

                    </>
                    }


                </tr>
                {detail.company && (<tr>
                    <td width="150">
                        <h6> شرکت :</h6>
                    </td>
                    <td> {detail.company}</td>
                </tr>)}
                {detail?.body && (<tr>
                    <td width="150">
                        <h6> متن :</h6>
                    </td>
                  <td>
                    <div dangerouslySetInnerHTML={{ __html: detail.body }} />
                    </td>
                </tr>)}
                {detail.to && <tr>
                    <td width="150">ارسال به :</td>

                    <td className="automation-status-detail">
                        {detail.to?.length > 0 ? <div className='d-flex flex-wrap gap-2  '>
                            {detail.to?.map((item, index) => (

                                <div key={item.id}>
                                    {/*eslint-disable-next-line react/no-array-index-key*/}
                                    <div key={index} className="whiteTag">{`${item?.user.first_name} ${item.user.last_name}`}</div>
                                    {detail.to[index + 1] && <span>-</span>}</div>
                            ))
                            }
                        </div> : <div>ندارد.</div>}
                    </td>
                </tr>}
                {detail.cc && <tr>
                    <td width="150">رونوشت به :</td>

                    <td className="automation-status-detail">
                        {detail.cc?.length ? <div className='d-flex flex-wrap gap-2  '>
                            {detail.cc?.map((item, index) => (

                              <div key={item.id}>
                                {/*eslint-disable-next-line react/no-array-index-key*/}
                                <div key={index}
                                     className="whiteTag">{`${item?.user.first_name} ${item.user.last_name}`}</div>
                                {detail.cc[index + 1] && <span>-</span>}</div>
                            ))
                            }
                        </div> : <div>ندارد.</div>}
                    </td>
                </tr>}


                {/* status box */}
                {detail?.statuses && detail?.statuses?.length > 0 && (<tr>
                    <td width="150">وضعیت :</td>

                    <td className="automation-status-detail">
                        {detail.statuses?.length > 0 ? (detail?.statuses?.map((item) =>
                          <div key={item.id}>
                            <StatusDetail
                              key={item.name} data={item}/>
                          </div>)) : (
                            <div className="d-flex my-3 text-primary">درحال بررسی... </div>)}
                    </td>
                </tr>)}
                {detail?.attachments && <tr>
                    <td width="150">
                        <h6 className="mb-1">فایل ضمیمه :</h6>

                    </td>
                    <td>
                        {detail?.attachments?.length > 0 ? <AttachmentsShow data={detail.attachments}/> :
                            <div>ندارد.</div>
                        }
                    </td>
                </tr>}
                </tbody>
            </table>

            {/* payments box */}
            {detail?.paid_list && detail?.paid_list?.length > 0 && (<Row className="pagebreak">
                <Col lg="12">
                    <h5 className="mb-4 d-flex align-items-center justify-content-between">پرداخت ها</h5>
                    {detail?.paid_list?.map((item) => (<CommentsDetail key={item.id} data={item}/>))}
                </Col>
            </Row>)}

        </>}

        {/* comment box */}
        {comments && comments.length > 0 && (<Row>
            <Col lg="12">
                <h5 className="mb-4 d-flex align-items-center justify-content-between">کامنت ها:</h5>
                {comments.map((item) => (<CommentsDetail key={item.id} data={item}/>))}
            </Col>
        </Row>)}


        {/*refers box */}
        {refers && refers?.length > 0 && (<Row>
            <Col lg="12">
                <h5 className="mb-4 d-flex align-items-center justify-content-between">ارجاع ها:</h5>
                {refers.map((item) => (<RefersDetail key={item.user_id}
                                                     data={item}/>))}
            </Col>
        </Row>)}
    </div>);
};

export default Detail;

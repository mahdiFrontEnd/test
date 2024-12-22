import React from 'react';
import { Tag } from 'antd';
import { useLocation } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';

const SendsList = ({ data }) => {

  const location = useLocation();
  const firstUrl = location.pathname.split('/')[2];

  return (

    <div>
      {firstUrl !== 'sent_letter' && firstUrl !== 'payment' && firstUrl !== 'request' && (<>
        <Card className=" mb-0">
          <CardBody>
            {data.to ? (

              <>

                <div className="d-flex align-items-start gap-2 pb-3">
                  <div className="white-space-nowrap"> ارسال به:</div>
                  <div>
                    {data.to?.map((item) => (

                      <Tag bordered={false} defaultColor="#999999" key={item.id}
                           color={item.seen ? 'success' : 'default'}
                           className="mb-2">{`${item?.user.first_name} ${item.user.last_name}`}</Tag>
                    ))}
                  </div>
                </div>


              </>) : ''}
            {data?.cc?.length ? (<div className="d-flex align-items-start gap-2">
              <div className="white-space-nowrap"> رونوشت به:</div>
              <div>
                {data.cc?.map((item) => (<Tag bordered={false}  key={item.id} color={item.seen ? 'success' : 'default'}
                                              className="mb-1">{`${item?.user.first_name} ${item.user.last_name}`}</Tag>))}
              </div>
            </div>) : ''}
          </CardBody>
        </Card>
      </>)}

    </div>

  );
};

export default SendsList;
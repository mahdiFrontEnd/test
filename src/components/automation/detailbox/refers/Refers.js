import React from 'react';
import { CardBody, Media } from 'reactstrap';
import { Tag } from 'antd';
import EditRefer from './EditRefer';

const RefersDetail = ({ data }) => {
  return (
    <CardBody className="mb-2"><Media className="automationCm mb-0 ">
      <Media className=" w-100  flex-column ">



          <div className="d-flex justify-content-between w-100 ">
            <div>
              {data.body && ( <div className=" p-0" dangerouslySetInnerHTML={{ __html: data.body }} />  )}
            </div>
            <EditRefer data={data} />
          </div>

        <Media className="w-100 d-flex align-items-end gap-4">
          <div className="flex-grow-1 my-2">

            {data.price && <div className="">قیمت : {Number(data.price).toLocaleString()} ریال</div>}
            <div className="d-flex flex-wrap  gap-2">
              <span>ارجاع شده از </span>
              <span> {data.created_by} </span>
              <span> به </span>
              {
                data.users.map((item) => (
                  <Tag bordered={false} style={{ color: '#999' }} key={item.user_id}>{item.name}</Tag>
                  // <divclassName='  whiteTag white-space-nowrap '>{item.name}</div>
                ))
              } </div>

          </div>
          <div className="white-space-nowrap my-2">
            <span>{data.created_at}</span>
          </div>
        </Media>
      </Media>
    </Media></CardBody>
  );
};

export default RefersDetail;

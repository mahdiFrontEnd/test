import React, { useState } from 'react';
import { Button, Modal, Timeline, Typography } from 'antd';
import { TbEye } from 'react-icons/tb';
import dayjs from 'dayjs';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import DynamicIcon from '../../../components/DynamicIcon';
import ShowDetailsOfProductRequest from './ShowDetailsOfProductRequest';


const ShowProcess = ({ data, TooltipText, title }) => {
  const [open, setOpen] = useState(false);
  const { Text } = Typography;

  const showModal = () => {

    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };


  return (<>
      <div className="text-center d-flex gap-1 d-flex justify-content-center">

        <div onClick={showModal}>
          <IconBtn TooltipText={TooltipText}
                   btnClass="blueIconBtn"
                   icon={<TbEye size={22} />} /></div>


      </div>


      <Modal
        open={open}
        width={800}
        title={title ?? TooltipText}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            انصراف
          </Button>,

        ]}
      >
        <ShowDetailsOfProductRequest data={data} />
        <div className="p-4">
          <Timeline mode="right">
            {data.list_status.map((item) => (
              <Timeline.Item

                key={item.id}
                label={<div className="me-2 mb-3">
                  {/*<div className="d-flex align-items-center gap-2 mb-1">*/}
                  {/*<Avatar*/}
                  {/*  src={item.user.image}*/}
                  {/*  alt={item.user.username}*/}
                  {/*  size="small"*/}
                  {/*  style={{ marginRight: '8px' }}*/}
                  {/*/>*/}
                  <div>
                    <div>
                      <Text>{`${item.user.first_name} ${item.user.last_name}`}</Text>
                    </div>
                    <div><Text type="secondary">
                      {dayjs(item.created_at).format('HH:mm YYYY-MM-DD')}
                    </Text>
                    </div>
                  </div>
                  {/*</div>*/}

                </div>}
                dot={<DynamicIcon color={item.status.color} iconName={item.status.icon} size={22} />}
              >


                <div className="ms-2 mb-3">
                  <div>
                    <Text strong>{item.status.persian_title}</Text>
                  </div>
                  <div>
                    <Text>{item.description}</Text>
                  </div>
                </div>


              </Timeline.Item>
            ))}
          </Timeline>
        </div>

      </Modal>
    </>
  );
};


export default ShowProcess;
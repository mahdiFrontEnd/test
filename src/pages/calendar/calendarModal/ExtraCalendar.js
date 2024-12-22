import React from 'react';
import { CiClock1 } from 'react-icons/ci';
import { BsReplyFill } from 'react-icons/bs';
import { Tooltip } from 'antd';
import { TbEye, TbEyeOff } from 'react-icons/tb';
import IconText from './IconText';


const ExtraCalendar = ({ item }) => {
  // console.log(item);

  return (
    <div>
      <div className="d-flex justify-content-end gap-3 align-items-center">

        {/*{item.seen ? <TbEye/> : <TbEyeOff/>}*/}

        {
          item.seen ?
            <Tooltip title="خوانده شده"><span className="text-success"><TbEye
              size={22} /></span></Tooltip>

            :
            <Tooltip title="خوانده نشده"><span className="text-danger"><TbEyeOff
              size={22} /></span></Tooltip>

        }


        {!item.is_editable ?
          <Tooltip title={`ارجاع شده توسط ${item.from_name}`}> <span className="mb-1 text-warning"><BsReplyFill
            size={20} /></span> </Tooltip> : ''}


        <div className="d-flex justify-content-end gap-2 align-items-center">
          <IconText icon={<CiClock1 />} text={item.time} />
        </div>

      </div>
    </div>
  );
};

export default ExtraCalendar;
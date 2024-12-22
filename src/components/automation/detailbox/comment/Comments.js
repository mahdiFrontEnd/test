import React from 'react';
import { Media } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Tooltip } from 'antd';
import { imageOnError, imageOnLoad } from '../../../../functions';
import AttachmentsShow from '../AttachmentsShow';
import EditComment from './EditComment';
import { getAgainHandler } from '../../../../store/loading/LoadingSlice';
import Automation from '../../../../api/http_request/Model/automation/Automation';

const CommentsDetail = ({ data }) => {
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleReact = (icon) => {
    Automation.request({
      beforeSend: () => {
        // setLoading(true);
      }, success: () => {
        dispatch(getAgainHandler());


      }, error: ({ response }) => {

        toast.error(response?.data?.message);


      }, final: () => {
        // setLoading(false);
      },
    }).like({ id: data.id, type: 'comment', icon });
  };


  const iconLikeBox = (item, index, x) => {
     return <div> {x.find(v => v.icon === item)?.total ?? 0}
      <span className="fs-3 cursor-pointer" onClick={() => {
        handleReact(item);
      }}> <img width={28} src={`/filelogo/${item}.png`}
               alt="emoji" /></span>
    </div>;
  };


  return (
    <Media className="automationCm  ">

      <Media className="w-100">

        <div className="text-box">
          <div className="d-flex align-items-center justify-content-between  pb-2 mb-3">
            <div className="d-flex align-items-center gap-2">
              <img
                src={data.image_of_created_by}
                alt={data.created_by}
                width="35"
                className="rounded-circle"
                onLoad={imageOnLoad}
                onError={imageOnError}
              />


              <span className="white-space-nowrap">{data.created_by}</span>


            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex justify-content-end gap-2 align-items-center">


                <EditComment data={data} />


              </div>

            </div>
          </div>


          {data.body && <div dangerouslySetInnerHTML={{ __html: data.body }} />}
          {data?.attachments?.length > 0 && <AttachmentsShow data={data.attachments} />}

          <div className="d-flex justify-content-between gap-3 align-items-center border-top pt-2 mt-3">
            <span className="fs-7">{data.created_at}</span>
            <div className="d-flex justify-content-end  gap-3">


              

              {data.like && [1, 2].map((item, index) => (
                <>


                  {data.like.find(v => v.icon === item)?.total ? <Tooltip title={<div
                    dangerouslySetInnerHTML={{ __html: data.like.find(v => v.icon === item)?.users }} />}>
                    {iconLikeBox(item, index, data.like)}
                  </Tooltip> : iconLikeBox(item, index, data.like)}


                </>


              ))}


            </div>
          </div>


        </div>

      </Media>

    </Media>
  );
};

export default CommentsDetail;




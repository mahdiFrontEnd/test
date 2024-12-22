import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoLaw } from 'react-icons/go';
import { TbEye, TbEyeOff } from 'react-icons/tb';
import { Tooltip } from 'antd';
import ComponentCard from '../../../components/ComponentCard';
import TitleBox from '../../../components/TitleBox';
import Automation from '../../../api/http_request/Model/automation/Automation';
import CreateRegulation from './CreateRegulation';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import DeleteItemRegulations from './DeleteItemRegulations';
import AttachmentsShow from '../../../components/automation/detailbox/AttachmentsShow';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import Loader from '../../../layouts/loader/Loader';
import { getHomeData } from '../../../api/http_request/Model/User/HomeRequest';


const RegulationsPage = () => {
  const getAgain = useSelector((state) => state.loadingReducer.getAgain);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {


    Automation.request({
      beforeSend: () => {
        setLoading(true);
      },
      success: async (res) => {

        setData(res?.result);
      }, final: () => {
        setLoading(false);
      },
    }).Regulations();
  }, [getAgain]);

  const handleClickLink = (id) => {

    Automation.request({
      success: async () => {
        getHomeData(dispatch);
        dispatch(getAgainHandler());
      },
    }).RegulationsSeen(id);
  };


  return (<>
    <TitleBox title="آیین نامه ها">
      <CreateRegulation />
    </TitleBox>

    <CheckPermissionPage module="regulations">
      <ComponentCard>
        {
          loading ? <Loader /> :
            <div className="row">
              {data.map((item) => (<div className="col-md-6 my-2 px-2">
                <div className="h-100 defBorder rounded-3 p-3">


                  <div className=" d-flex justify-content-between  align-items-start">
                    <div className="gap-1 d-flex justify-content-between  align-items-start">
                      <GoLaw size={28} color="gray" />
                      <h4 className=" mt-2 flex-1 text-break text-primary mb-0 fw-bold">

                        {item.title}
                      </h4>
                    </div>
                    <div className="d-flex align-items-center">
                      <DeleteItemRegulations item={item} />
                      {
                        item.seen ?
                          <Tooltip title="خوانده شده"><span className="text-success"><TbEye
                            size={32} /></span></Tooltip>

                          :
                          <Tooltip title="خوانده نشده"><span className="text-danger"><TbEyeOff
                            size={28} /></span></Tooltip>

                      }
                    </div>

                  </div>
                  <hr />
                  <div className="text-dark lh-lg" dangerouslySetInnerHTML={{ __html: item.body }} />
                  <div className="mt-4">
                    {item.attachments.length ?
                      <AttachmentsShow data={item.attachments} handleClickLink={() => handleClickLink(item.id)} /> : ''}
                  </div>
                </div>
              </div>))}
            </div>
        }


      </ComponentCard>
    </CheckPermissionPage>
  </>);
};

export default RegulationsPage;

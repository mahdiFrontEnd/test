import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import User from '../../api/http_request/Model/User/User';
import ComponentCard from '../../components/ComponentCard';
import { imageOnError, imageOnLoad } from '../../functions';
import UpdateProfileModal from './UpdateProfileModal';
import { handleProfile } from '../../store/profile/Profile';
import noImage from '../../assets/images/users/user0.PNG';
import { getLoginUser } from '../../store/apps/profile/ProfileSlice';

const Profile = () => {
  const getAgain = useSelector((state) => state.loadingReducer.getAgain);

  const dispatch = useDispatch();
  // const [data, setData] = useState({});
  useEffect(() => {
    User.request({
      beforeSend: () => {
      }, success: ({ result }) => {
        dispatch(handleProfile(result));
        dispatch(getLoginUser(result));
        Cookies.set('user', JSON.stringify(result), { expires: 700, secure: true, sameSite: 'strict' });
        // setData(result)

      }, final: () => {
      },
    }).profileGet();
  }, [dispatch, getAgain]);
  const profileData = useSelector((state) => state.ProfileRedux.profile);
  return (<>

      <ComponentCard>
        <div className="d-flex justify-content-between flex-row-reverse">
          <div>
            <img
              src={profileData.image ?? noImage}
              alt="user"
              className="main-img img-responsive img-circle"
              id="user"
              width={125}
              height={125}
              onLoad={imageOnLoad}
              onError={imageOnError}
            />
          </div>

          <div className="mt-4 d-flex flex-column gap-3">
            <div className="keyValue">
              <div className="key">نام :</div>
              <div className="value">{profileData?.first_name}</div>
            </div>
            <div className="keyValue">
              <div className="key">نام خانوادگی :</div>
              <div className="value">{profileData?.last_name}</div>
            </div>
            <div className="keyValue">
              <div className="key">تلفن همراه :</div>
              <div className="value">{profileData?.mobile}</div>
            </div>
            {/*<div className="keyValue">*/}
            {/*  <div className="key">ایمیل :</div>*/}
            {/*  <div className="value">{profileData?.email || 'ثبت نشده'}</div>*/}
            {/*</div>*/}
            <div className="keyValue">
              <div className="key">نام کاربری :</div>
              <div className="value">{profileData?.username}</div>
            </div>
            <div className="keyValue ">
              <div className="key">سمت :</div>
              <div className="value orangeText"><span className="orangeText">{profileData?.chart?.role} از گروه {profileData?.chart?.group}</span></div>
            </div>
            <div className="keyValue">
              <div className="key">مدیر :</div>
              <div
                className="value "><span className="orangeText"> {profileData?.chart?.parent?.first_name} {profileData?.chart?.parent?.last_name}</span></div>
            </div>
            <div className="keyValue">
              <div className="key">کد پرسنلی :</div>
              <div
                className="value "><span className="orangeText"> {profileData?.person_id} </span></div>
            </div>
          </div>

        </div>
        <div className="d-flex justify-content-end gap-2">
          <UpdateProfileModal data={profileData} />

        </div>

      </ComponentCard>
      {/*<ComponentCard>*/}
      {/*  <div className="keyValue mb-3">*/}
      {/*    <div className="key">سمت :</div>*/}
      {/*    <div className="value">{profileData?.chart?.role} از گروه {profileData?.chart?.group}</div>*/}
      {/*  </div>*/}
      {/*  <div className="keyValue">*/}
      {/*    <div className="key">مدیر :</div>*/}
      {/*    <div className="value">{profileData?.chart?.parent?.first_name} {profileData?.chart?.parent?.last_name}</div>*/}
      {/*  </div>*/}
      {/*</ComponentCard>*/}

    </>

  );
};

export default Profile;

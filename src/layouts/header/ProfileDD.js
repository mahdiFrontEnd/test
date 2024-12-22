import React from 'react';

import { Link } from 'react-router-dom';
import { DropdownItem } from 'reactstrap';
import { Lock, User } from 'react-feather';
import { LuClipboardList } from 'react-icons/lu';
import BrokenImage from '../../assets/images/users/user0.PNG';
import { imageOnError, imageOnLoad } from '../../functions';

const ProfileDD = ({ user }) => {
  return (

    <>
      <DropdownItem className=" px-0 text-dark">
        <Link to="/profile" className="active-text-white text-dark text-decoration-none">
          <div className="d-flex gap-3   px-2 align-items-center">
            <img
              src={user?.image || BrokenImage}
              alt="user"
              className="main-img img-responsive img-circle"
              id="imagePreview"
              width={40}
              height={40}
              onLoad={imageOnLoad}
              onError={imageOnError}
            />
            <span>
          <h5 className="mb-2">
            <span>{user?.first_name} </span>
            <span>{user?.last_name} </span>
          </h5>
          <small className="fs-6 text-muted">نام کاربری: {user?.username}</small>
        </span>
          </div>
        </Link>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem className=" px-0 text-dark"> <Link to="/profile"
                                                       className="active-text-white text-dark text-decoration-none">
        <div className="d-flex px-2 align-items-center gap-3">

          <span className="px-2   ms-1"><User size={20} /></span>
          <span> پروفایل من</span>
        </div>
      </Link>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem className=" px-0">
        <Link to="/WorkDetails">
          <div className="d-flex px-2 align-items-center gap-3" style={{ color: 'rgb(95, 95, 95)' }}>
            <span className="px-2   ms-1"><LuClipboardList size={20} /></span>
            <div className="">جزئیات کاری</div>
          </div>
        </Link>
      </DropdownItem>
      <DropdownItem divider />
      <Link to="/profile/ChangePwd"><DropdownItem className=" px-0">

          <div className="d-flex px-2 align-items-center gap-3" style={{ color: 'rgb(95, 95, 95)' }}>
            <span className="px-2   ms-1"><Lock size={20} /></span>
            <div className="">تغییر رمز عبور</div>
          </div>

      </DropdownItem></Link>
    </>

  );
};

export default ProfileDD;

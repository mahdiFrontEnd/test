import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


import { Button, DropdownMenu, DropdownToggle, Navbar, UncontrolledDropdown } from 'reactstrap';
import { RiMenu4Line } from 'react-icons/ri';
import { MdOutlineEditCalendar } from 'react-icons/md';
import { Badge, ConfigProvider } from 'antd';
import Logo from '../logo/Logo';
import { ToggleShowSidebar } from '../../store/customizer/CustomizerSlice';
import ProfileDD from './ProfileDD';
import { imageOnError, imageOnLoad } from '../../functions';
import BrokenImage from '../../assets/images/users/user0.PNG';
import { deleteAllCookies } from '../../helper/deleteAllCookies';
import Auth from '../../api/http_request/Model/auth/Auth';
import ParentDropDown from './ParentDropDown';
import ClockBox from './ClockBox';

const Header = () => {
  const showSidebar = useSelector((state) => state.customizer.showSidebar);
  const notifCount = useSelector((state) => state.loadingReducer.notifCount);

  const loginUser = useSelector((state) => state.profilesReducer.loginUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    Auth.request({
      beforeSend: () => {
        deleteAllCookies();
        navigate('/login');
      },
    }).logout();
  };
  return (<div className="fixedTopbar p-2">
    <Navbar

      expand="lg"
      className="topbar rounded-2 defBorder"
    >

      <div className="d-flex me-auto align-items-center">

        <Link to="/">
          <Logo />
        </Link>


        <Button

          className="d-lg-none mx-1 bg-transparent border-0"
          onClick={() => dispatch(ToggleShowSidebar(!showSidebar))}
        >
          <RiMenu4Line size={25} color="#333" />


        </Button>
      </div>

      <div className="text-gray d-flex align-items-center gap-4">


        <ClockBox />
        <Link to="/BlackBoard"> <ConfigProvider
          direction="ltr"
        >
          <Badge color="orange" count={notifCount?.calendar_count}><MdOutlineEditCalendar size={24} /></Badge>
        </ConfigProvider>
        </Link>

        <ParentDropDown />


        {/**********WorkDetails DD**********/}
        <UncontrolledDropdown>
          <DropdownToggle className="p-1" color="transparent">
            <img
              alt="user"
              className="main-img img-responsive img-circle"
              id="user"
              src={loginUser?.image || BrokenImage}
              width={30}
              height={30}
              onLoad={imageOnLoad}
              onError={imageOnError}
            />
          </DropdownToggle>
          <DropdownMenu className="ddWidth profile-dd text-start bg-white defBorder">
            <ProfileDD user={loginUser} />
            <div className="p-2 px-3">
              <Button
                onClick={() => {
                  handleLogout();
                }}
                className="bg-danger border-0"
                size="sm"
                block
              >
                خروج
              </Button>
            </div>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </Navbar>
  </div>);
};

export default Header;

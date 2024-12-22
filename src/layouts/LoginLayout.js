import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Card, CardBody } from 'reactstrap';

import LogoWhite from '../assets/images/logos/hasel-novin (1).svg';

const LoginLayout = () => {
  const navigate = useNavigate();
  const token = Cookies.get('token');
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, []);
  return (<div className="d-flex align-items-center justify-content-center">
    <div className="loginBox"></div>
    <Card className="shadow-none p-2" style={{
      position: 'absolute',
      top: ' 45%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '450px',
      width: '93%',
      // backgroundColor: 'transparent',
    }}>
      <CardBody className="px-2 p-md-5 py-5 rounded-2 border-1 ">
        <div className="d-flex justify-content-center mb-5">
          <img src={LogoWhite} alt="logoWhite" width={220} />
        </div>
        <Outlet />
      </CardBody>
    </Card>
  </div>);
};

export default LoginLayout;

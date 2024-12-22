import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'reactstrap';
import { FaArrowRight } from 'react-icons/fa6';
import {
  setDisplayResetPassword,
  setDisplaySendOTP,
  setDisplayVerifyOTP,
  useForgetPassDispatch,
} from '../../context/ForgetPassContext';

const ReturnBtn = () => {
  const navigate = useNavigate();

  const forgetPassDispatch = useForgetPassDispatch();
  const goBack = () => {
    navigate(-1);
    setDisplaySendOTP(forgetPassDispatch, true);
    setDisplayVerifyOTP(forgetPassDispatch, false);
    setDisplayResetPassword(forgetPassDispatch, false);
  };
  return (
    <Button size="sm" className="btn " color="gray" type="button" onClick={goBack}>
        <span className="d-flex gap-1 align-items-center">

          <FaArrowRight size={22} />

            <span>بازگشت</span>



        </span>
    </Button>
  );
};

export default ReturnBtn;
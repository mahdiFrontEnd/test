import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import OtpInput from 'react-otp-input';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa6';
import Auth from '../../api/http_request/Model/auth/Auth';
import { getLoginUser } from '../../store/apps/profile/ProfileSlice';
import { convertPersianNumberToEng } from '../../helper/convertPersianNumberToEng';

const OtpBox = ({ userData, handleReturn }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');


  const onSubmit = () => {
    const fildes = {
      username: userData.username,
      code: otp,
    };

    setLoading(true);

    Auth.request({
      error: (error) => {
        if (error?.result?.message_code === 301) {
          handleReturn()
        }
        toast.error(error.message);
      }, unAuth: (data) => {
        toast.error(data.data.message);


      }, success: async (data) => {

        await Cookies.set('user', JSON.stringify(data.result.user), {
          expires: 700,
          // secure: true, sameSite: 'strict'
        });
        await Cookies.set('token', data.result.token, {
          expires: 700,
          // secure: true, sameSite: 'strict',
        });

        localStorage.setItem('permissions', JSON.stringify(data.result.permissions));


        await Cookies.set('unseen', data.result.unseen, {
          expires: 700,
          // secure: true, sameSite: 'strict'
        });

        window.location.href = `/home`;
        dispatch(getLoginUser(data.result.user));

      }, final: () => {
        setLoading(false);

      },
    }).login(fildes);


  };

  useEffect(() => {
    if (otp.length === 5) {
      onSubmit();
    }
  }, [otp]);
  return (
    <div className="d-flex flex-column align-items-center ">
      <div className="d-flex mb-5 w-100 justify-content-between  align-items-center ">
        <h3 className="fw-bold mb-0">رمز یکبار مصرف</h3>

        <Button size="sm" className="btn " color="gray" type="button" onClick={handleReturn}>


        <span className="d-flex gap-1  align-items-center">
           <FaArrowRight size={22}/>
          <span>بازگشت</span>
        </span>
        </Button>
      </div>

      <h5 style={{ fontSize: '13px' }} className="mb-3">لطفا رمز یکبار مصرف ارسال شده را وارد
        کنید.</h5>
      <div dir="ltr" className="mb-4">
        <OtpInput inputType="tel" shouldAutoFocus name="code" inputStyle={{ borderRadius: '5px', border: '1px solid #dee2e6', width: '40px', height: '40px' }}

                  value={otp}
                  onChange={(e) => {setOtp(convertPersianNumberToEng(e));}}
                  onKeyDown={setOtp}
                  numInputs={5}
                  renderSeparator={<span className="mx-1">-</span>}
                  renderInput={(props) => <input  {...props} />}
        />
      </div>
      <Button onClick={onSubmit}
              disabled={loading}
              type="submit"
              className="w-100 mt-3 me-2 btn btn-primary">
        ورود
      </Button>
    </div>
  )
    ;
};

export default OtpBox;
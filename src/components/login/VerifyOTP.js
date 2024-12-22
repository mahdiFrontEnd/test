import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { Button, FormGroup, Label } from 'reactstrap';

import {
  setDisplayResetPassword,
  setDisplayVerifyOTP,
  useForgetPassDispatch,
  useForgetPassState,
} from '../../context/ForgetPassContext';
import Timer from '../timer/Timer';
import { whatIsStatusCode } from '../../store/loading/LoadingSlice';
import ReturnBtn from './ReturnBtn';
import Auth from '../../api/http_request/Model/auth/Auth';
import ReCaptchaComponent from './ReCAPTCHAComponent';

const VerifyOTP = ({ setCode }) => {
  const dispatch = useDispatch();
  const forgetPassDispatch = useForgetPassDispatch();
  const { saveMobileNum } = useForgetPassState();
  const [showComponent, setShowComponent] = useState(true);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [validReCAPTCHA, setValidReCAPTCHA] = useState({});
  const [reset, setReset] = useState(false);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 120); // 120 => 2 minutes timer

  useEffect(() => {
    if (showComponent) {
      const toRef = setTimeout(() => {
        setShowComponent(false);
          setDisabledBtn(false);
        clearTimeout(toRef);
      }, 120000);
    }
  }, [showComponent]);

  const ResendOTP = () => {
    setDisabledBtn(true);
    setErrorText('');
    dispatch(whatIsStatusCode(''));

    const user = {
      mobile: saveMobileNum,
    };

    Auth.request({
      success: () => {
        setShowComponent(true);
      },
      error: ({ error }) => {
        setErrorText(error.data.message);
      },
    }).sendOtp(user);

    // sendOTP(user, (isOk, data) => {
    //   if (isOk && data.success) {
    //     setShowComponent(true);
    //   } else if (isOk && !data.success) {
    //     setErrorText(data.message);
    //     // setErrorText(data.data.message);
    //   } else {
    //     // setErrorText(data);
    //     setErrorText(data.data.message);
    //     dispatch(whatIsStatusCode(data.status));
    //   }
    //   setDisabledBtn(false);
    // });
  };

  const initialValues = {
    code: '',
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().required('پر کنید'),
  });

  const onSubmit = (fields) => {
    if (validReCAPTCHA.captcha) {

    setDisabledBtn(true);
    setErrorText('');
    dispatch(whatIsStatusCode(''));

    const user = {
      mobile: saveMobileNum,
      code: fields.code,
      captcha : validReCAPTCHA.captcha,
      token : validReCAPTCHA.token,
    };
    setCode(fields.code);

    Auth.request({
      success: () => {
        setDisplayVerifyOTP(forgetPassDispatch, false);
        setDisplayResetPassword(forgetPassDispatch, true);
      },
      error: (error) => {
        setReset(!reset)
        setErrorText(error.data.message);
        dispatch(whatIsStatusCode(error.status));
      },
      final: () => {
        setDisabledBtn(false);
      },
    }).verifyOTP(user);

   }
  };

  return (
    <div className="loginForm">
      <h2 className="mb-2 mt-2 fw-bold text-center"> تایید کد پیامکی </h2>

      <small className="small-descrition pb-4 d-block text-center">
        لطفا کدی که به شماره تلفن همراه شما پیامک شده را وارد کنید.
      </small>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form>
            <FormGroup>
              <div className="  mb-2 d-flex justify-content-between align-items-end">
                <Label htmlFor="code" className="mb-0">
                  کد ارسالی
                </Label>
                <ReturnBtn />
              </div>

              <Field
                name="code"
                type="text"
                className={`form-control text-center ${
                  (errors.code && touched.code) || errorText ? ' is-invalid' : ''
                }`}
              />
              <ErrorMessage name="code" component="div" className="invalid-feedback" />
              <div className="invalid-feedback">{errorText}</div>
            </FormGroup>
            <ReCaptchaComponent

              setValidReCAPTCHA={setValidReCAPTCHA} reset={reset}
            />
            {showComponent ? (
              <FormGroup>
                <div className="d-flex align-items-center gap-2">
                  ارسال مجدد <Timer expiryTimestamp={time} />
                </div>
                <Button
                  type="submit"
                  color="primary"
                  className="w-100 mt-3 me-2"
                  disabled={disabledBtn}
                >
                  ثبت
                </Button>
              </FormGroup>
            ) : (
              <Button
                disabled={disabledBtn}
                color="primary"
                className="w-100 mt-3 me-2"
                onClick={ResendOTP}
              >
                ارسال دوباره کد
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VerifyOTP;

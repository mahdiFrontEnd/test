import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { Button, FormGroup, Label } from 'reactstrap';
import {
  setDisplaySendOTP,
  setDisplayVerifyOTP,
  setSaveMobileNum,
  useForgetPassDispatch,
} from '../../context/ForgetPassContext';
import { whatIsStatusCode } from '../../store/loading/LoadingSlice';
import ReturnBtn from './ReturnBtn';
import ReCaptchaComponent from './ReCAPTCHAComponent';
import Auth from '../../api/http_request/Model/auth/Auth';

const SendOTP = () => {
  const dispatch = useDispatch();
  const forgetPassDispatch = useForgetPassDispatch();
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [validReCAPTCHA, setValidReCAPTCHA] = useState({});
  const [reset, setReset] = useState(false);

  const initialValues = {
    mobile: '',
  };

  const validationSchema = Yup.object().shape({
    mobile: Yup.string()
      .matches(
        /^(0|\+98)?([ ]|-|[()]){0,2}9[0|1|2|3|4|]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}?$/,
        'شماره تلفن صحیح نیست',
      )
      .required('لطفا شماره تلفن را وارد کنید.'),
  });

  const onSubmit = (fields) => {
    if (validReCAPTCHA) {
      // fields.captcha = validReCAPTCHA;
      fields = { ...fields, ...validReCAPTCHA };

      setDisabledBtn(true);
      setErrorText('');
      dispatch(whatIsStatusCode(''));
      // const user = JSON.stringify(fields, null, 4);


      Auth.request({
        success: () => {

          setSaveMobileNum(forgetPassDispatch, fields.mobile);
          setDisplaySendOTP(forgetPassDispatch, false);
          setDisplayVerifyOTP(forgetPassDispatch, true);
        },
        error: (error) => {
          setReset(!reset);
          // setErrorText(data);
          setErrorText(error.message);
        },
      }).sendOtp(fields);


      // sendOTP(user, (isOk, data) => {
      //     if (isOk && data.success) {
      //         setSaveMobileNum(forgetPassDispatch, fields.mobile);
      //         setDisplaySendOTP(forgetPassDispatch, false);
      //         setDisplayVerifyOTP(forgetPassDispatch, true);
      //     } else if (isOk && !data.success) {
      //         setReset(!reset)
      //         setErrorText(data.message);
      //         // setErrorText(data.data.message);
      //     } else {
      //         setReset(!reset)
      //         // setErrorText(data);
      //         setErrorText(data.data.message);
      //         dispatch(whatIsStatusCode(data.status));
      //     }
      //     setDisabledBtn(false);
      // });
    }
  };

  return (
    <div className="loginForm">

      <h2 className="mb-2 mt-2 fw-bold text-center"> ارسال شماره تلفن </h2>

      <small className="small-descrition pb-4 d-block text-center">
        لطفا شماره تلفن همراه خودرا وارد کنید !
      </small>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form>
            <FormGroup>


              <div className="  mb-2 d-flex justify-content-between align-items-end">

                <Label htmlFor="mobile" className="mb-0">شماره تلفن</Label>
                <ReturnBtn />
              </div>


              <Field
                name="mobile"
                type="phone"
                className={`form-control text-center  ${
                  (errors.mobile && touched.mobile) || errorText ? ' is-invalid' : ''
                }`}
              />
              <ErrorMessage name="mobile" component="div" className="invalid-feedback" />
              <div className="invalid-feedback">{errorText}</div>
            </FormGroup>
            <div className="d-flex justify-content-center">
              <ReCaptchaComponent

                setValidReCAPTCHA={setValidReCAPTCHA} reset={reset}
              /></div>
            <FormGroup>
              <Button
                disabled={disabledBtn
                  || !validReCAPTCHA
                }
                type="submit"
                color="primary"
                className="w-100 mt-3 me-2"
              >
                مرحله بعدی
              </Button>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SendOTP;

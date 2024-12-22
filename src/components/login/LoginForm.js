import React, { useEffect, useRef, useState } from 'react';

import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { Button, FormGroup, Label } from 'reactstrap';
import { toast } from 'react-toastify';


import { TbEye, TbEyeOff } from 'react-icons/tb';
import ReCaptchaComponent from './ReCAPTCHAComponent';
import Auth from '../../api/http_request/Model/auth/Auth';
import OtpBox from './OtpBox';

const LoginForm = () => {
  const [showStatus, setShowStatus] = useState(true);

  const [reset, setReset] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [validReCAPTCHA, setValidReCAPTCHA] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const initialValues = {
    username: '', password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('لطفا پر کنید'),
    password: Yup.string().min(6, 'رمزعبور شماباید بیش از 6 کاراکتر باشد').required('لطفا پر کنید'),
  });


  const ref = useRef(null);

  useEffect(() => {
    const { current } = ref;
    const { values } = current;
    if (validReCAPTCHA?.captcha?.length === 4 && values.username && values.password) {
      current.handleSubmit();
    }
  }, [validReCAPTCHA]);
  const onSubmit = (fildes) => {
    if (validReCAPTCHA.captcha) {

      fildes = { ...fildes, ...validReCAPTCHA };

      setLoading(true);
      setErrorText('');

      Auth.request({
        error: (error) => {

          setReset(!reset);
          toast.error(error?.message);

        }, unAuth: (data) => {

          toast.error(data.data.message);
          setReset(!reset);

        }, success: async () => {

          setShowStatus(false);

        }, final: () => {
          setLoading(false);

        },
      }).preLogin(fildes);
    }
  };
  const handleReturn = () => {
    setShowStatus(true);
    setReset(!reset);
  };


  return (<div className="loginForm">
    {
      showStatus
        ? <Formik innerRef={ref} initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ errors, touched }) => (<Form>
            <FormGroup>
              <Label htmlFor="username">نام کاربری</Label>
              <Field
                name="username"
                type="text"
                className={`form-control text-center ${(errors.username && touched.username) || errorText ? ' is-invalid' : ''}`}
              />

            </FormGroup>
            <FormGroup className="position-relative">
              <Label htmlFor="password">رمز عبور</Label>
              <Field
                name="password"
                type={showPass ? 'text' : 'password'}
                className={`form-control text-center ltr ${(errors.password && touched.password) || errorText ? ' is-invalid' : ''}`}
              />
              <Button
                color="none"
                className="defaultBtn passIcon"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <TbEye size={20} /> :
                  <TbEyeOff size={20} />}
              </Button>

            </FormGroup>
            <div className="d-flex justify-content-center my-4">
              <ReCaptchaComponent
                reset={reset}
                setValidReCAPTCHA={setValidReCAPTCHA}
              />
            </div>

            <Button
              disabled={loading || !validReCAPTCHA.captcha}
              type="submit" color="primary"
              className="w-100  me-2">
              ارسال رمز یکبار مصرف
            </Button>
          </Form>)}
        </Formik>
        :
        <OtpBox userData={ref.current.values} handleReturn={handleReturn} />
    }

  </div>);
};

export default LoginForm;

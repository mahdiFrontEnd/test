import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody } from 'reactstrap';
import { toast } from 'react-toastify';
import { Form, Input } from 'antd';
// import ReturnBtn from './ReturnBtn';
import PasswordCheck from '../MicroComponents/PasswordCheck';
import { useForgetPassState } from '../../context/ForgetPassContext';
import Auth from '../../api/http_request/Model/auth/Auth';

const ResetPassword = ({ code }) => {
  const { saveMobileNum } = useForgetPassState();
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    values.code = code;
    values.mobile = saveMobileNum;
    Auth.request({
      beforeSend: () => {
        setLoading(true);
      },
      error: () => {},
      unAuth: () => {},
      success: async () => {
        navigate('/login');
        toast.success('تغییر رمز با موفقیت انجام یافت.');
      },

      final: () => {
        setLoading(false);
      },
    }).resetPass(values);
  };

  // const forgetPassDispatch = useForgetPassDispatch();
  // const {saveMobileNum} = useForgetPassState();
  // const [showPass, setShowPass] = useState(false);
  // const [errorText, setErrorText] = useState('');

  // const initialValues = {
  //     newPass: '', confNewPass: '',
  // };

  // const validationSchema = Yup.object().shape({
  //     newPass: Yup.string().min(6, 'باید بیش از 6 کاراکتر باشد').required('پر کنید'), confNewPass: Yup.string()
  //         .oneOf([Yup.ref('newPass'), null], 'صحیح نمی باشد')
  //         .required('پر کنید'),
  // });

  // const onSubmit = (fields) => {
  //     setLoader(forgetPassDispatch, true);
  //     setErrorText('');
  //     dispatch(whatIsStatusCode(''));
  //
  //     const user = {
  //         mobile: saveMobileNum, password: fields.newPass, password_confirmation: fields.confNewPass, code,
  //     };
  //
  //
  //     Auth.request({
  //         success: () => {
  //             setDisplayResetPassword(forgetPassDispatch, false);
  //             navigate('/login');
  //             setLoader(forgetPassDispatch, false);
  //         }, error: ({error}) => {
  //             dispatch(whatIsStatusCode(error.status));
  //             setErrorText(error.data.message);
  //             setLoader(forgetPassDispatch, false);
  //         }
  //     }).resetPass(user)
  //
  //
  //     // resetPass(JSON.stringify(user, null, 4), (isOk, data) => {
  //     //   if (isOk && data.success) {
  //     //     setDisplayResetPassword(forgetPassDispatch, false);
  //     //     navigate('/login');
  //     //   } else if (isOk && !data.success) {
  //     //     setErrorText(data.message);
  //     //     // setErrorText(data.data.message);
  //     //   } else {
  //     //     // setErrorText(data);
  //     //     setErrorText(data.data.message);
  //     //     dispatch(whatIsStatusCode(data.status));
  //     //   }
  //     //   setLoader(forgetPassDispatch, false);
  //     // });
  // };

  return (
    <div className="loginForm">
      <h2 className="mb-2 mt-2 fw-bold text-center"> رمز عبور جدید</h2>

      <small className="small-descrition pb-4 d-block text-center">
        لطفا رمز عبور جدیدی برای خود ایجاد کنید !
      </small>
      <Card className="w-100">
        <CardBody>
          <Form
            form={form}
            rootClassName="w-100"
            name="dependencies"
            autoComplete="off"
            onFinish={onFinish}
            layout="vertical"
          >
            {/*<ReturnBtn />*/}
            <Form.Item label="رمز عبور" name="password">
              <Input.Password className="text-center ltr" onChange={(e) => setPassword(e.target.value)} value={password} />
            </Form.Item>
            <Form.Item label="تکرار رمز عبور" name="password_confirmation">
              <Input.Password className="text-center ltr" onChange={(e) => setPassword2(e.target.value)} value={password2} />
            </Form.Item>

            <PasswordCheck
              setDisabled={setDisabled}
              password={password}
              password2={password2}
              value={password}
              valueAgain={password2}
            />
            <Form.Item>
              <div className="d-flex justify-content-end gap-2">
                <Link to="/profile" className="defBtn yellowBtn">
                  بازگشت
                </Link>

                <Button
                  loading={loading}
                  disabled={disabled}
                  className="defBtn greenBtn"
                  htmlType="submit"
                >
                  ثبت تغییرات
                </Button>
              </div>
            </Form.Item>
          </Form>{' '}
        </CardBody>
      </Card>

      {/*<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>*/}
      {/*    {({errors, touched}) => (<FormikForm>*/}
      {/*        <FormGroup className="position-relative">*/}

      {/*            <div className='  mb-2 d-flex justify-content-between align-items-end'>*/}

      {/*                <Label htmlFor="newPass" className='mb-0'>رمز عبور جدید</Label>*/}
      {/*                <ReturnBtn/>*/}
      {/*            </div>*/}
      {/*            <Field*/}
      {/*                name="newPass"*/}
      {/*                type={showPass ? 'text' : 'password'}*/}
      {/*                className={`form-control${errors.newPass && touched.newPass ? ' is-invalid' : ''}`}*/}
      {/*            />*/}
      {/*            <ErrorMessage name="newPass" component="div" className="invalid-feedback"/>*/}
      {/*            <Button*/}
      {/*                color="none"*/}
      {/*                className="defaultBtn passIcon"*/}
      {/*                onClick={() => setShowPass(!showPass)}*/}
      {/*            >*/}
      {/*                {showPass ? (<i className="bi bi-eye-slash-fill"></i>) : (*/}
      {/*                    <i className="bi bi-eye-fill"></i>)}*/}
      {/*            </Button>*/}
      {/*        </FormGroup>*/}
      {/*        <FormGroup>*/}
      {/*            <Label htmlFor="confNewPass">تکرار رمز عبور جدید</Label>*/}
      {/*            <Field*/}
      {/*                name="confNewPass"*/}
      {/*                type={showPass ? 'text' : 'password'}*/}
      {/*                className={`form-control${(errors.confNewPass && touched.confNewPass) || errorText ? ' is-invalid' : ''}`}*/}
      {/*            />*/}

      {/*            <ErrorMessage name="confNewPass" component="div" className="invalid-feedback"/>*/}
      {/*            <div className="invalid-feedback">{errorText}</div>*/}
      {/*        </FormGroup>*/}

      {/*        <FormGroup>*/}
      {/*            <Button type="submit" color="primary" className="w-100 mt-3 me-2">*/}
      {/*                ثبت و ورود مجدد*/}
      {/*            </Button>*/}
      {/*        </FormGroup>*/}
      {/*    </FormikForm>)}*/}
      {/*</Formik>*/}
    </div>
  );
};

export default ResetPassword;

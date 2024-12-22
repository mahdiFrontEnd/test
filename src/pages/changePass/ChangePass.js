import React, {useState} from 'react';
import {Button, Form, Input} from 'antd';
import {Card, CardBody,} from "reactstrap";
import {toast} from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import User from "../../api/http_request/Model/User/User";
import PasswordCheck from "../../components/MicroComponents/PasswordCheck";
import Auth from '../../api/http_request/Model/auth/Auth';
import { deleteAllCookies } from '../../helper/deleteAllCookies';


const ChangePass = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();

    const onFinish = (values) => {
        User.request({
            beforeSend: () => {
                setLoading(true)
            }, error: () => {
            }, success: async () => {
                toast.success('تغییر رمز با موفقیت انجام یافت.');
                Auth.request({
                    beforeSend: () => {

                    }, error: () => {
                    }, success: async () => {
                        deleteAllCookies()
                        navigate('/login')
                        // window.location.reload();

                    }, failed: () => {
                    }, final: () => {
                    }
                }).logout()
            }, final: () => {
                setLoading(false)
            }
        }).changePassword(values)


    };

    return (
        <Card className='w-100'><CardBody>
            <Form
                form={form} rootClassName='w-100'
                name="dependencies"
                autoComplete="off"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item label="رمز عبور" name="password">
                    <Input.Password className="text-center ltr" onChange={(e) => setPassword(e.target.value)} value={password}/>
                </Form.Item>
                <Form.Item label="تکرار رمز عبور" name="password_confirmation">
                    <Input.Password className="text-center ltr" onChange={(e) => setPassword2(e.target.value)} value={password2}/>
                </Form.Item>

                <PasswordCheck setDisabled={setDisabled} password={password} password2={password2}

                               value={password}
                               valueAgain={password2}

                />
                <Form.Item>
                    <div className="d-flex justify-content-end gap-2 align-items-center">
                        <Link to='/profile' className='defBtn yellowBtn d-flex align-items-center'>بازگشت</Link>

                        <Button loading={loading} disabled={disabled} className='defBtn orangeBtn' htmlType='submit'>ثبت
                            تغییرات</Button>
                    </div>
                </Form.Item>


            </Form> </CardBody></Card>

    );
};

export default ChangePass;
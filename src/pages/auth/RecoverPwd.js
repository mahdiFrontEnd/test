import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useForgetPassState,} from '../../context/ForgetPassContext';
import ResetPassword from '../../components/login/ResetPassword';
import SendOTP from '../../components/login/SendOTP';
import VerifyOTP from '../../components/login/VerifyOTP';
import Loader from '../../layouts/loader/Loader';

const RecoverPwd = () => {
    const navigate = useNavigate();
    const {displaySendOTP, displayVerifyOTP, displayResetPassword, loader} = useForgetPassState();
    const [code, setCode] = useState();

    const statusCode = useSelector((state) => state.loadingReducer.statusCode);


    useEffect(() => {
        if (statusCode === 500) {
            navigate('/login');
        }
    }, [statusCode]);

    return (
        <>

            {loader ? (
                <Loader/>
            ) : (
                (displaySendOTP && <SendOTP/>) ||
                (displayVerifyOTP && <VerifyOTP setCode={setCode}/>) ||
                (displayResetPassword && <ResetPassword code={code}/>)
            )}
        </>
    );
};

export default RecoverPwd;

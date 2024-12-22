import React, {useEffect, useState} from 'react';

import {useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import Detail from '../../components/commerce/detailBox/Detail';
import {getDataDetail} from '../../store/commerce/purchase/PurchaseSlice';
 import Commerce from "../../api/http_request/Model/commerce/Commerce";

const PurchaseDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const idUrl = location.pathname.split('/')[3];

    const [statusList, setStatusList] = useState([]);
    const [certificationList, setCertificationList] = useState([]);
    const [isAddLoading, setIsAddLoading] = useState(false);
    const getAgain = useSelector((state) => state.loadingReducer.getAgain);

    useEffect(() => {
        setIsAddLoading(true);


        Commerce.request({
            success: (data) => {

                dispatch(getDataDetail(data.result));
                setStatusList(data.result.last_statuses);
                setCertificationList(data.result.certifications);
            },
            error: () => {
                navigate('/commerce/purchase');
                toast.error('دسترسی ندارید');
            },
            final: () => {
                setIsAddLoading(false);
            }
        }).purchaseDetail(idUrl)

    }, [idUrl,getAgain]);

    return (
        <Detail
            isAddLoading={isAddLoading}
            statusList={statusList}
            setStatusList={setStatusList}
            certificationList={certificationList}
            setCertificationList={setCertificationList}
        />
    );
};

export default PurchaseDetail;

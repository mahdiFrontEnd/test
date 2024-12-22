import React, {useState} from 'react';
import {Button, Modal, Radio} from "antd";
import { useDispatch, useSelector } from 'react-redux';
import {toast} from "react-toastify";
import { BsClipboard2CheckFill } from 'react-icons/bs';
import {hasPermission} from '../../../permission/module';
import Automation from "../../../api/http_request/Model/automation/Automation";
import {getAgainHandler} from "../../../store/loading/LoadingSlice";

const StatusBox = ({  rowData,  inDetail}) => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);


    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleStatus = () => {
        setLoading(true);
        Automation.request({
            success: (res) => {
                handleCancel()
                dispatch(getAgainHandler());
                toast.success(res.message);
            },
            final: () => {
                setLoading(false);
            }
        }).statusApi(`automation_${automationAddress}`, rowData.id, status)
    };
    const buttonColor = (title) => {
        if (title === 'تایید') return 'greenBtn';
        if (title === 'رد') return 'redBtn';
        return 'orangeBtn';
    };
    return (


        <>
            {
                hasPermission(`automation_${automationAddress}`, ["reject", "approve"]) &&
                !['automation_correspondence', 'automation_received_letter', 'automation_report'].includes(`automation_${automationAddress}`) &&
                <div onClick={showModal} className='flex-1'>
                    {
                        inDetail ?
                            <Button className={`defBtn w-100 h-32  ${buttonColor(rowData?.status_title)} `}
                                    onClick={showModal}>
                                {rowData?.status_title}
                            </Button>
                            :
                            <div>
                                <div className='d-none d-md-block '>
                                    <Button className={`defBtn  min-w-100 ${buttonColor(rowData?.status_title)} `}
                                            onClick={showModal}>
                                        {rowData?.status_title}
                                    </Button>
                                </div>
                                <div className='d-md-none' style={{width: '160px'}}>
                                    <Button className='text-black d-flex align-items-center gap-2 px-0' type="link">

                                        {/*<i className='bi bi-clipboard-check-fill fs-4  '></i>*/}

                                        <span className="orangeText">
                                            <BsClipboard2CheckFill size={22} />
                                        </span>

                                        <span>وضعیت</span></Button>
                                </div>
                            </div>
                    }

                </div>


            }


            <Modal
                open={open}
                title="وضعیت"
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        انصراف
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleStatus}>
                        ثبت
                    </Button>,

                ]}
            >
                {/*{rowData?.total_estimate_time && <p>*/}
                {/*    <span> میزان {rowData?.subject} {rowData?.created_by} </span>:<span>{rowData?.total_estimate_time}</span>*/}
                {/*</p>}*/}

                <div className="my-4">

                    <Radio.Group defaultValue="a" size="large" onChange={(e) => setStatus(e.target.value)}>
                        <Radio.Button value="approve"> تایید میکنم</Radio.Button>
                        <Radio.Button value="reject">رد میکنم</Radio.Button>
                    </Radio.Group>
                </div>


            </Modal>


        </>


    )
        ;
};

export default StatusBox;

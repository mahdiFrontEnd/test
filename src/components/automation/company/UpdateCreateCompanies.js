import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";

import {Button, Checkbox, Form, Input, Modal} from 'antd';
import {toast} from "react-toastify";
import { FiEdit } from 'react-icons/fi';
import { LuPlus } from 'react-icons/lu';
import {hasPermission} from "../../../permission/module";
import IconBtn from "../../MicroComponents/button/IconBtn";
import Companies from "../../../api/http_request/Model/companies/Companies";
import {getAgainHandler} from "../../../store/loading/LoadingSlice";

const UpdateCreateCompanies = ({rowData, finishEvent, isPurchase}) => {

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [error422, setError422] = useState([]);

    useEffect(() => {

        form.setFieldsValue(rowData)
        setError422([])
    }, [rowData])


    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };


    const onFinish = (values) => {
        setError422([])
        if (isPurchase) {
            values.activated = true
            values.is_commerce = true
        }
        setLoading(true);
        values.activated = !!values.activated
        Companies.request({
            beforeSend: () => {
            }, success: (res) => {
                handleCancel()

                toast.success(res.message)
                // eslint-disable-next-line no-unused-expressions
                finishEvent && finishEvent()
                dispatch(getAgainHandler());

            },error: ({response}) => {
                if (response?.status === 422) {
                    setError422(response?.data?.errors)
                } else {
                    toast.error(response?.data?.message)
                }

            },  final: () => {
                setLoading(false);
            }
        }).updateCreateCompanies(values, rowData ? 'put' : 'post', rowData?.id)


    };
    const onFinishFailed = () => {
    };
    return (<>
            {hasPermission("automation_company", ['create']) && (
                <IconBtn TooltipText={rowData ? 'ویرایش' : 'ایجاد'} btnClass={rowData ? 'orangeIconBtn' : 'greenIconBtn'}
                         icon={rowData ? <FiEdit size={22} /> : <LuPlus size={22} />}
                         onClick={showModal}/>)}


            <Modal

                open={open}
                title={`${rowData ? 'ویرایش' : 'ایجاد'}  شرکت `}
                onCancel={handleCancel}
                footer={[<Button key="back" onClick={handleCancel}>
                    انصراف
                </Button>, <Button key="submit" type="primary" loading={loading} onClick={() => {
                    form.submit()
                }}>
                    ثبت
                </Button>,

                ]}
            >
                <Form
                    name="basic"
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={rowData || {}}
                    onFinishFailed={onFinishFailed}
                >


                    <Form.Item
                        label="نام"
                        name="name"
                        rules={[{
                            required: true, message: 'لطفا نام را وارد کنید!',
                        },]}
                        validateStatus={error422.name ? 'error' : 'success'}
                        help={error422.name}
                    >
                        <Input/>

                    </Form.Item>


                    {!isPurchase && <div className="row">
                        <div className="col-6"><Form.Item
                            label="فعال "
                            name="activated" valuePropName="checked"
                            validateStatus={error422.activated ? 'error' : 'success'}
                            help={error422.activated}
                        >
                            <Checkbox/>


                        </Form.Item></div>
                        <div className="col-6"><Form.Item
                            label="بازرگانی "
                            name="is_commerce" valuePropName="checked"
                            validateStatus={error422.is_commerce ? 'error' : 'success'}
                            help={error422.is_commerce}                        >
                            <Checkbox/>


                        </Form.Item></div>
                    </div>}


                </Form>

            </Modal>


        </>

    );
};

export default UpdateCreateCompanies;

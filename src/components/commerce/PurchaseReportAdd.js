import React, {useEffect, useState} from 'react';


import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {Button, Form, Modal, Select} from "antd";
import { LuPlus } from 'react-icons/lu';
import Commerce from "../../api/http_request/Model/commerce/Commerce";
import {hasPermission} from "../../permission/module";
import IconBtn from "../MicroComponents/button/IconBtn";
import CurrencyInputComponent from "../MicroComponents/CurrencyInputComponent";
import {getAgainHandler} from "../../store/loading/LoadingSlice";

const PurchaseReportAdd = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [reportTypes, setReportTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingSelect, setLoadingSelect] = useState(false);
    const [open, setOpen] = useState(false);
    const [error422, setError422] = useState([]);

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const onFinishFailed = () => {
    };


    useEffect(() => {
        setError422([])
        if (open && !reportTypes.length) {
            setLoadingSelect(true)

            Commerce.request({
                success: ({result}) => {

                    setReportTypes(result);

                }, error: () => {


                }, final: () => {
                    setLoadingSelect(false);
                }
            }).purchaseReportType()

        }


    }, [open]);


    const onFinish = (values) => {
        setError422([])
        setLoading(true);


        Commerce.request({
            success: (result) => {

                handleCancel()
                form.resetFields()
                toast.success(result.message);

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
        }).purchaseReportAdd(values)


    };

    return (<>

        {hasPermission('commerce_purchase', ['create']) && (
            <IconBtn btnClass='greenIconBtn' icon={<LuPlus size={22} /> } onClick={showModal}/>)}


        <Modal
            open={open}
            title='ایجاد گزارش جدید'
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
                layout='vertical'
                name="basic"
                form={form}

                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label=" نوع گزارش"
                    name="type"
                    validateStatus={error422.type ? 'error' : 'success'}
                    help={error422.type}
                    rules={[{
                        required: true, message: 'لطفا   نوع گزارش را انتخاب کنید!',
                    },]}
                >
                    <Select options={reportTypes} loading={loadingSelect}
                            fieldNames={{label: 'name', value: 'value'}}/>


                </Form.Item>


                <Form.Item
                    label="قیمت روز یورو"
                    name="currency_value"
                    validateStatus={error422.currency_value ? 'error' : 'success'}
                    help={error422.currency_value}
                    rules={[{
                        required: true, message: 'لطفا مبلغ را وارد کنید!',
                    },]}>
                    <CurrencyInputComponent
                        onChange={(e) => {
                            form.setFieldValue('currency_value', e)
                        }}
                        className='form-control'
                    />


                </Form.Item>


            </Form>
        </Modal>


    </>);
};

export default PurchaseReportAdd;

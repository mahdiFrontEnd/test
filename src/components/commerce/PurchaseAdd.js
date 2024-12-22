import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Modal, Select} from 'antd';
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import { LuPlus } from 'react-icons/lu';
import GetSupplierList from "../../api/http_request/Model/commerce/supplier";
import {hasPermission} from "../../permission/module";
import IconBtn from "../MicroComponents/button/IconBtn";
import Commerce from "../../api/http_request/Model/commerce/Commerce";
import {getAgainHandler} from "../../store/loading/LoadingSlice";

const PurchaseAdd = () => {
    const [form] = Form.useForm();
    const [suppliers, setSuppliers] = useState([]);
    const [suppliersLoading, setSuppliersLoading] = useState(false);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [error422, setError422] = useState([]);


    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };


    useEffect(() => {


        GetSupplierList(setSuppliers, setSuppliersLoading)

    }, []);
    useEffect(() => {


        setError422([])
    }, [open]);

    const onFinish = (values) => {
        setError422([])
        setLoading(true);


        Commerce.request({
            success: (result) => {
                toast.success(result.message);
                dispatch(getAgainHandler());
                form.resetFields();
                handleCancel();
            }, error: ({response}) => {
                if (response?.status === 422) {
                    setError422(response?.data?.errors)
                } else {
                    toast.error(response?.data?.message)
                }

            }, final: () => {
                setLoading(false);
            }
        }).purchaseAdd(values)
    };
    const onFinishFailed = () => {
    };
    return (<>
        {hasPermission('commerce_purchase', ['create']) && (
            <IconBtn btnClass='greenIconBtn' icon={<LuPlus size={22} />} onClick={showModal}/>)}


        <Modal
            open={open}
            title="ایجاد پرونده جدید"
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

                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label=" تامین کننده"
                    name="supplier_id"
                    validateStatus={error422.supplier_id ? 'error' : 'success'}
                    help={error422.supplier_id}
                    rules={[{
                        required: true, message: 'لطفا  تامین کننده انتخاب کنید!',
                    },]}
                >
                    <Select
                        loading={suppliersLoading}
                        fieldNames={{label: 'name', value: 'id'}}
                        options={suppliers}
                    />


                </Form.Item>

                <Form.Item
                    validateStatus={error422.performa_id ? 'error' : 'success'}
                    help={error422.performa_id}
                    label="شماره پرفرما"
                    name="performa_id"
                    rules={[{
                        required: true, message: 'لطفا شماره پرفرما را وارد کنید!',
                    },]}
                >
                    <Input/>
                </Form.Item>

            </Form>

        </Modal>

    </>);
};

export default PurchaseAdd;

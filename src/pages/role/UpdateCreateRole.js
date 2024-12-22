import React, {useEffect, useState} from 'react';

import {Button, Form, Input, Modal,} from 'antd';
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import { FiEdit } from 'react-icons/fi';
import { LuPlus } from 'react-icons/lu';
import {hasPermission} from "../../permission/module";
import IconBtn from "../../components/MicroComponents/button/IconBtn";
import Permissions from "../../api/http_request/Model/permissions/Permissions";
import {getAgainHandler} from "../../store/loading/LoadingSlice";
import TreeComponents from "../../components/MicroComponents/TreeComponents";

const UpdateCreateRole = ({rowData, permissionList}) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [error422, setError422] = useState([]);

    const [checkedKeys, setCheckedKeys] = useState([]);

     useEffect(() => {

        form.setFieldsValue(rowData)
        setCheckedKeys(rowData?.permissions || [])

    }, [rowData])
    useEffect(() => {
        setError422([])

    }, [open])
    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };
    const onFinish = (values) => {
        setError422([])
        setLoading(true);
        values.activated = !!values.activated
        Permissions.request({
            beforeSend: () => {
            }, success: (res) => {
                handleCancel()
                form.resetFields()
                toast.success(res.message);
                dispatch(getAgainHandler());

            }, error: (error) => {
                if (error?.response?.status === 422) {
                    setError422(error?.response?.data?.errors)
                } else {
                    toast.error(error?.message)
                }

            }, final: () => {
                setLoading(false);
            }
        }).updateCreateRoles(values, rowData ? 'put' : 'post', rowData?.id)


    };
    const onFinishFailed = () => {
    };

    return (<>
            {hasPermission('category', ['create']) && (
                <IconBtn TooltipText={rowData ? 'ویرایش' : 'ایجاد'} btnClass={rowData ? 'orangeIconBtn' : 'greenIconBtn'}
                         icon={rowData ? <FiEdit size={22} /> : <LuPlus size={22} />}
                         onClick={showModal}/>)}


            <Modal
                width={900}
                open={open}
                title={`${rowData ? 'ویرایش' : 'ایجاد'}  نقش `}
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

                    <div className="row">

                        <div className="col-md-6 col-lg-4"><Form.Item
                            label="نام فارسی"
                            name="name_fa"
                            validateStatus={error422.name_fa ? 'error' : 'success'}
                            help={error422.name_fa}
                            rules={[{
                                required: true, message: 'لطفا نام را وارد کنید!',
                            },]}
                        >
                            <Input/>

                        </Form.Item>
                        </div>

                        {!rowData && <>
                            <div className="col-md-6 col-lg-4"><Form.Item
                                label="نام"
                                validateStatus={error422?.name ? 'error' : 'success'}
                                help={error422?.name}
                                name="name"
                                rules={[{
                                    required: true, message: 'لطفا نام را وارد کنید!',
                                },]}
                            >
                                <Input/>

                            </Form.Item>
                            </div>
                            <div className="col-md-6 col-lg-4"><Form.Item
                                label="slug"
                                validateStatus={error422.slug ? 'error' : 'success'}
                                help={error422.slug}
                                name="slug"
                                rules={[{
                                    required: true, message: 'لطفا نام را وارد کنید!',
                                },]}
                            >
                                <Input/>

                            </Form.Item>
                            </div>
                        </>}


                        <Form.Item
                            label="سطح دسترسی"
                            name="permissions"
                            validateStatus={error422.permissions ? 'error' : 'success'}
                            help={error422.permissions}
                            rules={[{
                                required: true, message: 'لطفا سطح دسترسی را انتخاب کنید!',
                            },]}
                        >

                            <TreeComponents valueArray={checkedKeys} treeData={permissionList} onChange={(result) => {
                                form.setFieldValue('permissions', result)
                                setCheckedKeys(result)
                            }}/>


                        </Form.Item>


                    </div>

                </Form>

            </Modal>


        </>

    );
};

export default UpdateCreateRole;

import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";

import { Button, Checkbox, Form, Input, Modal, Select, TreeSelect } from "antd";
import {toast} from "react-toastify";
import { FiEdit } from 'react-icons/fi';
import { LuPlus } from 'react-icons/lu';
import {hasPermission} from "../../permission/module";
import {getAgainHandler} from "../../store/loading/LoadingSlice";
import IconBtn from "../../components/MicroComponents/button/IconBtn";
import User from "../../api/http_request/Model/User/User";
import GetSectionList from "../../api/http_request/Model/common/GetSectionList";
import GetPositionJobList from "../../api/http_request/Model/common/GetPositionJobList";

const UpdateCreateSection = ({rowData}) => {
    const dispatch = useDispatch();
    const [error422, setError422] = useState([]);
    const [managerList, setManagerList] = useState([]);

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [sectionList, setSectionList] = useState([]);
    const [categoryLoading, setCategoryLoading] = useState(false);
    const [jobPositionList, setJobPositionList] = useState([]);
    const [jobPositionLoading, setJobPositionLoading] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    useEffect(() => {

        form.setFieldsValue(rowData)

    }, [rowData])
    const handleCancel = () => {
        setOpen(false);
    };
    useEffect(() => {
       if(open){
           GetSectionList((e) => {setSectionList([{name: 'سر دسته ندارد', id: '0'}, ...e])}, setCategoryLoading)
           GetPositionJobList(setJobPositionList, setJobPositionLoading,{})
           setError422([])
       }
    }, [open,])


    const onFinish = (values) => {
        setError422([])
        setLoading(true);
        User.request({
            beforeSend: () => {
            }, success: (res) => {
                handleCancel()
                form.resetFields()
                toast.success(res.message);
                dispatch(getAgainHandler());
            }, error: ({response}) => {
                if (response?.status === 422) {
                    setError422(response?.data?.errors)
                } else {
                    toast.error(response?.data?.message)
                }

            }, final: () => {
                setLoading(false);
            }
        }).updateCreateSection(values, rowData ? 'put' : 'post', rowData?.id)
    };
    const onFinishFailed = () => {
    };
    useEffect(() => {
        User.request({
            success: ({result}) => {
                setManagerList(result);
            }
        }).automationUser()

    }, []);

    return (<>
            {hasPermission('category', ['create']) && (
                <IconBtn TooltipText={rowData ? 'ویرایش' : 'ایجاد'} btnClass={rowData ? 'orangeIconBtn' : 'greenIconBtn'}
                         icon={rowData ? <FiEdit size={22} /> : <LuPlus size={22} />}
                         onClick={showModal}/>)}


            <Modal
                width={900}
                open={open}
                title={`${rowData ? 'ویرایش' : 'ایجاد'}  بخش `}
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


                        <div className="col-md-6 col-lg-4  "><Form.Item
                            label="  نام انگلیسی "
                            name="name"
                            validateStatus={error422?.name ? 'error' : 'success'}
                            help={error422?.name}
                            rules={[{
                                required: true, message: 'لطفا نام انگلیسی  را وارد کنید!',
                            },]}
                        >
                            <Input/>


                        </Form.Item></div>
                        <div className="col-md-6 col-lg-4  "><Form.Item
                            validateStatus={error422.name_fa ? 'error' : 'success'}
                            help={error422.name_fa}
                            label="نام فارسی"
                            name="name_fa"
                            rules={[{
                                required: true, message: ' لطفا نام فارسی را وارد کنید!',
                            },]}
                        >
                            <Input/>
                        </Form.Item></div>


                        <div className="col-md-6 col-lg-4  "><Form.Item
                            label="سردسته"
                            validateStatus={error422.parent_id ? 'error' : 'success'}
                            help={error422.parent_id}
                            name="parent_id"
                            rules={[{
                                required: true, message: ' لطفا سر دسته را وارد کنید!',
                            },]}
                        >
                            <TreeSelect loading={categoryLoading}
                                        showSearch
                                        fieldNames={{label: 'name', value: 'id', children: 'childs'}}
                                        allowClear
                                        treeData={sectionList}
                            />


                        </Form.Item></div>






                        <div className="col-md-6 col-lg-4  "><Form.Item
                            label="سمت شغلی"
                            validateStatus={error422.job_positions ? 'error' : 'success'}
                            help={error422.job_positions}
                            name="job_positions"
                            rules={[{
                                required: true, message: ' لطفا سمت شغلی را وارد کنید!',
                            },]}
                        >
                            <Select   mode="multiple"  options={jobPositionList} loading={jobPositionLoading}
                                        showSearch
                                      filterOption={(input, option) => {
                                          return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase());
                                      }}

                                        fieldNames={{label: 'name', value: 'id'}}
                                        allowClear

                            />


                        </Form.Item></div>

                        <div className="col-md-6 col-lg-4  "><Form.Item
                            label="مدیر بخش"
                            validateStatus={error422.manager_id ? 'error' : 'success'}
                            help={error422.manager_id}
                            name="manager_id"
                            rules={[{
                                required: true, message: ' لطفا سمت شغلی را وارد کنید!',
                            },]}
                        >
                            <Select    options={managerList} loading={jobPositionLoading}
                                        showSearch
                                      filterOption={(input, option) => {
                                          return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase());
                                      }}

                                        fieldNames={{label: 'name', value: 'id'}}
                                        allowClear

                            />


                        </Form.Item></div>





                        <div className="col-md-6 col-lg-4  "><Form.Item
                            label="کد مرکز هزینه"
                            validateStatus={error422.cost_center_code ? 'error' : 'success'}
                            help={error422.cost_center_code}
                            name="cost_center_code"
                            rules={[{
                                required: true, message: ' لطفا کد مرکز هزینه را وارد کنید!',
                            },]}
                        >
                            <Input type="number"  />

                        </Form.Item></div>

                        <div className="col-md-6 col-lg-4  "><Form.Item

                            validateStatus={error422.activated ? 'error' : 'success'}
                            help={error422.activated}
                            label="فعال"
                            name="activated" valuePropName="checked"
                        >
                            <Checkbox/>
                        </Form.Item></div>
                    </div>


                </Form>

            </Modal>


        </>

    );
};

export default UpdateCreateSection;

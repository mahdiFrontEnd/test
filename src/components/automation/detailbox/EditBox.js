import React, { useState } from 'react';

import { Button, Form, Input, Modal } from 'antd';
import { toast } from 'react-toastify';
import { MdOutlineEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Automation from '../../../api/http_request/Model/automation/Automation';
import CKEditorComponent from '../../MicroComponents/ckEditor/CKEditorComponent';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';

const EditBox = ({ data }) => {
  const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.profilesReducer.loginUser);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);


  const showModal = () => {

    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };


  const onFinish = (values) => {


    setLoading(true);
    Automation.request({
      beforeSend: () => {
      }, success: (res) => {

        dispatch(getAgainHandler());
        handleCancel();
        form.resetFields();
        toast.success(res.message);
      }, error: (response) => {
        toast.error(response?.message);

      }, final: () => {
        setLoading(false);
      },
    }).edit(`automation_${automationAddress}`, data.id, values);  //routeData, dataId, data
  };

  return (<>
      {loginUser.id === data.created_user_id  ? <Button onClick={showModal} className="defBtn orangeBtn d-flex gap-1 align-items-center"><MdOutlineEdit size={20}/>
        <span>ویرایش</span></Button> : ""}
      <Modal
        width={700}
        open={open} title="ویرایش " onCancel={handleCancel}
        footer={[<Button key="back" onClick={handleCancel}>
          انصراف
        </Button>, <Button key="submit" type="primary" loading={loading} onClick={() => {
          form.submit();
        }}>
          ثبت
        </Button>,

        ]}
      >
        {data.is_editable
        ?
          <Form
            name="basic"
            form={form}
            layout="vertical"
            initialValues={data || {}}
            onFinish={onFinish}

          >
            {
              automationAddress !== 'request' &&
              <Form.Item
                label="موضوع"
                name="subject"
                rules={[{
                  required: true, message: 'لطفا عنوان را وارد کنید!',
                }]}
              >
                <Input />

              </Form.Item>

            }
            <Form.Item
              label="متن"
              name="body"
              rules={[{
                required: true, message: 'لطفا متن را وارد کنید!',
              }]}
            >
              <CKEditorComponent getData={(e) => form.setFieldValue('body', e)} initialText={data.body} />


            </Form.Item>


          </Form>
        :

        <p>به دلیل دیدن شدن این آیتم توسط فرد دیگری, شما نمیتوانید این آیتم را ویرایش کنید.

        </p>
        }


      </Modal>


    </>

  );
};


export default EditBox;
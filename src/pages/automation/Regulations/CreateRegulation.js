import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { LuPlus } from 'react-icons/lu';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import CKEditorComponent from '../../../components/MicroComponents/ckEditor/CKEditorComponent';
import Uploader from '../../../components/MicroComponents/Uploader';
import Automation from '../../../api/http_request/Model/automation/Automation';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import { hasPermission } from '../../../permission/module';
import { getHomeData } from '../../../api/http_request/Model/User/HomeRequest';


const CreateRegulation = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [error422, setError422] = useState([]);


  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };


  const onFinish = (values) => {
    values.attachments = attachments;
    Automation.request({
      beforeSend: () => {
        setLoading(true);

      }, success: () => {
        getHomeData(dispatch);
        handleCancel();
        setAttachments([]);
        form.resetFields();
        dispatch(getAgainHandler());

      }, final: () => {

        setLoading(false);

      }, error: ({ response }) => {

        if (response?.status === 422) {
          setError422(response?.data?.errors);
        } else {
          toast.error(response?.data?.message);
        }
        // toast.error(error?.message);

      },
    }).createRegulations(values);
  };


  return (<>
    {hasPermission('regulations', ['create']) && (
      <IconBtn btnClass="greenIconBtn" icon={<LuPlus size={22} />} onClick={showModal} />
    )}
    <Modal
      open={open}
      title="ایجاد آیین نامه"
      onCancel={handleCancel}
      width="1200px"
      footer={[<Button key="back" onClick={handleCancel}>
        انصراف
      </Button>, <Button
        key="submit"
        type="primary"
        loading={loading}
        onClick={() => {
          form.submit();
        }}
      >
        ثبت
      </Button>]}
    >
      <Form
        layout="vertical"
        name="basic"
        form={form}
        initialValues={{ no_salary: false, target_type: false, pay_type: false }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="row">

          <div className="col-md-6">
            <Form.Item
              label="موضوع"
              name="title"
              validateStatus={error422.title ? 'error' : 'success'}
              help={error422.title}
              rules={[{ required: true, message: 'لطفا  موضوع را وارد کنید!' }]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="col-md-12">
            <Form.Item
              // validateStatus={error422.body ? 'error' : 'success'}
              // help={error422.body}
              label="متن"
              name="body"
              // rules={[{
              //   required: true, message: 'لطفا متن را وارد کنید!',
              // }]}
            >
              <CKEditorComponent getData={(e) => form.setFieldValue('body', e)} />

            </Form.Item>
          </div>

          <div>
            <Form.Item
              validateStatus={error422.attachments ? 'error' : 'success'}
              help={error422.attachments}
              name="attachments"
              label="فایل"
              rules={[{
                required: true, message: 'لطفا فایل را وارد کنید!',
              }]}
            >
              <Uploader name="regulations"
                        defaultFile={[]}
                        onChangeImage={(e) => {
                          setAttachments(e);
                          form.setFieldValue('attachments', e);
                        }}
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  </>);
};


export default CreateRegulation;
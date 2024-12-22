import React, { useEffect, useState } from 'react';

import { Button, Form, Modal } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit } from 'react-icons/fi';
import Automation from '../../../../api/http_request/Model/automation/Automation';
import IconBtn from '../../../MicroComponents/button/IconBtn';
import CkEditorComponent from '../../../MicroComponents/ckEditor/CKEditorComponent';
import { getAgainHandler } from '../../../../store/loading/LoadingSlice';

const EditRefer = ({ data }) => {
  const loginUser = useSelector((state) => state.profilesReducer.loginUser);
  const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error422, setError422] = useState([]);


  useEffect(() => {
    form.setFieldValue('body', data.body);
  }, [data]);
  const showModal = () => {

    setOpen(true);
  };


  const handleCancel = () => {
    setOpen(false);
  };
  useEffect(() => {
    setError422([]);

  }, [open]);

  const onFinish = (values) => {
    setError422([]);

    Automation.request({
      beforeSend: () => {
        setLoading(true);
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
    }).editRefer(`automation_${automationAddress}`, data.id, values);
  };

  return (<>


      {loginUser.id === data.created_user_id && data.is_editable && (<div onClick={showModal}>

          <IconBtn TooltipText="ویرایش" btnClass="orangeText bg-transparent" icon={<FiEdit size={22} />} />

        </div>
      )}


      <Modal
        width={700}
        open={open} title="ویرایش ارجاع" onCancel={handleCancel}
        footer={[<Button key="back" onClick={handleCancel}>
          انصراف
        </Button>, <Button key="submit" type="primary" loading={loading} onClick={() => {
          form.submit();
        }}>
          ثبت
        </Button>]}
      >
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}

        >
          <Form.Item
            validateStatus={error422.body ? 'error' : 'success'}
            help={error422.body}
            label="متن"
            name="body"
            rules={[{
              required: true, message: 'لطفا متن را وارد کنید!',
            }]}
          >

            <CkEditorComponent getData={(e) => form.setFieldValue('body', e)}
                               initialText={form.getFieldValue('body')} />

          </Form.Item>


        </Form>


      </Modal>


    </>

  );
};


export default EditRefer;
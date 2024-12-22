import React, { useEffect, useState } from 'react';

import { Button, Form, Modal } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { BsReply } from 'react-icons/bs';
import { hasPermission } from '../permission/module';
import IconBtn from './MicroComponents/button/IconBtn';
import Automation from '../api/http_request/Model/automation/Automation';
import Uploader from './MicroComponents/Uploader';
import { getAgainHandler } from '../store/loading/LoadingSlice';
import CKEditorComponent from './MicroComponents/ckEditor/CKEditorComponent';

const CommentModal = ({ dontSendFile, rowData, inDetail }) => {
  const [attachments, setAttachments] = useState([]);
  const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
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
    setError422([]);

  }, [open]);

  const onFinish = (values) => {
    setError422([]);
    if (!dontSendFile) {
      values.attachments = attachments;
    }

    Automation.request({
      beforeSend: () => {
        setLoading(true);
      }, success: (res) => {
        dispatch(getAgainHandler());
        handleCancel();
        form.resetFields();
        toast.success(res.message);
      }, error: ({ response }) => {
        if (response?.status === 422) {
          setError422(response?.data?.errors);
        } else {
          toast.error(response?.data?.message);
        }

      }, final: () => {
        setLoading(false);
      },
    }).reply(`automation_${automationAddress}`, rowData?.id, values);
  };

  return (<>
      {hasPermission(`automation_${automationAddress}`, ['reply']) && (<div onClick={showModal}>
          {inDetail ? <Button className="defBtn orangeBtn"><span>پاسخ</span></Button> : <div>
            <div className="d-none d-md-block">
              <IconBtn TooltipText="پاسخ" btnClass="orangeIconBtn" icon={<BsReply size={22} />}
              />
            </div>
            <div className="d-md-none" style={{ width: '160px' }}>
              <Button className="text-black d-flex align-items-center gap-2 px-0" type="link">
                <span className="orangeText"><BsReply size={22} /></span>
                <span>پاسخ</span>
              </Button>
            </div>
          </div>}

        </div>


      )}


      <Modal
        width={700}
        open={open} title="پاسخ" onCancel={handleCancel}
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
            <CKEditorComponent useDefWord getData={(e) => form.setFieldValue('body', e)} />


          </Form.Item>

          {!dontSendFile && <Form.Item
            name="attachments"
            label="فایل"
            validateStatus={error422.attachments ? 'error' : 'success'}
            help={error422.attachments}

          >
            <Uploader onChangeImage={(e) => {
              setAttachments(e);
              form.setFieldValue('attachments', e);
            }}

            />
          </Form.Item>}


        </Form>


      </Modal>


    </>

  );
};

export default CommentModal;

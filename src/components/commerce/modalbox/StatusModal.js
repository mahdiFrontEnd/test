import { Button, Form, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import CurrencyInputComponent from '../../MicroComponents/CurrencyInputComponent';
import Commerce from '../../../api/http_request/Model/commerce/Commerce';
import Uploader from '../../MicroComponents/Uploader';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import CKEditorComponent from '../../MicroComponents/ckEditor/CKEditorComponent';


const StatusModal = ({ rowData, btnText = 'وضعیت', btnClass }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [purchaseStatusList, setPurchaseStatusList] = useState([]);
  const [purchaseStatusListLoading, setPurchaseStatusListLoading] = useState(false);
  const [statusId, setStatusId] = useState();
  const [error422, setError422] = useState([]);
  const [attachments, setAttachments] = useState([]);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = (values) => {
    values.attachments = attachments;
    setError422([]);
    setLoading(true);
    Commerce.request({
      beforeSend: () => {
      }, success: (res) => {
        handleCancel();
        form.resetFields();
        toast.success(res.message);
        dispatch(getAgainHandler());
      }, error: ({ response }) => {
        if (response?.status === 422) {
          setError422(response?.data?.errors);
        } else {
          toast.error(response?.data?.message);
        }

      }, final: () => {
        setLoading(false);
      },
    }).changePurchaseStatus(rowData.id, values);
  };
  const onFinishFailed = () => {
  };


  useEffect(() => {
    if (purchaseStatusList.length === 0 && open) {
      setPurchaseStatusListLoading(true);
      Commerce.request({
        success: ({ result }) => {
          setPurchaseStatusList(result);

        }, error: (error) => {
          toast.error(error);
        }, final: () => {
          setPurchaseStatusListLoading(false);
        },
      }).purchaseStatus();
    }
  }, [open]);
  return (<>
    <div onClick={(e) => {
      e.stopPropagation();
    }}>
      <Button className={`defBtn orangeBtn ${btnClass}`} onClick={showModal}>
        {btnText}
      </Button>
      <Modal
        open={open}
        title="انتخاب وضعیت مورد نظر"
        onOk={onFinish}
        onCancel={handleCancel}
        footer={[<Button onClick={handleCancel} key="button">
          انصراف
        </Button>, <Button loading={loading} type="primary" onClick={() => {
          form.submit();
        }} key="submit">
          ثبت
        </Button>,


        ]}
      >
        <div className="mb-0  p-4">
          <Form
            name="basic"
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >

            <Form.Item
              label="وضعیت "
              name="status_id"
              validateStatus={error422.status_id ? 'error' : 'success'}
              help={error422.status_id}

              rules={[{
                required: true, message: 'لطفا وضعیت را انتخاب کنید!',
              }]}
            >
              <Select
                fieldNames={{ label: 'name', value: 'value' }}
                loading={purchaseStatusListLoading} options={purchaseStatusList}
                showSearch
                onChange={(e) => {
                  setStatusId(e);
                }}
                filterOption={(input, option) => {
                  return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase());
                }}
              />
            </Form.Item>

            <Form.Item
              label="توضیحات"
              name="body"
              validateStatus={error422.body ? 'error' : 'success'}
              help={error422.body}

            >
              {/*<TextArea  autoSize={{ minRows: 3, maxRows: 10 }}/>*/}
              <CKEditorComponent getData={(e) => form.setFieldValue('body', e)} />

            </Form.Item>
            {statusId === 5 && <Form.Item
              label="مبلغ حواله"
              name="price"
              validateStatus={error422.price ? 'error' : 'success'}
              help={error422.price}
              rules={[{
                required: true, message: 'لطفا مبلغ حواله را وارد کنید!',
              }]}

            >
              <CurrencyInputComponent defaultValue={0}
                                      onChange={(value) => form.setFieldValue('price', value)}
              />
            </Form.Item>}


            {statusId !== 1 && statusId !== 0 && <Form.Item
              validateStatus={error422.attachments ? 'error' : 'success'}
              help={error422.attachments}
              name="attachments"
              label="فایل"
            >
              <Uploader name="purchase" onChangeImage={(e) => {
                setAttachments(e);
                form.setFieldValue('attachments', e);
              }}

              />
            </Form.Item>}


          </Form>


        </div>
      </Modal>
    </div>
  </>);
};
export default StatusModal;
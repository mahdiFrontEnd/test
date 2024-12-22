import React, { useEffect, useState } from 'react';

import { Button, Form, Input, Modal, Switch } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FiEdit } from 'react-icons/fi';
import { LuPlus } from 'react-icons/lu';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import Products from '../../../api/http_request/Model/products/Products';
 import UploadByForm from '../../../components/MicroComponents/UploadByForm';

const UpdateCreateBrands = ({ rowData }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error422, setError422] = useState([]);
  const [attachments, setAttachments] = useState([]);


  useEffect(() => {
    if (rowData && open) {
      form.setFieldsValue(rowData);
    } else if (!rowData) {
      form.resetFields();
    }
    setError422([]);

  }, [rowData, open]);
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);

  };
  const onFinish = (values) => {
    setError422([]);
    setLoading(true);
    values = { ...values, ...attachments };

    values.status = values.status ? 1 : 0;
    Products.request({
      beforeSend: () => {
      }, success: (res) => {

        handleCancel();
        toast.success(res.message);
        dispatch(getAgainHandler());


      }, error: (error) => {
        if (error?.response?.status === 422) {
          setError422(error?.response?.data?.errors);
        } else {
          toast.error(error?.message);
        }

      }, final: () => {
        setLoading(false);
      },
    }).createEditProductBrands(values,   rowData?.id);


  };
  const onFinishFailed = () => {
  };

  return (<>
      <IconBtn TooltipText={rowData ? 'ویرایش' : 'ایجاد'} btnClass={rowData ? 'orangeIconBtn' : 'greenIconBtn'}
               icon={rowData ? <FiEdit size={22} /> : <LuPlus size={22} />}
               onClick={showModal} />

      <Modal
        width={900}
        open={open}
        title={`${rowData ? 'ویرایش' : 'ایجاد'}  برند محصول `}
        onCancel={handleCancel}
        footer={[<Button key="back" onClick={handleCancel}>
          انصراف
        </Button>, <Button key="submit" type="primary" loading={loading} onClick={() => {
          form.submit();
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
          initialValues={rowData || { status: true }}
          onFinishFailed={onFinishFailed}
        >

          <div className="row">


            <div className="col-6">


              <Form.Item
                name="files"
                label="فایل"
                validateStatus={error422.attachments ? 'error' : 'success'}
                help={error422.attachments}
              >
                <UploadByForm count={1} rowData={rowData} onChangeImage={(e) => {
                  setAttachments(e);
                  form.setFieldValue('attachments', e);
                }}

                />
              </Form.Item>


            </div>
            <div className="col-6">
              <Form.Item
                validateStatus={error422.status ? 'error' : 'success'}
                help={error422.status}
                label="وضعیت"
                name="status"
                valuePropName="checked"
              >

                <Switch checkedChildren="فعال" unCheckedChildren="غیر فعال" />

              </Form.Item>

            </div>

            <div className="col-md-6 ">

              <Form.Item
                label="نام فارسی"
                name="name"
                validateStatus={error422.name ? 'error' : 'success'}
                help={error422.name}
                rules={[{
                  required: true, message: 'لطفا نام فارسی را وارد کنید!',
                }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="نام انگلیسی"
                name="english_name"
                validateStatus={error422?.english_name ? 'error' : 'success'}
                help={error422?.english_name}
                rules={[{
                  required: true, message: 'لطفا نام انگلیسی را وارد کنید!',
                }]}
              >
                <Input />

              </Form.Item>
            </div>


            <div className="col-md-6 ">
              <Form.Item className="mb-0 pe-2" name="description" label="توضیحات">
                <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} />

              </Form.Item>

            </div>


          </div>

        </Form>

      </Modal>


    </>

  );
};

export default UpdateCreateBrands;

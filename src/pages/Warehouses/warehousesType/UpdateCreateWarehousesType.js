import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { toast } from 'react-toastify';
import { FiEdit } from 'react-icons/fi';
import { LuPlus } from 'react-icons/lu';
import { hasPermission } from '../../../permission/module';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import Products from '../../../api/http_request/Model/products/Products';

const UpdateCreateWarehousesType = ({ rowData }) => {
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
  const onFinish = (values) => {
    setError422([]);
    setLoading(true);
    Products.request({
      beforeSend: () => {},
      success: (res) => {
        handleCancel();
        form.resetFields();
        toast.success(res.message);
        dispatch(getAgainHandler());
      },
      error: (response) => {
        if (response?.response?.status === 422) {
          setError422(response.response?.data?.errors);
        } else {
          toast.error(response?.message);
        }
      },
      final: () => {
        setLoading(false);
      },
    }).updateCreateWarehouseType(values, rowData ? 'put' : 'post', rowData?.id);
  };

  const onFinishFailed = () => {};
  return (
    <>
      {hasPermission('category', ['create']) && (
        <IconBtn
          TooltipText={rowData ? 'ویرایش' : 'ایجاد'}
          btnClass={rowData ? 'orangeIconBtn' : 'greenIconBtn'}
          icon={rowData ? <FiEdit size={22} /> : <LuPlus size={22} />}
          onClick={showModal}
        />
      )}

      <Modal
        width={900}
        open={open}
        title={`${rowData ? 'ویرایش' : 'ایجاد'}  نوع انبار `}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            انصراف
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => {
              form.submit();
            }}
          >
            ثبت
          </Button>,
        ]}
      >
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={rowData ||  {activated:true}}
          onFinishFailed={onFinishFailed}
        >
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <Form.Item
                label="نام"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'لطفا نام را وارد کنید!',
                  },
                ]}
                validateStatus={error422?.name ? 'error' : 'success'}
                help={error422?.name}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6 col-lg-4">
              <Form.Item
                name="activated"
                valuePropName="checked"
                label=" "
                validateStatus={error422.activated ? 'error' : 'success'}
                help={error422.activated}
              >
                <Checkbox>فعال</Checkbox>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateCreateWarehousesType;

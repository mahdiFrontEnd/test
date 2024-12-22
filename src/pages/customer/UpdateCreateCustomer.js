import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Checkbox, Form, Input, Modal, Select } from 'antd';
import { toast } from 'react-toastify';
import { FiEdit } from 'react-icons/fi';
import { LuPlus } from 'react-icons/lu';
import { hasPermission } from '../../permission/module';
import { getAgainHandler } from '../../store/loading/LoadingSlice';
import IconBtn from '../../components/MicroComponents/button/IconBtn';
import Common from '../../api/http_request/Model/common/common';
import Customers from '../../api/http_request/Model/customers/Customers';
import Uploader from '../../components/MicroComponents/Uploader';

const UpdateCreateCustomer = ({ rowData }) => {
  const dispatch = useDispatch();
  const [customersGroup, setCustomersGroup] = useState([]);
  const [attachments, setAttachments] = useState('');

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectLoading, setSelectLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error422, setError422] = useState([]);

  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    form.setFieldsValue(rowData);
  }, [rowData]);
  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    setError422([]);

    setSelectLoading(true);
    Common.request({
      beforeSend: () => {},
      error: () => {},
      success: async (data) => {
        setCustomersGroup(data?.result);
      },
      failed: () => {},
      final: () => {
        setSelectLoading(false);
      },
    }).customerGroup();
  }, [open]);
  const onFinish = (values) => {
    setError422([]);
    setLoading(true);
    values.image = attachments;
    Customers.request({
      beforeSend: () => {},
      success: (res) => {
        handleCancel();
        form.resetFields();
        toast.success(res.message);

        dispatch(getAgainHandler());
      },
      error: ({ response }) => {
        if (response?.status === 422) {
          setError422(response?.data?.errors);
        } else {
          toast.error(response?.data?.message);
        }
      },
      final: () => {
        setLoading(false);
      },
    }).customerAddEdit(values, rowData ? 'put' : 'post', rowData?.id);
  };
  const onFinishFailed = () => {};
  return (
    <>
      {hasPermission('commerce_purchase', ['create']) && (
        <IconBtn
          TooltipText={rowData ? 'ویرایش' : 'ایجاد'}
          btnClass={rowData ? 'orangeIconBtn' : 'greenIconBtn'}
          icon={rowData ? <FiEdit size={22} /> : <LuPlus size={22} />}
          onClick={showModal}
        />
      )}

      <Modal
        open={open}
        title={`${rowData ? 'ویرایش' : 'ایجاد'}  مشتری `}
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
          initialValues={rowData || {}}
          onFinishFailed={onFinishFailed}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                name="image"
                valuePropName="fileList"
                validateStatus={error422.image ? 'error' : 'success'}
                help={error422.image}
              >
                <Uploader name="customer"
                  onChangeImage={(e) => {
                    setAttachments(e[0]);
                    form.setFieldValue('image', e[0]);
                  }}
                  count={1}
                  listType="picture-circle"
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                validateStatus={error422.first_name ? 'error' : 'success'}
                help={error422.first_name}
                label="نام"
                name="first_name"
                rules={[
                  {
                    required: true,
                    message: 'لطفا نام را وارد کنید!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="نام خانوادگی"
                name="last_name"
                validateStatus={error422.last_name ? 'error' : 'success'}
                help={error422.last_name}
                rules={[
                  {
                    required: true,
                    message: 'لطفا نام خانوادگی را وارد کنید!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="تلفن همراه"
                validateStatus={error422.mobile ? 'error' : 'success'}
                help={error422.mobile}
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: 'لطفا تلفن همراه را وارد کنید!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="ایمیل"
                name="email"
                validateStatus={error422.email ? 'error' : 'success'}
                help={error422.email}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                validateStatus={error422.customer_group_id ? 'error' : 'success'}
                help={error422.customer_group_id}
                label="درجه"
                name="customer_group_id"
              >
                <Select
                  loading={selectLoading}
                  fieldNames={{ label: 'name', value: 'id' }}
                  options={customersGroup}
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                validateStatus={error422.activated ? 'error' : 'success'}
                help={error422.activated}
                label="فعال "
                name="activated"
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateCreateCustomer;

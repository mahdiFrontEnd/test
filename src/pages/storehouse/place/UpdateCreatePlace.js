import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Form, Input, Modal, Switch, TreeSelect } from 'antd';
import { toast } from 'react-toastify';
import { FiEdit } from 'react-icons/fi';
import { LuPlus } from 'react-icons/lu';
import { hasPermission } from '../../../permission/module';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import Storehouse from '../../../api/http_request/Model/storehouse/Storehouse';
import GetStorehouseList from '../../../api/http_request/Model/storehouse/GetPlaceList';

const UpdateCreatePlace = ({ rowData }) => {
  const dispatch = useDispatch();
  const [error422, setError422] = useState([]);
  // const [attributeList, setAttributeList] = useState([]);

  const [form] = Form.useForm();
  // const [attributeLoading, setAttributeLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [placeList, setPlaceList] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState([]);
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
    if (open) {

      GetStorehouseList((e) => {
        setPlaceList([{ name: 'سر دسته ندارد', id: '0' }, ...e.data]);


      }, setCategoryLoading);

      setError422([]);
    }
  }, [open]);

  const onFinish = (values) => {
    values.status = values.status ? 1 : 0;
    setError422([]);
    setLoading(true);
    Storehouse.request({
      beforeSend: () => {
      },
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
    }).updateCreatePlace(values, rowData?.id);
  };
  const onFinishFailed = () => {
  };
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
        title={`${rowData ? 'ویرایش' : 'ایجاد'}  انبار `}
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
          initialValues={rowData || {status:1}}
          onFinishFailed={onFinishFailed}
        >
          <div className="row">


            <div className="col-md-6   ">
              <Form.Item
                label="نام"
                name="name"
                validateStatus={error422?.name ? 'error' : 'success'}
                help={error422?.name}
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
                label="سر دسته"
                validateStatus={error422.parent_id ? 'error' : 'success'}
                help={error422.parent_id}
                name="parent_id"
                rules={[
                  {
                    required: true,
                    message: ' لطفا سر دسته را وارد کنید!',
                  },
                ]}
              >
                <TreeSelect
                  loading={categoryLoading}
                  showSearch
                  fieldNames={{ label: 'name', value: 'id', children: 'childs' }}
                  allowClear
                  treeData={placeList}
                />
              </Form.Item>
            </div>


            <div className="col-md-6   ">
              <Form.Item className="mb-0 pe-2" name="description" label="توضیحات">
                <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} />
              </Form.Item>
            </div>
            <div className="col-md-6   ">
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
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateCreatePlace;

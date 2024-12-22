import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Form, Input, Modal, Switch, TreeSelect } from 'antd';
import { toast } from 'react-toastify';
import { FiEdit } from 'react-icons/fi';
import { LuPlus } from 'react-icons/lu';
import Products from '../../../api/http_request/Model/products/Products';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import { hasPermission } from '../../../permission/module';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import GetCategoriesAttribute from '../../../api/http_request/Model/products/GetCategoriesAttributeList';


const UpdateCreateAttributeCategories = ({ rowData }) => {
  const dispatch = useDispatch();
  const [error422, setError422] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState([]);
  const showModal = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (rowData) {
      form.setFieldsValue({ ...rowData, parent_id: rowData.parent_id ?? 'null' });

    }
  }, [rowData]);
  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      GetCategoriesAttribute((e) => {
        setCategoryList([{ name: 'سر دسته ندارد', id: 'null' }, ...e.data]);
      }, setCategoryLoading);
      setError422([]);
    }
  }, [open]);

  const onFinish = (values) => {
    setError422([]);
    values.status = values.status ? 1 : 0;
    values.parent_id = values.parent_id === 'null' ? '' : values.parent_id;

    setLoading(true);
    Products.request({
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
      // rowData ? 'put' : 'post'
    }).updateCreateAttributeCategory(values, rowData?.id);
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
        title={`${rowData ? 'ویرایش' : 'ایجاد'}  دسته بندی `}
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
          initialValues={rowData || { status: true }}
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
                label="دسته بندی مادر"
                validateStatus={error422.parent_id ? 'error' : 'success'}
                help={error422.parent_id}
                name="parent_id"
                rules={[
                  {
                    required: true,
                    message: 'لطفا دسته بندی مادر را انتخاب کنید!',
                  },
                ]}
              >
                <TreeSelect
                  loading={categoryLoading}
                  showSearch
                  fieldNames={{ label: 'name', value: 'id', children: 'children_category' }}
                  allowClear
                  treeData={categoryList}
                />

              </Form.Item>
            </div>


            <div className="col-md-6   ">
              <Form.Item className="mb-0 pe-2" name="description" label="توضیحات">
                <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} />
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

          </div>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateCreateAttributeCategories;

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Form, Input, Modal, Select, Switch, TreeSelect } from 'antd';
import { toast } from 'react-toastify';
import { FiEdit } from 'react-icons/fi';
import { LuPlus } from 'react-icons/lu';
import GetCategoryList from '../../../api/http_request/Model/products/GetCategoriesList';
import Products from '../../../api/http_request/Model/products/Products';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import { hasPermission } from '../../../permission/module';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import GetBrandList from '../../../api/http_request/Model/products/GetBrandList';
import GetTypeList from '../../../api/http_request/Model/products/GetTypeList';
import GetUnitList from '../../../api/http_request/Model/products/GetUnitList';
import UploadByForm from '../../../components/MicroComponents/UploadByForm';


const UpdateCreateProduct = ({ rowData }) => {
  const dispatch = useDispatch();
  const [attachments, setAttachments] = useState([]);
  const [error422, setError422] = useState([]);
   const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [brandLoading, setBrandLoading] = useState(false);
  const [typeLoading, setTypeLoading] = useState(false);
  const [unitLoading, setUnitLoading] = useState(false);


  const showModal = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (rowData) {
      form.setFieldsValue(rowData);


    }
  }, [rowData]);
  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      GetCategoryList((e) => {
        setCategoryList(e.data);
      }, setCategoryLoading);
      GetBrandList(setBrandList, setBrandLoading);
      GetTypeList(setTypeList, setTypeLoading);
      GetUnitList(setUnitList, setUnitLoading);
      setError422([]);
    }
  }, [open]);

  const onFinish = (values) => {

    setError422([]);
    values.status = values.status ? 1 : 0;
    if (values.parent_id === 0) {
      values.parent_id = null;
    }
    values = { ...values, ...attachments };
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
     }).updateCreateProduct(values, rowData?.id);
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
        title={`${rowData ? 'ویرایش' : 'ایجاد'}  محصول `}
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
          initialValues={rowData || { status: 1 }}
        >
          <div className="row">
            <div className="col-6">
              <Form.Item
                name="files"
                label="فایل"
                validateStatus={error422.attachments ? 'error' : 'success'}
                help={error422.attachments}
              >
                <UploadByForm count={6} rowData={rowData} onChangeImage={(e) => {
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
                label="دسته بندی"
                validateStatus={error422.category_id ? 'error' : 'success'}
                help={error422.category_id}
                name="category_id"
                rules={[
                  {
                    required: true,
                    message: ' لطفا دسته بندی را وارد کنید!',
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
              </Form.Item><Form.Item
              label="برند"
              validateStatus={error422.brand_id ? 'error' : 'success'}
              help={error422.brand_id}
              name="brand_id"
              rules={[
                {
                  required: true,
                  message: ' لطفا برند را وارد کنید!',
                },
              ]}
            >
              <Select
                loading={brandLoading}
                showSearch
                fieldNames={{ label: 'name', value: 'id' }}
                allowClear
                options={brandList}
              />
            </Form.Item><Form.Item
              label="نوع محصول"
              validateStatus={error422.type_id ? 'error' : 'success'}
              help={error422.type_id}
              name="type_id"
              rules={[
                {
                  required: true,
                  message: ' لطفا نوع محصول را وارد کنید!',
                },
              ]}
            >
              <Select
                loading={typeLoading}
                showSearch
                fieldNames={{ label: 'name', value: 'id' }}
                allowClear
                options={typeList}
              />
            </Form.Item>


              <Form.Item
                label="واحد اندازه گیری"
                validateStatus={error422.unit_id ? 'error' : 'success'}
                help={error422.unit_id}
                name="unit_id"
                rules={[
                  {
                    required: true,
                    message: ' لطفا واحد اندازه گیری را وارد کنید!',
                  },
                ]}
              >
                <Select
                  loading={unitLoading}
                  showSearch
                  fieldNames={{ label: 'unit', value: 'id' }}
                  allowClear
                  options={unitList}
                />
              </Form.Item>
            </div>


            <div className="col-md-6">
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

export default UpdateCreateProduct;


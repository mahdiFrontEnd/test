import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Form, Input, Modal, Switch, TreeSelect } from 'antd';
import { toast } from 'react-toastify';
import { FiEdit } from 'react-icons/fi';
import { LuPlus } from 'react-icons/lu';
import GetCategoryList from '../../../api/http_request/Model/products/GetCategoriesList';
import Products from '../../../api/http_request/Model/products/Products';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import CodeBox from './CodeBox';
// import UploadByForm from '../../../components/MicroComponents/UploadByForm';


const UpdateCreateCategory = ({ rowData }) => {
  const dispatch = useDispatch();
  // const [attachments, setAttachments] = useState('');
  const [error422, setError422] = useState([]);
  // const [attachmentList, setAttachmentList] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState([]);
  const [selectedParent, setSelectedParent] = useState(null);

  const findItemByValue = (list,value) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of list) {
      if (item.id === value) {
        return item;
      }
      if (item.children_category) {
        const found = findItemByValue(item.children_category, value);
        if (found) return found;
      }
    }
    return null;
  };

  const handleChange = (value) => {
    const item = findItemByValue(categoryList,value);
    setSelectedParent(item);
  };


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
        setCategoryList([{ name: 'سر دسته ندارد', id: 0 }, ...e.data]);
      }, setCategoryLoading);
      setError422([]);
    }
  }, [open]);

  const onFinish = (values) => {
    setError422([]);
    values.status = values.status ? 1 : 0;
    if (values.parent_id === 0) {
      values.parent_id = null;
    }
    // values = { ...values, ...attachments };

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
    }).updateCreateCategory(values, rowData?.id);
  };
  const onFinishFailed = () => {
  };


  return (
    <>

      <IconBtn
        TooltipText={rowData ? 'ویرایش' : 'ایجاد'}
        btnClass={rowData ? 'orangeIconBtn' : 'greenIconBtn'}
        icon={rowData ? <FiEdit size={22} /> : <LuPlus size={22} />}
        onClick={showModal}
      />


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
          initialValues={rowData || { status: 1 }}
          onFinishFailed={onFinishFailed}
        >
          <div className="row">
            {/*<div className="col-6">*/}
            {/*  <Form.Item*/}
            {/*    name="files"*/}
            {/*    label="فایل"*/}
            {/*    validateStatus={error422.attachments ? 'error' : 'success'}*/}
            {/*    help={error422.attachments}*/}

            {/*  >*/}
            {/*    <UploadByForm count={10} defaultFile={attachmentList} onChangeImage={(e) => {*/}

            {/*      setAttachments(e);*/}
            {/*      form.setFieldValue('attachments', e);*/}
            {/*    }}*/}

            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</div>*/}


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
                // rules={[
                //   {
                //     required: true,
                //     message: ' لطفا سر دسته را وارد کنید!',
                //   },
                // ]}
              >
                <TreeSelect
                  loading={categoryLoading}
                  showSearch
                  fieldNames={{ label: 'name', value: 'id', children: 'children_category' }}
                  allowClear
                  treeData={categoryList}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>


            <div className="col-md-6   ">
              <Form.Item className="mb-0 pe-2" name="description" label="توضیحات">
                <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} />
              </Form.Item>
            </div>
            <div className="col-md-6 d-flex justify-content-between">


              <Form.Item
                validateStatus={error422.code ? 'error' : 'success'}
                help={error422.code}
                label="کد دسته بندی"
                name="code"

              >

                <CodeBox selectedParent={selectedParent} codeItem={rowData?.code} onChangeCode={(e) => {
                  form.setFieldValue('code', e);
                }} />
              </Form.Item>

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

export default UpdateCreateCategory;

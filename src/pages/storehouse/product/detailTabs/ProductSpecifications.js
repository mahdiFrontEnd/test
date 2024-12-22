import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Select, TreeSelect } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import GetTypeListCommon from '../../../../api/http_request/Model/products/GetTypeListCommon';
// import GetSectionList from '../../../../api/http_request/Model/common/GetSectionList';
// import GetCategoryList from '../../../../api/http_request/Model/products/GetCategoriesList';
import Products from '../../../../api/http_request/Model/products/Products';
import Uploader from '../../../../components/MicroComponents/Uploader';
import ChooseAttrOptions from './ChooseAttrOptions';


const ProductSpecifications = ({ data, setCurrent }) => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [error422, setError422] = useState([]);
  const [, setLoading] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const [categoryList, setCategoryList] = useState([]);

  const [categoryListLoading, setCategoryListLoading] = useState(false);

  const [typeList, setTypeList] = useState([]);
  const [typeListLoading, setTypeListLoading] = useState(false);
  const [sectionList, setSectionList] = useState([]);
  const [sectionListLoading, setSectionListLoading] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const [attrOptions, setAttrOptions] = useState([]);
  console.log(setCategoryList,
  setCategoryListLoading,
  setTypeList,
  setTypeListLoading,
  setSectionList,
  setSectionListLoading,);
  useEffect(() => {
    form.setFieldsValue(data);
    setCategoryId(data?.category_id);
  }, [data]);
  useEffect(() => {
    // GetTypeListCommon(setTypeList, setTypeListLoading);
    // GetSectionList(setSectionList, setSectionListLoading);
  }, []);

  useEffect(() => {
    if (!categoryList.length) {
      // GetCategoryList(setCategoryList, setCategoryListLoading);
    }
  }, []);

  const onFinish = (values) => {
    values.step = 1;
    setError422([]);
    values.images = attachments;
    values.attribute_options = attrOptions;
    setLoading(true);
    values.activated = !!values.activated;
    Products.request({
      beforeSend: () => {},
      success: (res) => {
        toast.success(res.message);
        setCurrent(2);
        navigate(`/products/edit/${res.result.id}?currentTab=2`);
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
    }).updateCreateProduct(values, data ? 'put' : 'post', data ? data?.id : '');
    // }).updateCreateProduct(values, rowData ? "put" : "post", rowData?.id);
  };

  return (
    <Form
      name="basic"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      // initialValues={rowData || {}}
    >
      <div className="row">
        <div className="col-12   d-flex justify-content-between ">
          <Uploader
            name="product"
            onChangeImage={(e) => {
              setAttachments(e);
              form.setFieldValue('images', e);
            }}
          />

          <Form.Item
            name="activated"
            label=" "
            valuePropName="checked"
            validateStatus={error422.activated ? 'error' : 'success'}
            help={error422.activated}
          >
            <Checkbox>موجود</Checkbox>
          </Form.Item>
        </div>

        <div className="col-sm-6 col-md-4  col-lg-3">
          <Form.Item
            label="نام محصول"
            name="name"
            validateStatus={error422?.name ? 'error' : 'success'}
            help={error422?.name}
            rules={[
              {
                required: true,
                message: 'لطفا نام محصول را وارد کنید!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="col-sm-6 col-md-4  col-lg-3">
          <Form.Item
            label="کد"
            name="sku"
            validateStatus={error422.sku ? 'error' : 'success'}
            help={error422.sku}
            rules={[
              {
                required: true,
                message: 'لطفا کد را وارد کنید!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="col-sm-6 col-md-4  col-lg-3">
          <Form.Item
            label="سربار واردات"
            name="import_overhead"
            validateStatus={error422.import_overhead ? 'error' : 'success'}
            help={error422.import_overhead}
            rules={[
              {
                required: true,
                message: 'لطفا سربار واردات را وارد کنید!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="col-sm-6 col-md-4  col-lg-3">
          <Form.Item
            label="توضیحات"
            name="description"
            validateStatus={error422.description ? 'error' : 'success'}
            help={error422.description}
          >
            <Input.TextArea />
          </Form.Item>
        </div>
        <div className="col-sm-6 col-md-4  col-lg-3">
          <Form.Item
            label="لینک"
            name="url"
            validateStatus={error422.url ? 'error' : 'success'}
            help={error422.url}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="col-sm-6 col-md-4  col-lg-3">
          <Form.Item
            label="دسته بندی
"
            name="category_id"
            validateStatus={error422.category_id ? 'error' : 'success'}
            help={error422.category_id}
            rules={[
              {
                required: true,
                message: 'لطفا دسته بندی را انتخاب کنید!',
              },
            ]}
          >
            <TreeSelect
              loading={categoryListLoading}
              showSearch
              onChange={(e) => {
                setCategoryId(e);
              }}
              fieldNames={{ label: 'name', value: 'id', children: 'childs' }}
              allowClear
              filterOption={(input, option) => {
                return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase());
              }}
              treeData={categoryList}
            />
          </Form.Item>
        </div>
        <div className="col-sm-6 col-md-4  col-lg-3">
          <Form.Item
            label="نوع محصول"
            name="type_ids"
            validateStatus={error422.type_ids ? 'error' : 'success'}
            help={error422.type_ids}
            rules={[
              {
                required: true,
                message: 'لطفا نوع محصول را انتخاب کنید!',
              },
            ]}
          >
            <Select

              mode="multiple"
              loading={typeListLoading}
              options={typeList}
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </Form.Item>
        </div>
        <div className="col-sm-6 col-md-4  col-lg-3">
          <Form.Item
            label="بخش"
            name="section_ids"
            validateStatus={error422.section_ids ? 'error' : 'success'}
            help={error422.section_ids}
          >
            <Select
              loading={sectionListLoading}
              mode="multiple"
              showSearch
              filterOption={(input, option) => {
                return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase());
              }}
              options={sectionList}
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </Form.Item>
        </div>

        <ChooseAttrOptions
          categoryId={categoryId}
          setAttrOptions={(e) => {
            setAttrOptions(e);
          }}
          data={data}
        />

        <Form.Item>
          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">
              ثبت
            </Button>
          </div>
        </Form.Item>
      </div>
    </Form>
  );
};

export default ProductSpecifications;

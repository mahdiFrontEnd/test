import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import Products from '../../../../api/http_request/Model/products/Products';

const ProductSales = ({ data, current ,setCurrent}) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);
  const onFinish = (values) => {
    delete values.commerce_weighted_average_price;
    values.step = Number(current);
    setLoading(true);
    Products.request({
      success: (result) => {
        toast.success(result.message);
        navigate(`/products/list`);


      },
      error: (error) => {
        toast.error(error.response.data.message);
      },
      final: () => {
        setLoading(false);
      },
    }).updateCreateProduct(values, 'put', id);
  };
  return (
    <div>
      <Form
        name="basic"
        onFinish={onFinish}
        layout="vertical"
        form={form}
        initialValues={data || {}}
      >
        <div className="row">
          <div className="col-sm-6 col-md-4 px-2">
            <Form.Item
              label="قیمت فروش"
              name="commerce_sales_price"
              rules={[{ required: true, message: 'لطفا قیمت فروش را وارد کنید.' }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="col-sm-6 col-md-4 px-2">
            <Form.Item
              label="میانگین وزنی"
              name="commerce_weighted_average_price"
              rules={[{ required: true, message: 'لطفا میانگین وزنی را وارد کنید.' }]}
            >
              <Input disabled />
            </Form.Item>
          </div>
          <div className="col-sm-6 col-md-4 px-2">
            <Form.Item
              label="پیش بینی واردات"
              name="import_forecast"
              rules={[{ required: true, message: 'لطفا پیش بینی واردات را وارد کنید.' }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="col-sm-6 col-md-4 px-2">
            <Form.Item
              label="سربار واردات"
              name="import_overhead"
              rules={[{ required: true, message: 'لطفا سربار واردات را وارد کنید.' }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="d-flex justify-content-end">
            {/*<Form.Item>*/}
            {/*  <Button loading={loading} key="submit" type="primary" htmlType="submit">*/}
            {/*    ثبت*/}
            {/*  </Button>*/}
            {/*</Form.Item>*/}


            <Form.Item>
              <div className="d-flex justify-content-end gap-2 align-items-center">
                <Button
                  className="defBtn redBtn px-3"
                  onClick={() => {
                    setCurrent(current - 1);
                  }}
                >
                  قبلی
                </Button>
                <Button loading={loading} htmlType="submit" className="defBtn orangeBtn px-3">
                  ثبت
                </Button>
              </div>
            </Form.Item>



          </div>
        </div>
      </Form>
    </div>
  );
};

export default ProductSales;

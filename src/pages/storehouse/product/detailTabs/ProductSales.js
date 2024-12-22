import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Products from '../../../../api/http_request/Model/products/Products';

const Months = [
  { name_fa: 'فروردین', name: 'month_1' },
  { name_fa: 'اردیبهشت', name: 'month_2' },
  { name_fa: 'خرداد', name: 'month_3' },
  { name_fa: 'تیر', name: 'month_4' },
  { name_fa: 'مرداد', name: 'month_5' },
  { name_fa: 'شهریور', name: 'month_6' },
  { name_fa: 'مهر', name: 'month_7' },
  { name_fa: 'آبان', name: 'month_8' },
  { name_fa: 'آذر', name: 'month_9' },
  { name_fa: 'دی', name: 'month_10' },
  { name_fa: 'بهمن', name: 'month_11' },
  { name_fa: 'اسفند', name: 'month_12' },
];
const ProductSales = ({ data, setCurrent, current }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  const onFinish = (values) => {
    values.step = Number(current);
    setLoading(true);
    Products.request({
      success: (result) => {
        setCurrent(4);
        toast.success(result.message);
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
      <Form name="basic" onFinish={onFinish} form={form} layout="vertical" autoComplete="off">
        <div className="row">
          {Months.map((item) => (
            <div className="col-4 px-2" key={item?.name}>
              <Form.Item
                label={item.name_fa}
                name={item?.name}
                // rules={[{ required: true, message: 'لطفا درصد فروردین را وارد کنید.' }]}
              >
                <Input type="number" />
              </Form.Item>
            </div>
          ))}
        </div>
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
      </Form>
    </div>
  );
};

export default ProductSales;

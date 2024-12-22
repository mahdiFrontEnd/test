import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Select, Switch } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FiEdit } from 'react-icons/fi';
import { LuPlus } from 'react-icons/lu';
import { hasPermission } from '../../../permission/module';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import Products from '../../../api/http_request/Model/products/Products';
import GetUnitsList from '../../../api/http_request/Model/common/GetUnitsList';

const UpdateCreateProductRequest = ({ rowData }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [unitList, setUnitList] = useState([]);
  const [unitListLoading, setUnitListLoading] = useState([]);
  const [haveDeadTime, setHaveDeadTime] = useState(false);
  const [open, setOpen] = useState(false);
  const [error422, setError422] = useState([]);


  useEffect(() => {
    if (open) {
      GetUnitsList(
        setUnitList,
        setUnitListLoading,
      );
    }

  }, [open]);


  useEffect(() => {
    if (rowData && open) {
      form.setFieldsValue({ ...rowData, values: rowData.values.map(({ value }) => (value)) });
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
    values.status = values.status ? 1 : 0;
    values.dead_time = values.dead_time ?? 0;

    Products.request({
      beforeSend: () => {
      },
      success: (res) => {
        handleCancel();
        form.resetFields();
        toast.success(res.message);
        dispatch(getAgainHandler());
      },
      error: (error) => {
        if (error?.response?.status === 422) {
          setError422(error?.response?.data?.errors);
        } else {
          toast.error(error?.message);
        }
      },
      final: () => {
        setLoading(false);
      },
    }).createProductRequest(values);
  };

  const onFinishFailed = () => {
  };


   return (
    <>

      {hasPermission('ware', ['create']) && (
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
        title={`${rowData ? 'ویرایش' : 'ایجاد'}  درخواست کالا `}
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
          initialValues={{ have_dead_time: haveDeadTime }}
          onFinishFailed={onFinishFailed}
        >
          <div className="row">
            <div className="col-md-6 ">
              <Form.Item
                label="کالای درخواستی  "
                name="request_name"
                validateStatus={error422.request_name ? 'error' : 'success'}
                help={error422.request_name}
                rules={[
                  {
                    required: true,
                    message: 'لطفا کالای درخواستی را وارد کنید!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="تعداد درخواستی  "
                name="count_request"
                validateStatus={error422.count_request ? 'error' : 'success'}
                help={error422.count_request}
                rules={[
                  {
                    required: true,
                    message: 'لطفا تعداد درخواستی را وارد کنید!',
                  },
                ]}
              >
                <InputNumber controls={false} className="w-100" />
              </Form.Item>
              <Form.Item
                label="واحد اندازه گیری"
                name="unit"
                validateStatus={error422.unit ? 'error' : 'success'}
                help={error422.unit}
                rules={[
                  {
                    required: true,
                    message: 'لطفا واحد اندازه گیری را وارد کنید!',
                  },
                ]}
              >


                <Select options={unitList} loading={unitListLoading} fieldNames={{ label: 'unit_value', value: 'id' }} />
              </Form.Item>


              <div className="d-flex gap-1 align-items-end">
                <Form.Item

                  label="محدودیت زمانی  "
                  name="have_dead_time"
                  valuePropName="checked"
                >

                  <Switch onChange={(e) => {
                    console.log(e);
                    setHaveDeadTime(e);
                  }} checkedChildren="دارد" unCheckedChildren="ندارد" />

                </Form.Item>


                {haveDeadTime && <Form.Item
                  className="flex-1"
                  name="dead_time"
                  rules={[
                    {
                      required: true,
                      message: 'لطفا محدودیت زمانی را وارد کنید!',
                    },
                  ]}
                  validateStatus={error422.dead_time ? 'error' : 'success'}
                  help={error422.dead_time}

                >
                  <InputNumber placeholder="تعداد روز" controls={false} className="w-100" />
                </Form.Item>}


              </div>


            </div>
            <div className="col-md-6">
              <Form.Item className=" pe-2" name="reason" label="دلیل درخواست" rules={[
                {
                  required: true,
                  message: 'لطفا دلیل درخواست را وارد کنید!',
                },
              ]}
                         validateStatus={error422.reason ? 'error' : 'success'}
                         help={error422.reason}

              >
                <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} />
              </Form.Item>
              <Form.Item className=" pe-2" name="description" label="مشخصات تکمیلی">
                <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} />
              </Form.Item>
            </div>

          </div>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateCreateProductRequest;

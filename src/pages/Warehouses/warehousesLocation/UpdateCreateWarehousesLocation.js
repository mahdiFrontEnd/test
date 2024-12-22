import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Checkbox, Form, Input, Modal, Select } from 'antd';
import { toast } from 'react-toastify';
import { FiEdit } from 'react-icons/fi';
import { LuPlus } from 'react-icons/lu';
import { hasPermission } from '../../../permission/module';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import User from '../../../api/http_request/Model/User/User';
import Common from '../../../api/http_request/Model/common/common';
import Products from '../../../api/http_request/Model/products/Products';

const UpdateCreateWarehousesLocation = ({ rowData }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error422, setError422] = useState([]);
  const [managerList, setManagerList] = useState([]);

  const [cityLoading, setCityLoading] = useState(false);
  const [stateLoading, setStateLoading] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [selectedState, setSelectedState] = useState();

  useEffect(() => {
    if (selectedState) {
      setCityLoading(true);
      Common.request({
        success: ({ result }) => {
          setCityList(result);
        },
        final: () => {
          setCityLoading(false);
        },
      })
        .addParams({ parent_id: selectedState })
        .cityList();
    }
  }, [selectedState]);
  useEffect(() => {
    if (open) {
      if (!stateList.length) {
        setStateLoading(true);
        Common.request({
          success: ({ result }) => {
            setStateList(result);
          },
          final: () => {
            setStateLoading(false);
          },
        }).cityList();
      }

      if (!managerList.length) {
        User.request({
          success: ({ result }) => {
            setManagerList(result);
          },
        }).automationUser();
      }
    }
  }, [open]);

  useEffect(() => {
    if (rowData && open) {
      form.setFieldsValue(rowData);
      setSelectedState(rowData.province);
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
    delete values.province;
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
    }).updateCreateWarehouseLocation(values, rowData ? 'put' : 'post', rowData?.id);
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
        title={`${rowData ? 'ویرایش' : 'ایجاد'}  محل نگهداری کالاها `}
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
                label="تلفن "
                name="telephone"
                rules={[
                  {
                    required: true,
                    message: 'لطفا تلفن  را وارد کنید!',
                  },
                ]}
                validateStatus={error422.telephone ? 'error' : 'success'}
                help={error422.telephone}
              >
                <Input />
              </Form.Item>
            </div>

            <div className="col-md-6 col-lg-4">
              <Form.Item
                label="کد پستی "
                name="postcode"
                rules={[
                  {
                    required: true,
                    message: 'لطفا کد پستی  را وارد کنید!',
                  },
                ]}
                validateStatus={error422.postcode ? 'error' : 'success'}
                help={error422.postcode}
              >
                <Input />
              </Form.Item>
            </div>

            <div className="col-md-6 col-lg-4">
              <Form.Item
                label="استان"
                name="province"
                rules={[
                  {
                    required: true,
                    message: 'لطفا استان را انتخاب کنید!',
                  },
                ]}
              >
                <Select
                  loading={stateLoading}
                  showSearch
                  onChange={(e) => {
                    form.setFieldValue('city_id', null);
                    setSelectedState(e);
                  }}
                  fieldNames={{ label: 'name', value: 'id' }}
                  options={stateList}
                  allowClear
                  filterOption={(input, option) => {
                    return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase());
                  }}
                />
              </Form.Item>
            </div>
            <div className="col-md-6 col-lg-4">
              <Form.Item
                label="شهر"
                name="city_id"
                rules={[
                  {
                    required: true,
                    message: 'لطفا شهر را انتخاب کنید!',
                  },
                ]}
              >
                <Select
                  showSearch
                  loading={cityLoading}
                  fieldNames={{ label: 'name', value: 'id' }}
                  options={cityList}
                  allowClear
                  filterOption={(input, option) => {
                    return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase());
                  }}
                />
              </Form.Item>
            </div>
            <div className="col-md-6 col-lg-4">
              <Form.Item
                label="مدیر"
                name="manager_id"
                rules={[
                  {
                    required: true,
                    message: 'لطفا مدیر را انتخاب کنید!',
                  },
                ]}
                validateStatus={error422.managers ? 'error' : 'success'}
                help={error422.managers}
              >
                <Select
                  showSearch
                  fieldNames={{ label: 'name', value: 'id' }}
                  options={managerList}
                  allowClear
                  filterOption={(input, option) => {
                    return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase());
                  }}
                />
              </Form.Item>
            </div>
            <div className="col-md-6 col-lg-4">
              <Form.Item
                label="آدرس کامل"
                name="address_1"
                rules={[
                  {
                    required: true,
                    message: 'لطفا آدرس کامل را وارد کنید!',
                  },
                ]}
                validateStatus={error422.managers ? 'error' : 'success'}
                help={error422.managers}
              >
                <Input.TextArea />
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

export default UpdateCreateWarehousesLocation;

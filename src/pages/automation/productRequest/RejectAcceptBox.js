import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Select, Switch } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import Products from '../../../api/http_request/Model/products/Products';
import DynamicIcon from '../../../components/DynamicIcon';
import GetAutomationUserList from '../../../api/http_request/Model/automation/GetRequestProductIdList';
import GetUnitsList from '../../../api/http_request/Model/common/GetUnitsList';
import ShowDetailsOfProductRequest from './ShowDetailsOfProductRequest';


const RejectAcceptBox = ({ data }) => {
  console.log(data);
  const [form] = Form.useForm();
  const [error422, setError422] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [userList, setUserList] = useState([]);
  const [userListLoading, setUserListLoading] = useState(false);
  const [other, setOther] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [unitListLoading, setUnitListLoading] = useState([]);


  useEffect(() => {
    form.setFieldValue('count_request', data.count_request);
    form.setFieldValue('unit', data.unit.id);
    if (other.includes('buyer') && open) {
      GetAutomationUserList(setUserList, setUserListLoading);
    }
  }, [data, other, open]);
  useEffect(() => {
    if (open && other.includes('unit')) {
      GetUnitsList(
        setUnitList,
        setUnitListLoading,
      );
    }

  }, [open, other]);
  useEffect(() => {

    if (selectedStatus.other) {
      setOther(JSON.parse(selectedStatus.other));
    } else {
      setOther([]);
    }


  }, [selectedStatus, open]);


  const showModal = (status) => {
    if (status) {
      setSelectedStatus(status);
    }
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    setError422([]);
    setLoading(true);
    values.status = selectedStatus.id;
    values.tashrifat = values.tashrifat ? 1 : 0;
    Products.request({
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
    }).changeStatusRequestProduct(values, data.id);
  };


  return (<>
      <div className="text-center d-flex gap-1 d-flex justify-content-center">

        {
          data?.next?.map((item) => (
            <div key={item.id} onClick={() => showModal(item)}>
              <IconBtn TooltipText={item.status}
                       btnClass={`${item.color}IconBtn`}
                       icon={<DynamicIcon iconName={item.icon} size={22} />} /></div>

          ))
        }
      </div>


      <Modal
        open={open}
        title={`${selectedStatus.status} درخواست کالا`}
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button key="back" onClick={handleCancel}>
            انصراف
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={() => {
            form.submit();
          }}>
            ثبت
          </Button>,
        ]}
      >
        <ShowDetailsOfProductRequest data={data} />
        {selectedStatus && <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{}}
        >
          {other.includes('anbardar') ?

            <Form.Item
              label="انباردار مربوطه"
              name="anbardar"
              validateStatus={error422.anbardar ? 'error' : 'success'}
              help={error422.anbardar}
              rules={[
                {
                  required: true,
                  message: 'لطفا انباردار مربوطه را وارد کنید!',
                },
              ]}
            >
              <Select options={data?.anbardar} fieldNames={{ label: 'full_name', value: 'id' }} />
            </Form.Item>
            : ''}
          {other.includes('show_count') ?

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
              <InputNumber controls={false} html className="w-100" />
            </Form.Item>
            : ''}
          {other.includes('unit') ?

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
            : ''}


          {other.includes('buyer') ? <Form.Item
            validateStatus={error422.buyer ? 'error' : 'success'}
            help={error422.buyer}
            label="مسئول خرید"
            name="buyer"
          >
            <Select
              allowClear
              loading={userListLoading}
              fieldNames={{ label: 'name', value: 'id' }}
              options={userList}
              filterOption={(input, option) => {
                return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase());
              }}
            />
          </Form.Item> : ''}


          {other.includes('tashrifat') ? <Form.Item
            validateStatus={error422.tashrifat ? 'error' : 'success'}
            help={error422.tashrifat}
            label="وضعیت تشریفات"
            name="tashrifat"
            valuePropName="checked"
          >

            <Switch checkedChildren="با تشریفات" unCheckedChildren="بدون تشریفات" />

          </Form.Item> : ''}


          <Form.Item name="description" label="توضیحات">
            <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} />
          </Form.Item>


        </Form>
        }

      </Modal>
    </>
  );
};


export default RejectAcceptBox;


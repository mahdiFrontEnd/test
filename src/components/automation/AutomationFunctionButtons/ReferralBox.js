import React, { useEffect, useState } from 'react';

import { Button, Form, Modal, Select, Switch } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { IoPersonOutline } from 'react-icons/io5';
import { FaUserMinus } from 'react-icons/fa';
import { hasPermission } from '../../../permission/module';
import IconBtn from '../../MicroComponents/button/IconBtn';
import Automation from '../../../api/http_request/Model/automation/Automation';
import CurrencyInputComponent from '../../MicroComponents/CurrencyInputComponent';
import CKEditorComponent from '../../MicroComponents/ckEditor/CKEditorComponent';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import GetAutomationUserList from '../../../api/http_request/Model/automation/automationUserList';

const ReferralBox = ({ rowData, inDetail }) => {
  const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isCashier, setIsCashier] = useState(`automation_${automationAddress}` === 'automation_payment');
  const [automationUserList, setAutomationUserList] = useState([]);
  const [automationUserListLoading, setAutomationUserListLoading] = useState(true);
  const [error422, setError422] = useState([]);


  useEffect(() => {
    if (open) {
      setAutomationUserListLoading(true);
      GetAutomationUserList(setAutomationUserList, setAutomationUserListLoading, {
        ignore_my_name: true,
        is_cashier: isCashier ? 1 : 0,
      }, true);
    }
  }, [isCashier, open]);


  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };


  const onFinish = (values) => {
    console.log(values);
    setError422([]);
     setLoading(true);
    if (values?.refer?.includes('all')) {
      values.refer = automationUserList
        .filter(user => user.id !== 'all') // Exclude the "all" option
        .map(user => user.id); // Map to IDs only
    }


    Automation.request({
      success: (res) => {
        handleCancel();
        form.resetFields();
        toast.success(res.message);
        dispatch(getAgainHandler());
      }, error: (response) => {
        if (response?.status === 422) {
          setError422(response?.response?.data?.errors);
        } else {
          toast.error(response?.message);
        }

      }, final: () => {
        setLoading(false);
      },
    }).Refer(`automation_${automationAddress}`, rowData.id, values);


  };
  const onFinishFailed = (x) => {
    console.log(x);
  };
  return (
    <>
      {hasPermission(`automation_${automationAddress}`, ['create']) && (<div onClick={showModal}>
          {
            inDetail ?
              <Button className="defBtn orangeBtn"><span>ارجاع</span></Button>
              :
              <div onClick={showModal}>
                <div className="d-none d-md-block">
                  <IconBtn TooltipText="ارجاع" btnClass="blueIconBtn"
                           icon={<IoPersonOutline size={22} />} />
                </div>
                <div className="d-md-none" style={{ width: '160px' }}>
                  <Button className="text-black d-flex align-items-center gap-2 px-0" type="link">
                    {/*<i className="bi bi-person-fill-dash fs-4 blueText"></i>*/}
                    <span className="blueText">
                      <FaUserMinus size={22} />
                    </span>


                    <span>ارجاع</span></Button>
                </div>
              </div>
          }

        </div>


      )}


      <Modal
        width={700}
        open={open}
        title="ارجاع"
        onCancel={handleCancel}
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
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >

          {`automation_${automationAddress}` === 'automation_payment' &&
            <div className="d-flex justify-content-end">
              <Switch
                checkedChildren="تنخواه"
                unCheckedChildren="همه"
                defaultChecked={isCashier}
                onChange={(e) => {
                  setIsCashier(e);
                }}
              />
            </div>
          }


          <Form.Item
            validateStatus={error422.refer ? 'error' : 'success'}
            help={error422.refer}
            label="ارجاع به"
            name="refer"
            rules={[
              {
                required: true,
                message: 'لطفا شخص مد نظر را انتخاب  کنید!',
              },
            ]}
          >
            <Select mode="multiple" allowClear
                    loading={automationUserListLoading}
                    fieldNames={{ label: 'name', value: 'id' }}
                    options={automationUserList}
                    filterOption={(input, option) => {
                      return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase());
                    }}
            />


          </Form.Item>
          {`automation_${automationAddress}` === 'automation_payment' && <Form.Item

            validateStatus={error422.price ? 'error' : 'success'}
            help={error422.price || 'در صورت تغییر مبلغ ، مبلغ جدید را وارد کنید.'}
            label="مبلغ"
            name="price"

          >
            <CurrencyInputComponent
              onChange={(value) => form.setFieldValue('price', value)}
              className="form-control"
            />
          </Form.Item>}
          <Form.Item
            validateStatus={error422.body ? 'error' : 'success'}
            help={error422.body}
            label="متن"
            name="body"

          >

            <CKEditorComponent getData={(e) => form.setFieldValue('body', e)} useDefWord />

          </Form.Item>


        </Form>

      </Modal>


    </>

  );
};

export default ReferralBox;

import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Modal, Select, Space, Switch, TimePicker } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as IBAN from 'iban';
import { LuPlus } from 'react-icons/lu';
import { hasPermission } from '../../../permission/module';
import IconBtn from '../../MicroComponents/button/IconBtn';
import GetAutomationCompanyList from '../../../api/http_request/Model/automation/automationCompanyList';
import Uploader from '../../MicroComponents/Uploader';
import Automation from '../../../api/http_request/Model/automation/Automation';
import GetAutomationUserList from '../../../api/http_request/Model/automation/automationUserList';
import { automationType } from '../../../api/common';
import CurrencyInputComponent from '../../MicroComponents/CurrencyInputComponent';
import MultiDatePicker from '../../datePicker/MultiDatePicker';
import UpdateCreateCompanies from '../company/UpdateCreateCompanies';
import CKEditorComponent from '../../MicroComponents/ckEditor/CKEditorComponent';
import { checkCodeMeli } from '../../../helper/CheckCodeMeli';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';

const format = 'HH:mm';

const AutomationAddModal = ({ address, title }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [companyListLoading, setCompanyListLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userListLoading, setUserListLoading] = useState(false);
  const [typeList, setTypeList] = useState([]);
  const [typeListLoading, setTypeListLoading] = useState(false);
  const [typeSubject, setTypeSubject] = useState('');
  const [dates, setDates] = useState([]);
  const [allDates, setAllDates] = useState([]);
  const [getAgainCompanies, setGetAgainCompanies] = useState(true);
  const [attachments, setAttachments] = useState([]);
  const dispatch = useDispatch();
  const [error422, setError422] = useState([]);
  const [payType, setPayType] = useState(false);
  const [destinationType, setDestinationType] = useState(false);


  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  useEffect(() => {
    setError422({});
    if (open) {
      if (!userList.length) {
        GetAutomationUserList(setUserList, setUserListLoading, {}, true);
      }

      if (!typeList.length && address === 'automation_request') {
        automationType((result) => {
          setTypeList(result);
        }, setTypeListLoading);
      }
    }
  }, [open]);
  useEffect(() => {
    if (open) {
      GetAutomationCompanyList(setCompanyList, setCompanyListLoading);
    }
  }, [open, getAgainCompanies]);
  const onFinish = (values) => {
    if (['automation_payment'].includes(address)) {
      values.target_type = values.target_type ? 1 : 2;
      values.pay_type = values.pay_type ? 'cheque' : 'cash';
    }

    ["cc","to"].map((item)=>{
      if (values[item]?.includes('all')) {
        values[item] = userList
          .filter(user => user.id !== 'all') // Exclude the "all" option
          .map(user => user.id); // Map to IDs only
      }
      return values
    })



    const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    if (values.start_time) {

      values.start_time = formatter.format(values.start_time);
    }
    if (values.end_time) {

      values.end_time = formatter.format(values.end_time);
    }


    if (values.start_time > values.end_time) {
      setError422({ time: 'زمان شروع باید از زمان پایان کوچکتر باشد.' });
      return;
    }


    setError422([]);
    values.attachments = attachments;
    values.start_date = dates[0]?.toUnix() || '';
    values.end_date = dates[1]?.toUnix() || '';


    values.dates =
      allDates.length > 1
        ? allDates.map((item) => item.toUnix())
        : dates.map((item) => item.toUnix());

    if (dates.length) {
      values.start_date = dates[0]?.toUnix() || '';
      values.end_date = dates[1]?.toUnix() || '';
    }


    setLoading(true);
    Automation.request({
      beforeSend: () => {
      },
      success: (res) => {
        handleCancel();
        form.resetFields();
        setDates([]);
        setAllDates([]);
        dispatch(getAgainHandler());
        toast.success(res.message);
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
    }).addAutomation(address, values);
  };
  return (
    <>
      {hasPermission(address, ['create']) && (
        <IconBtn btnClass="greenIconBtn" icon={<LuPlus size={22} />} onClick={showModal} />
      )}

      <Modal
        open={open}
        title={title}
        onCancel={handleCancel}
        width="1200px"
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
          layout="vertical"
          name="basic"
          form={form}
          initialValues={{ no_salary: false, target_type: false, pay_type: false }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="row">
            {[
              'automation_correspondence',
              'automation_payment',
              'automation_received_letter',
              'automation_report',
              'automation_sent_letter',
            ].includes(address) && (
              <div className="col-md-6">
                <Form.Item
                  label="موضوع"
                  name="subject"
                  validateStatus={error422.subject ? 'error' : 'success'}
                  help={error422.subject}
                  rules={[{ required: true, message: 'لطفا  موضوع را وارد کنید!' }]}
                >
                  <Input />
                </Form.Item>
              </div>
            )}
            {['automation_received_letter', 'automation_sent_letter'].includes(address) && (
              <div className="col-md-6">
                <Form.Item
                  validateStatus={error422.company_id ? 'error' : 'success'}
                  help={error422.company_id}
                  label="شرکت"
                  name="company_id"
                  rules={[
                    {
                      required: true,
                      message: 'لطفا شرکت را انتخاب کنید!',
                    },
                  ]}
                >
                  <Space.Compact
                    style={{
                      width: '100%',
                    }}
                  >
                    <Select
                      loading={companyListLoading}
                      fieldNames={{ label: 'name', value: 'id' }}
                      options={companyList}
                      showSearch
                      onChange={(e) => {
                        form.setFieldValue('company_id', e);
                      }}
                      filterOption={(input, option) => {
                        return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase());
                      }}
                    />
                    <UpdateCreateCompanies
                      finishEvent={() => {
                        setGetAgainCompanies(!getAgainCompanies);
                      }}
                    />
                  </Space.Compact>
                </Form.Item>
              </div>
            )}
            {[
              'automation_received_letter',
              'automation_report',
              'automation_correspondence',
            ].includes(address) && (
              <div className="col-md-6">
                <Form.Item
                  validateStatus={error422.to ? 'error' : 'success'}
                  help={error422.to}
                  label="ارسال به"
                  name="to"
                  rules={[
                    {
                      required: true,
                      message: 'فیلد ارسال الزامی است!',
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    loading={userListLoading}
                    fieldNames={{ label: 'name', value: 'id' }}
                    options={userList}
                    filterOption={(input, option) => {
                      return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase());
                    }}
                  />
                </Form.Item>
              </div>
            )}
            {[
              'automation_received_letter',
              'automation_report',
              'automation_correspondence',
            ].includes(address) && (
              <div className="col-md-6">
                <Form.Item
                  validateStatus={error422.cc ? 'error' : 'success'}
                  help={error422.cc}
                  label="رونوشت"
                  name="cc"
                >
                  <Select
                    mode="multiple"
                    allowClear
                    loading={userListLoading}
                    fieldNames={{ label: 'name', value: 'id' }}
                    options={userList}
                    filterOption={(input, option) => {
                      return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase());
                    }}
                  />
                </Form.Item>
              </div>
            )}

            {['automation_request'].includes(address) && (
              <div className="col-md-6">
                <Form.Item
                  label="موضوع"
                  name="type"
                  validateStatus={error422.type ? 'error' : 'success'}
                  help={error422.type}
                  rules={[
                    {
                      required: true,
                      message: 'لطفا  موضوع را انتخاب کنید!',
                    },
                  ]}
                >
                  <Select
                    loading={typeListLoading}
                    fieldNames={{ label: 'name', value: 'value' }}
                    options={typeList}
                    dropdownStyle={{ overFlow: 'auto' }}
                    onChange={(e) => {
                      form.resetFields();
                      setAllDates([]);
                      setDates([]);
                      setAttachments([]);
                      setTypeSubject(e);
                      form.setFieldValue('type', e);
                    }}
                  />
                </Form.Item>
              </div>
            )}

            {['automation_request'].includes(address) &&
              ['hourly_vacations', 'daily_vacations'].includes(typeSubject) && (
                <div className="col-md-6">
                  <Form.Item
                    validateStatus={error422.no_salary ? 'error' : 'success'}
                    help={error422.no_salary}
                    label="بدون حقوق"
                    name="no_salary"
                    valuePropName="checked"
                  >
                    <Checkbox />
                  </Form.Item>
                </div>
              )}

            {['automation_request'].includes(address) &&
              ['mission', 'mission_in_city'].includes(typeSubject) && (
                <div className="col-md-6">
                  <Form.Item
                    validateStatus={error422.destination ? 'error' : 'success'}
                    help={error422.destination}
                    label="مقصد"
                    name="destination"
                    rules={[
                      {
                        required: true,
                        message: 'لطفا  مقصد را وارد کنید!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              )}
            {['automation_request'].includes(address) &&
              [
                'hourly_vacations',
                'daily_vacations',
                'mission',
                'daily_remote_work',
                'hourly_remote_work',
                'hourly_overtime_remote_work',
                'daily_overtime_remote_work',
                'mission_in_city',
                'overtime',
                'sick_leave',
              ].includes(typeSubject) && (
                <div className="col-md-6">
                  <Form.Item
                    validateStatus={error422.dates ? 'error' : 'success'}
                    help={error422.dates}
                    label="تاریخ"
                    name="dates"
                    rules={[
                      {
                        required: true,
                        message: 'لطفا  تاریخ را وارد کنید!',
                      },
                    ]}
                  >
                    <MultiDatePicker
                      activeAll={[
                        'overtime',
                        'mission',
                        'hourly_overtime_remote_work',
                        'mission_in_city',
                      ].includes(typeSubject)}
                      dates={dates}
                      setDates={(e) => {
                        form.setFieldValue('dates', e);
                        setDates(e);

                      }}
                      setAllDates={(e) => {
                        form.setFieldValue('dates', e);
                        setAllDates(e);
                      }}
                      isMulti={[
                        'daily_vacations',
                        'daily_overtime_remote_work',
                        'mission',
                        'sick_leave',
                        'daily_remote_work',
                      ].includes(typeSubject)}
                    />
                  </Form.Item>
                </div>
              )}
            {['automation_request'].includes(address) &&
              [
                'hourly_vacations',
                'hourly_remote_work',
                'hourly_overtime_remote_work',
                'overtime',
                'mission_in_city',
              ].includes(typeSubject) && (<>
                  <div className="col-md-6">
                    <Form.Item
                      validateStatus={error422.start_time ? 'error' : 'success'}
                      help={error422.start_time}
                      label="زمان شروع"
                      name="start_time"
                      rules={[
                        {
                          required: true,
                          message: 'لطفا زمان شروع را وارد کنید!',
                        },
                      ]}
                    >
                      <TimePicker popupClassName="ltr"
                                  needConfirm={false}
                                  className="w-100"
                                  format={format}
                        // onChange={(e,x)=>{
                        // form.setFieldValue("start_time",x)
                        // }}
                      />
                    </Form.Item>
                  </div>

                  <div className="col-md-6">
                    <Form.Item
                      validateStatus={error422.end_time ? 'error' : 'success'}
                      help={error422.end_time}
                      label=" زمان پایان"
                      name="end_time"
                      rules={[
                        {
                          required: true,
                          message: 'لطفا  زمان پایان را وارد کنید!',
                        },
                      ]}
                    >
                      <TimePicker
                        popupClassName="ltr"
                        changeOnBlur
                        needConfirm={false}
                        className="w-100"
                        format={format}
                        // onChange={(e,x)=>{
                        //   form.setFieldValue("end_time",x)
                        // }}

                      />
                    </Form.Item>
                  </div>


                </>

              )}

            {((['automation_request'].includes(address) && ['imprest'].includes(typeSubject)) ||
              ['automation_payment'].includes(address)) && (
              <div className="col-md-6">
                <Form.Item
                  validateStatus={error422.price ? 'error' : 'success'}
                  help={error422.price}
                  label="مبلغ"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: 'لطفا  مبلغ را وارد کنید!',
                    },
                  ]}
                >
                  <CurrencyInputComponent
                    onChange={(e) => {
                      form.setFieldValue('price', e);
                    }}
                    value={form.getFieldValue('price')}
                  />
                </Form.Item>
              </div>
            )}
            {
              ['automation_payment'].includes(address) && <>
                <div className="col-md-6">
                  <div className="d-flex gap-3">
                    <Form.Item

                      label="نوع پرداخت"
                      name="pay_type"
                      valuePropName="checked"
                    > <Switch
                      onChange={(e) => {
                        setPayType(e);
                        form.setFieldValue('pay_type', e);
                      }}
                      className="w-100" style={{ maxWidth: '100px' }}
                      checkedChildren="پرداخت چکی "
                      unCheckedChildren="پرداخت نقدی" />
                    </Form.Item>

                    <Form.Item className="flex-1"
                               validateStatus={error422.pay_to ? 'error' : 'success'}
                               help={error422.pay_to}
                               label="در وجه"
                               name="pay_to"
                               rules={[
                                 {
                                   required: true,
                                   message: 'لطفا  در وجه را وارد کنید!',
                                 },
                               ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                </div>


                <div className="col-md-6">
                  {
                    !payType ?


                      <Form.Item
                        validateStatus={error422?.sheba ? 'error' : 'success'}
                        help={error422?.sheba}
                        label="شماره شبا"
                        name="sheba"
                        rules={[
                          {
                            required: true,
                            message: 'لطفا  شماره شبا را وارد کنید!',
                          },
                          () => ({
                            validator(x, value) {

                              if (IBAN.isValid(`IR${value}`)) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('لطفا شماره شبا را درست وارد کنید!'));
                            },
                          }),


                        ]}
                      >
                        <Input maxLength={24} className="text-start ltr" addonBefore="IR" />
                      </Form.Item>
                      : <div className="d-flex gap-3">


                        <Form.Item valuePropName="checked"
                                   name="target_type"
                                   label="نوع مقصد"

                        > <Switch onChange={(e) => {
                          setDestinationType(e);
                          form.setFieldValue('target_type', e);
                        }} className="w-100" style={{ maxWidth: '100px' }}
                                  checkedChildren="حقیقی"
                                  unCheckedChildren="حقوقی" /></Form.Item>
                        <Form.Item className="flex-1"
                                   validateStatus={error422.id_number ? 'error' : 'success'}
                                   help={error422.id_number}
                                   label={destinationType ? 'کد ملی' : 'شناسه ملی'}
                                   name="id_number"
                                   maxLength={destinationType ? 10 : 20}
                                   rules={[
                                     {
                                       required: true,
                                       message: 'لطفا شناسه ملی / کد ملی را وارد کنید!',
                                     },
                                     () => ({
                                       validator(x, value) {

                                         if (checkCodeMeli(value) || !destinationType) {
                                           return Promise.resolve();
                                         }
                                         return Promise.reject(new Error('لطفا کد ملی را درست وارد کنید!'));
                                       },
                                     }),
                                   ]}
                        >
                          <Input />
                        </Form.Item></div>}

                </div>


              </>
            }

            <div className="col-md-12">
              <Form.Item
                validateStatus={error422.body ? 'error' : 'success'}
                help={error422.body}
                label={`${
                  ['automation_request'].includes(address) &&
                  ['mission', 'mission_in_city'].includes(typeSubject)
                    ? 'هدف از ماموریت'
                    : 'متن'
                }`}
                name="body"
                rules={[
                  {
                    required:
                      (['automation_request'].includes(address) &&
                        ['mission', 'mission_in_city'].includes(typeSubject)) ||
                      [
                        'automation_correspondence',
                        'automation_payment',
                        'automation_received_letter',
                        'automation_report',
                        'automation_sent_letter',
                      ].includes(address),
                    message: 'لطفا متن را وارد کنید!',
                  },
                ]}
              >
                <CKEditorComponent getData={(e) => form.setFieldValue('body', e)} />
                {/*<Input.TextArea />*/}
              </Form.Item>
            </div>


            <Form.Item
              validateStatus={error422.attachments ? 'error' : 'success'}
              help={error422.attachments}
              name="attachments"
              label="فایل"
              rules={[
                {
                  required:
                    (['automation_request'].includes(address) &&
                      ['sick_leave'].includes(typeSubject)) ||
                    ['automation_payment'].includes(address),
                  message: 'لطفا فایل را وارد کنید!',
                },
              ]}
            >
              <Uploader
                onChangeImage={(e) => {
                  setAttachments(e);
                  form.setFieldValue('attachments', e);
                }}
              />
            </Form.Item>

          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AutomationAddModal;


import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Radio, Select, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import User from '../../../api/http_request/Model/User/User';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import GetAutomationUserList from '../../../api/http_request/Model/automation/automationUserList';
import { setActiveKey } from '../../../store/calendar/calendarSlice';

const CalendarForm = ({ data, handleCancel, isCreate }) => {
  const dispatch = useDispatch();
  const userJson = JSON.parse(Cookies.get('user'));
  const [userList, setUserList] = useState([]);
  const [userListLoading, setUserListLoading] = useState(false);
  const selectedYear = useSelector((state) => state.calendarRedux.selectedYear);
  const selectedMonth = useSelector((state) => state.calendarRedux.selectedMonth);
  const selectedDay = useSelector((state) => state.calendarRedux.selectedDay);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [time, setTime] = useState('09:00');


  useEffect(() => {
    GetAutomationUserList((x) => {
      setUserList([{
        'id': userJson.id, 'name': 'خودم', disabled: true,
      }, ...x]);

    }, setUserListLoading, { ignore_my_name: 1 });
  }, []);
  const onFinish = (values) => {

    values.month = selectedMonth;
    values.day = selectedDay;
    values.year = selectedYear;
    values.time = time;
    values.notification = values.notification ? '1' : '0';

    if (!isCreate && data) {
      values.id = data?.group_id;
    }
    // console.log(values);
    User.request({
      beforeSend: () => {
        setLoading(true);
      }, error: ({ response }) => {

        toast.error(response.data.message);

      }, success: async () => {
        dispatch(setActiveKey(''));
        toast.success('یادداشت شما با موفقیت ثبت شد.');
        dispatch(getAgainHandler());
        form.resetFields();


      }, final: () => {
        setLoading(false);
      },
    }).updateCreateTodo(values, isCreate ? 'add' : 'edit');


  };


  return (<div>

    <Form
      form={form}
      name="dependencies"
      autoComplete="off"
      onFinish={onFinish}
      layout="vertical"
      initialValues={{
        ...data || {},
        priority: '0',
        to: data?.to || [userJson.id] ,
        notification: false,
        time: dayjs(data?.time ?? '09:00', 'HH:mm'),
      }}
    >
      <div className="row">

        <div className="col-md-6">
          <Form.Item label="عنوان" name="title" rules={[{ required: true, message: 'لطفا عنوان را وارد کنید.' }]}>
            <Input />
          </Form.Item>
        </div>
        <div className="col-md-6">

          <Form.Item label="ساعت" name="time" rules={[{ required: true, message: 'لطفا ساعت را وارد کنید.' }]}>
            <TimePicker onChange={(x, c) => {
              setTime(c);
            }} format="HH:mm" needConfirm={false} className="w-100" popupClassName="ltr"
                        defaultValue={dayjs('09:00', 'HH:mm')} />

          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item

            label="نمایش و ارجاع به"
            name="to"
            rules={[{
              required: true, message: 'فیلد نمایش به الزامی است!',
            }]}
          >
            <Select
              defaultValue={[`${userJson.id}`]}
              mode="multiple"

              loading={userListLoading}
              fieldNames={{ label: 'name', value: 'id' }}
              options={userList}
              filterOption={(input, option) => {
                return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase());
              }}
            />
          </Form.Item>


          <Form.Item name="priority">
            <Radio.Group>
              <Radio value="0"> نمایش در سایت به افراد انتخاب شده </Radio>
              <Radio value="1"> نمایش در سایت و ارسال sms یادآوری به افراد انتخاب شده</Radio>
              {/*به خودم*/}
              {/*<Radio value="3">ارسال sms یادآوری به خودم و افراد انتخاب شده </Radio>*/}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="notification"
            valuePropName="checked"
          >
            <Checkbox>ارسال sms اطلاع رسانی به افراد انتخاب شده بعد از ثبت</Checkbox>
          </Form.Item>



        </div>
        <div className="col-md-6">
          <Form.Item label="متن" name="body">
            <Input.TextArea rows={5} />
          </Form.Item>
        </div>


      </div>

      <Form.Item className="mb-0">
        <div className="d-flex justify-content-end gap-2 align-items-center">


          {!isCreate && <Button className="defBtn px-4" onClick={handleCancel}>انصراف</Button>}
          <Button loading={loading} className={`defBtn px-4 ${isCreate ? 'greenBtn' : 'orangeBtn'}`}
                  htmlType="submit">{isCreate ? 'ثبت' : 'ویرایش'}
          </Button>
        </div>
      </Form.Item>


    </Form>
  </div>);
};

export default CalendarForm;
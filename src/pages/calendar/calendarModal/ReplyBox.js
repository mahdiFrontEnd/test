import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import User from '../../../api/http_request/Model/User/User';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';

const ReplyBox = ({ setShowStatus, item }) => {
  const dispatch = useDispatch();
  const calendarDateData = useSelector((state) => state.calendarRedux.calendarDateData);

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // useEffect(() => {

  // console.log(calendarDateData)

  // }, [calendarDateData]);
  const onFinish = (values) => {
    values.id = item.id;
    User.request({
      beforeSend: () => {
        setLoading(true);
      }, error: ({ response }) => {

        toast.error(response.data.message);

      }, success: async () => {
        setShowStatus(true);
        dispatch(getAgainHandler());
        toast.success('یادداشت شما با موفقیت ثبت شد.');


        User.request({}).seenTodo({ id: item.id, type: 'reply' });


      }, final: () => {
        setLoading(false);
      },
    }).replyTodo(values);


  };


  return (
    <div>
      <Form
        form={form}
        name="dependencies"
        autoComplete="off"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ body: calendarDateData[0]?.reply[0]?.body ?? '' }}

      >
        <Form.Item label="متن" name="body">
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item className="mb-0">
          <div className="d-flex justify-content-end gap-2 align-items-center">
            <Button onClick={() => setShowStatus(true)} className="defBtn px-4"
            >انصراف
            </Button>
            <Button loading={loading} className="defBtn px-4 greenBtn"
                    htmlType="submit">ثبت
            </Button>
          </div>
        </Form.Item>


      </Form>
    </div>
  );
};

export default ReplyBox;
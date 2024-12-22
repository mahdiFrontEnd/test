import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Form, Input, Modal } from 'antd';
import { toast } from 'react-toastify';
import User from '../../api/http_request/Model/User/User';
import { getAgainHandler } from '../../store/loading/LoadingSlice';
import UploadCrop from '../../components/MicroComponents/UploadCrop';


const UpdateProfileModal = ({ data }) => {
  const dispatch = useDispatch();

  // const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [defaultImage, setDefaultImage] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [profileData, setProfileData] = useState(data);
  const [error422, setError422] = useState([]);


  useEffect(() => {
    setProfileData(data);
    form.setFieldsValue(data);
  }, [data, open]);
  useEffect(() => {
    setDefaultImage(profileData.image && [{
      url: profileData.image,
    }]);
    setError422([]);
  }, [profileData, open]);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };


  const onFinish = (values) => {
    values.image = image;
    setError422([]);
    User.request({

      beforeSend: () => {
        setLoading(true);
      }, success: (res) => {
        handleCancel();
        dispatch(getAgainHandler());
        toast.success(res.message);
      }, error: ({ response }) => {
        if (response?.status === 422) {
          setError422(response?.data?.errors);
        } else {
          toast.error(response?.data?.message);
        }

      }, final: () => {
        setLoading(false);
      },
    }).profileUpdate(values);
  };
  // validateFields();
  // const validationErrors = Object.values(getFieldsError());
  //
  // if (!validationErrors.find(e => e === undefined)) dispatch(submitFormData());


  return (<>
      <Button onClick={showModal} className="defBtn orangeBtn">ویرایش پروفایل</Button>


      <Modal
        width={900}
        open={open}
        title="ویرایش پروفایل"
        onCancel={handleCancel}
        footer={[<Button key="back" onClick={handleCancel}>
          انصراف
        </Button>, <Button key="submit" type="primary" loading={loading} onClick={() => {
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
          initialValues={profileData || {}}
        >

          <div className="row">

            <div className="col-md-2 d-flex align-items-center justify-content-center ">
              <Form.Item name="image" valuePropName="fileList"
                         validateStatus={error422.image ? 'error' : 'success'}
                         help={error422.image}>

                <UploadCrop accept=".jpg , .png , .gif" name="user" defaultFile={defaultImage} onChangeImage={(e) => {
                  setImage(e[0]);
                  form.setFieldValue('image', e[0]);
                }} count={1}
                            listType="picture-circle" />
              </Form.Item></div>

            <div className=" col-md-10">
              <div className="row">
                <div className="col-md-6"><Form.Item
                  validateStatus={error422.first_name ? 'error' : 'success'}
                  help={error422.first_name}
                  label="نام"
                  name="first_name"

                  rules={[{
                    required: true, message: 'لطفا نام را وارد کنید!',
                  },


                  ]}
                >
                  <Input />


                </Form.Item></div>
                <div className="col-md-6"><Form.Item
                  validateStatus={error422.last_name ? 'error' : 'success'}
                  help={error422.last_name}
                  label="نام خانوادگی"
                  name="last_name"
                  rules={[{
                    required: true, message: 'لطفا نام را وارد کنید!',
                  }]}
                >
                  <Input />


                </Form.Item></div>
                <div className="col-md-6"><Form.Item
                  validateStatus={error422.mobile ? 'error' : 'success'}
                  help={error422.mobile}
                  label="تلفن همراه"
                  name="mobile"
                  // rules={[{
                  //   required: true, message: 'لطفا تلفن همراه  را وارد کنید!',
                  // }]}
                >
                  <Input disabled/>


                </Form.Item></div>
                <div className="col-md-6"><Form.Item
                  label="نام کاربری"
                  validateStatus={error422.username ? 'error' : 'success'}
                  help={error422.username}
                  name="username">
                  <Input disabled/>
                </Form.Item></div>


                {/*<div className="col-md-6"><Form.Item*/}
                {/*  label="ایمیل"*/}
                {/*  validateStatus={error422.email ? 'error' : 'success'}*/}
                {/*  help={error422.email}*/}
                {/*  name="email">*/}
                {/*  <Input />*/}
                {/*</Form.Item></div>*/}
              </div>

            </div>
          </div>


        </Form>

      </Modal>


    </>

  );
};


export default UpdateProfileModal;
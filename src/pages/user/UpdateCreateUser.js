import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Checkbox, Form, Input, Modal, Select } from 'antd';
import { toast } from 'react-toastify';
import { FiEdit } from 'react-icons/fi';
import { LuPlus } from 'react-icons/lu';
import { IoTrashOutline } from 'react-icons/io5';
import { hasPermission } from '../../permission/module';
import { getAgainHandler } from '../../store/loading/LoadingSlice';
import IconBtn from '../../components/MicroComponents/button/IconBtn';
import Uploader from '../../components/MicroComponents/Uploader';
import PasswordCheck from '../../components/MicroComponents/PasswordCheck';
import User from '../../api/http_request/Model/User/User';
import TreeComponents from '../../components/MicroComponents/TreeComponents';
// import GetSectionList from '../../api/http_request/Model/common/GetSectionList';
// import GetPositionJobList from '../../api/http_request/Model/common/GetPositionJobList';

const UpdateCreateUser = ({ rowData, permissionList, roleList, managerList }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [image, setImage] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [error422, setError422] = useState([]);
  // const [sectionList, setSectionList] = useState([]);
  // const [selectedSection, setSelectedSection] = useState();
  // const [selectedPositionsJob, setSelectedPositionsJob] = useState([]);
  // const [sectionLoading, setSectionLoading] = useState(false);
  // const [jobPositionList, setJobPositionList] = useState([]);
  // const [jobPositionLoading, setJobPositionLoading] = useState(false);
  const [fields, setFields] = useState([]);
  // useEffect(() => {
  //   if (open) {
  //     if (!sectionList.length) {
  //       GetSectionList(
  //         (e) => {
  //           setSectionList(e);
  //           // setSectionList([{ name: 'سر دسته ندارد', id: '0' }, ...e]);
  //         },
  //         setSectionLoading,
  //         'user',
  //       );
  //     }
  //
  //     setError422([]);
  //   }
  // }, [open]);
  // useEffect(() => {
  //   if (selectedSection?.id) {
  //     form.setFieldValue('job_positions', []);
  //     setJobPositionList([]);
  //     GetPositionJobList(setJobPositionList, setJobPositionLoading, {
  //       section_id: selectedSection?.id,
  //     });
  //
  //     setError422([]);
  //   }
  // }, [selectedSection?.id]);

  useEffect(() => {
    if (rowData) {
      const x = [];
      rowData.user_sections?.map(({ section_id, section_name, job_positions }) => {

        return x.push({ section: { id: section_id, name: section_name }, job_positions });
      });
      setFields(x);
      form.setFieldsValue(rowData);
      const ValueArray = rowData?.roles?.map((item) => {
        return item.id;
      });
      form.setFieldValue('roles', ValueArray);
      form.setFieldValue('change_password', false);
      setCheckedKeys(rowData?.permissions);
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
    const x = [];

    // if (fields.length) {
      // eslint-disable-next-line array-callback-return
      fields.map((item) => {
        // eslint-disable-next-line no-unused-expressions
        x.push({
          section_id: item?.section?.id,
          job_positions: item.job_positions.map((i) => {
            return i.id;
          }),
        });
      });
      values.user_sections = x;
      setError422([]);
      setLoading(true);
      values.activated = !!values.activated;
      // eslint-disable-next-line prefer-destructuring
      values.image = image;
      User.request({
        beforeSend: () => {
        },
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
      }).updateCreateUser(values, rowData ? 'put' : 'post', rowData?.id);
    // } else {
    //   setError422({
    //     section_positions:
    //       'لطفا بخش های مربوطه و سمت شغلی را انتخاب کنید و دکمه اضافه کردن را بزنید! ',
    //   });
    // }
  };

  const onFinishFailed = () => {
  };
  // const add = () => {
  //   if (!selectedPositionsJob.length) {
  //     setError422({ job_positions: 'لطفا سمت شغلی را انتخاب کنید! ' });
  //   }
  //   if (!selectedSection) {
  //     setError422({ section_id: 'لطفا بخش های مربوطه را انتخاب کنید! ' });
  //   }
  //   if (selectedPositionsJob.length && selectedSection) {
  //     let newFields = [...fields];
  //
  //     const x = newFields.findIndex(
  //       (item) =>
  //         JSON.stringify(item) ===
  //         JSON.stringify({ section: selectedSection, job_positions: selectedPositionsJob }),
  //     );
  //     if (x === -1) {
  //       newFields = [
  //         ...newFields,
  //         { section: selectedSection, job_positions: selectedPositionsJob },
  //       ];
  //     }
  //
  //     setFields(newFields);
  //
  //     form.setFieldValue('job_positions', []);
  //     form.setFieldValue('section_id', null);
  //   }
  // };
  const remove = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
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
        width={1000}
        open={open}
        title={`${rowData ? 'ویرایش' : 'ایجاد'}  کاربر `}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            انصراف
          </Button>,
          <Button
            disabled={disabled}
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
          initialValues={rowData || { sections: [{}] }}
          onFinishFailed={onFinishFailed}
        >
          <div className="row">
            <div className="col-md-6 col-lg-4  ">
              <Form.Item
                name="image"
                valuePropName="fileList"
                validateStatus={error422.image ? 'error' : 'success'}
                help={error422.image}
              >
                <Uploader
                  name="user"
                  onChangeImage={(e) => {
                    setImage(e[0]);
                    form.setFieldValue('image', e[0]);
                  }}
                  count={1}
                  listType="picture-circle"
                />
              </Form.Item>
            </div>
            <div className="col-md-6 col-lg-4">
              <Form.Item
                label="نام"
                name="first_name"
                rules={[
                  {
                    required: true,
                    message: 'لطفا نام را وارد کنید!',
                  },
                ]}
                validateStatus={error422.first_name ? 'error' : 'success'}
                help={error422.first_name}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6 col-lg-4">
              <Form.Item
                label="نام خانوادگی"
                name="last_name"
                rules={[
                  {
                    required: true,
                    message: 'لطفا نام خانوادگی را وارد کنید!',
                  },
                ]}
                validateStatus={error422.last_name ? 'error' : 'success'}
                help={error422.last_name}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6 col-lg-4">
              <Form.Item
                label="تلفن همراه"
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: 'لطفا تلفن همراه را وارد کنید!',
                  },
                ]}
                validateStatus={error422.mobile ? 'error' : 'success'}
                help={error422.mobile}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6 col-lg-4">
              <Form.Item
                validateStatus={error422.email ? 'error' : 'success'}
                help={error422.email}
                label="ایمیل"
                name="email"
              >
                <Input />
              </Form.Item>
            </div>

            <div className="col-md-6 col-lg-4">
              <Form.Item
                label="نام کاربری"
                name="username"
                validateStatus={error422.username ? 'error' : 'success'}
                help={error422.username}
                rules={[
                  {
                    required: true,
                    message: 'لطفا نام کاربری را وارد کنید!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6 col-lg-4">
              <Form.Item
                label="نقش"
                name="roles"
                validateStatus={error422.roles ? 'error' : 'success'}
                help={error422.roles}
                rules={[
                  {
                    required: true,
                    message: 'لطفا نقش را انتخاب کنید!',
                  },
                ]}
              >
                <Select
                  fieldNames={{ label: 'name', value: 'id' }}
                  options={roleList}
                  mode="multiple"
                  allowClear
                  filterOption={(input, option) => {
                    return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase());
                  }}
                />
              </Form.Item>
            </div>
            <div className="col-md-6 col-lg-4">
              <Form.Item
                label="مدیران"
                name="managers"
                rules={[
                  {
                    required: true,
                    message: 'لطفا مدیران را انتخاب کنید!',
                  },
                ]}
                validateStatus={error422.managers ? 'error' : 'success'}
                help={error422.managers}
              >
                <Select
                  fieldNames={{ label: 'name', value: 'id' }}
                  options={managerList}
                  mode="multiple"
                  allowClear
                  filterOption={(input, option) => {
                    return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase());
                  }}
                />
              </Form.Item>
            </div>

            <div className="col-md-5 ">
              <Form.Item
                validateStatus={error422.permissions ? 'error' : 'success'}
                help={error422.permissions}
                label="سطح دسترسی"
                name="permissions"
              >
                <TreeComponents
                  valueArray={checkedKeys}
                  treeData={permissionList}
                  onChange={(result) => {
                    form.setFieldValue('permissions', result);
                    setCheckedKeys(result);
                  }}
                />
              </Form.Item>
            </div>

            <div className="col-md-7">
              <div>
                <div className=" d-flex gap-1 flex-wrap  mt-4  ">
                  <Form.Item
                    name="activated"
                    valuePropName="checked"
                    validateStatus={error422.activated ? 'error' : 'success'}
                    help={error422.activated}
                  >
                    <Checkbox>فعال</Checkbox>
                  </Form.Item>
                  <Form.Item
                    name="is_automation"
                    valuePropName="checked"
                    validateStatus={error422.permissions ? 'error' : 'success'}
                    help={error422.is_automation}
                  >
                    <Checkbox>اتوماسیون</Checkbox>
                  </Form.Item>
                  <Form.Item
                    name="is_cashier"
                    valuePropName="checked"
                    validateStatus={error422.is_cashier ? 'error' : 'success'}
                    help={error422.is_cashier}
                  >
                    <Checkbox>تنخواه</Checkbox>
                  </Form.Item>
                  <Form.Item
                    name="is_expert"
                    valuePropName="checked"
                    validateStatus={error422.is_expert ? 'error' : 'success'}
                    help={error422.is_expert}
                  >
                    <Checkbox>کارشناس</Checkbox>
                  </Form.Item>
                  {rowData && (
                    <Form.Item
                      name="change_password"
                      valuePropName="checked"
                      validateStatus={error422.change_password ? 'error' : 'success'}
                      help={error422.change_password}
                    >
                      <Checkbox
                        value={changePassword}
                        onChange={(e) => {
                          setChangePassword(e.target.checked);
                          if (!e.target.checked) {
                            setDisabled(false);
                          }
                        }}
                      >
                        تغییر کلمه عبور
                      </Checkbox>
                    </Form.Item>
                  )}
                </div>
              </div>
              {(changePassword || !rowData) && (
                <div className="justify-content-between flex-wrap   d-flex">
                  <div className="">
                    <Form.Item
                      label="رمز عبور"
                      name="password"
                      validateStatus={error422.password ? 'error' : 'success'}
                      help={error422.change_password}
                    >
                      <Input.Password className="text-center ltr"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </Form.Item>
                    <Form.Item
                      label="تکرار رمز عبور"
                      name="password_confirmation"
                      validateStatus={error422.password_confirmation ? 'error' : 'success'}
                      help={error422.change_password}
                    >
                      <Input.Password className="text-center ltr"
                        onChange={(e) => setPassword2(e.target.value)}
                        value={password2}
                        defaultValue={rowData?.password}
                      />
                    </Form.Item>
                  </div>
                  <div className=" mt-4">
                    <PasswordCheck
                      password={password}
                      password2={password2}
                      setDisabled={setDisabled}
                      value={password}
                      valueAgain={password2}
                    />
                  </div>
                </div>
              )}

              <div>
                {/*<div className="d-flex gap-2 align-items-center">*/}
                {/*<div className="flex-1">*/}
                {/*  <Form.Item*/}
                {/*    name="section_id"*/}
                {/*    label="بخش"*/}
                {/*    validateStatus={error422.section_id ? 'error' : 'success'}*/}
                {/*    help={error422.section_id}*/}
                {/*    // rules={[*/}
                {/*    //   {*/}
                {/*    //     required: true,*/}
                {/*    //     message: 'لطفا بخش های مربوطه را انتخاب کنید!',*/}
                {/*    //   },*/}
                {/*    // ]}*/}
                {/*  >*/}
                {/*    <TreeSelect*/}
                {/*      onChange={(e, x) => {*/}
                {/*        setError422({});*/}
                {/*        setSelectedSection({*/}
                {/*          id: e,*/}
                {/*          name: x[0],*/}
                {/*        });*/}
                {/*      }}*/}
                {/*      showSearch*/}
                {/*      filterTreeNode={(search, item) => {*/}
                {/*        return item?.name.toLowerCase().indexOf(search.toLowerCase()) >= 0;*/}
                {/*      }}*/}
                {/*      loading={sectionLoading}*/}
                {/*      fieldNames={{ label: 'name', value: 'id', children: 'childs' }}*/}
                {/*      allowClear*/}
                {/*      treeData={sectionList}*/}
                {/*    />*/}
                {/*  </Form.Item>*/}
                {/*</div>*/}

                {/*<div className="flex-1">*/}
                {/*  <Form.Item*/}
                {/*    name="job_positions"*/}
                {/*    label="سمت شغلی"*/}
                {/*    // rules={[*/}
                {/*    //   {*/}
                {/*    //     required: true,*/}
                {/*    //     message: 'لطفا سمت شغلی را انتخاب کنید!',*/}
                {/*    //   },*/}
                {/*    // ]}*/}
                {/*    validateStatus={error422.job_positions ? 'error' : 'success'}*/}
                {/*    help={error422.job_positions}*/}
                {/*  >*/}
                {/*    <Select*/}
                {/*      showSearch*/}
                {/*      filterOption={(input, option) => {*/}
                {/*        return (option?.name.toLowerCase() ?? '').includes(input.toLowerCase());*/}
                {/*      }}*/}
                {/*      onChange={(e, x) => {*/}
                {/*        setSelectedPositionsJob(x);*/}
                {/*        setError422({});*/}
                {/*      }}*/}
                {/*      value={selectedPositionsJob}*/}
                {/*      options={jobPositionList}*/}
                {/*      loading={jobPositionLoading}*/}
                {/*      mode="multiple"*/}
                {/*      fieldNames={{ label: 'name', value: 'id' }}*/}
                {/*      allowClear*/}
                {/*    />*/}
                {/*  </Form.Item>*/}
                {/*</div>*/}
                {/*<IconBtn*/}
                {/*  onClick={() => add()}*/}
                {/*  color="blueIconBtn mt-2"*/}
                {/*  iconClass="bi-plus d-flex fs-3"*/}
                {/*/>*/}
                {/*</div>*/}
                <p className="text-danger">{error422.section_positions}</p>
                {fields.map(({ section, job_positions }, index) => (
                  <div className="d-flex gap-2 align-items-center mb-4">
                    <div className="flex-1">
                      <div className="keyValue">
                        <div className="key">بخش:</div>
                        <div className="value">{section?.name}</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="keyValue">
                        <div className="key">سمت شغلی:</div>
                        <div className="value">
                          {job_positions.map(({ name, id }) => (
                            <div key={id}>{name}</div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <IconBtn
                      btnClass="redIconBtn  "
                      icon={<IoTrashOutline size={20} />}
                      onClick={() => {
                        remove(index);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateCreateUser;

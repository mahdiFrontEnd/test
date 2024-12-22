import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Radio } from 'antd';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { hasPermission } from '../../../permission/module';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import Inventory from '../../../api/http_request/Model/inventory/Inventory';
import Uploader from "../../../components/MicroComponents/Uploader";

const StatusBox = ({ rowData, statusArray ,address}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [statusList, setStatusList] = useState([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const [showFileInput, setShowFileInput] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setStatusList(statusArray);
  }, [statusArray]);
  useEffect(() => {
    const selectedStatus = statusList.find((element) => element.value === status);

    setShowFileInput(selectedStatus?.file_required);
  }, [status]);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = (values) => {
    values.attachments = attachments
    setLoading(true);
    Inventory.request({
      success: (res) => {
        form.resetFields()
        setAttachments([])
        handleCancel();
        dispatch(getAgainHandler());
        toast.success(res.message);
      },
      final: () => {
        setLoading(false);
      },
    }).statusApi(rowData.id, values,address);
  };

  return (
    <>  <div onDoubleClick={(e) => {
      e.stopPropagation()
    }}>
      {hasPermission('inventory_request', ['reject', 'approve']) && (
        <Button className={`defBtn  min-w-100 blueBtn `} onClick={showModal}>
          {rowData?.status_title || 'وضعیت'}
        </Button>
      )}

      <Modal
        open={open}
        title="وضعیت"
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
        <Form name="basic" form={form} onFinish={onFinish} autoComplete="off" layout="vertical">
          <Form.Item
            label=" وضعیت"
            name="status_id"
            rules={[
              {
                required: true,
                message: 'لطفا  وضعیت انتخاب کنید!',
              },
            ]}
          >
            <Radio.Group
              defaultValue="a"
              size="large"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              {statusList.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Radio.Button key={index} value={item.value}>
                  {item.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
          {showFileInput ? (
            <Form.Item
              label=" وضعیت"
              name="status_id"
              rules={[
                {
                  required: true,
                  message: 'لطفا  وضعیت انتخاب کنید!',
                },
              ]}
            >
              <Uploader name='inventory' onChangeImage={(e) => {
                setAttachments(e)
                form.setFieldValue('attachments', e)
              }}/>





            </Form.Item>
          ) : null}

          <Form.Item label="توضیحات" name="body">
            <Input.TextArea rows={4} className="my-4" placeholder="متن" />
          </Form.Item>
        </Form>
      </Modal></div>
    </>
  );
};

export default StatusBox;

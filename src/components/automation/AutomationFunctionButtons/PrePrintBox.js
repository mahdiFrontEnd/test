import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import { BsPrinterFill } from 'react-icons/bs';
import CurrencyInputComponent from '../../MicroComponents/CurrencyInputComponent';
import GetPurchaseBanks from '../../../api/http_request/Model/commerce/getPurchaseBanks';
import { ComponentToPrint } from '../../ComponentToPrint';
import PrintPayment from '../detailbox/PrintPayment';
import Automation from '../../../api/http_request/Model/automation/Automation';
import MultiDatePicker from '../../datePicker/MultiDatePicker';

const PrePrintBox = ({ rowData }) => {

  const componentRefDetailPayment = useRef();
  const [form] = Form.useForm();
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [priceCurrency, setPriceCurrency] = useState('');
  const [banksList, setBanksList] = useState([]);
  const [banksName, setBanksName] = useState('');
  const [error422, setError422] = useState([]);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
    form.resetFields();

  };

  useEffect(() => {
    setError422([]);

  }, [open]);

  useEffect(() => {
    if (open) {
      GetPurchaseBanks(setBanksList, setLoadingBanks);
    }
  }, [open]);


  const showPrint = useReactToPrint({
    content: () => componentRefDetailPayment.current,


  });
  const onFinish = (values) => {

    Automation.request({
      beforeSend: () => {
        setLoading(true);
      }, error: (error) => {
        toast.error(error.response.data.message);
      }, success: async () => {
        showPrint();
        handleCancel();

      }, failed: () => {
      }, final: () => {
        setLoading(false);
      },
    }).addPrePrint(rowData.id, values);


  };

  return (<>


    <Button onClick={showModal}
            className="greenBtn w-100 defBtn "> برگه تاییدیه</Button>


    <Modal open={open} title="پرداخت" onCancel={handleCancel} width={800}
           footer={null}
    >


      <Form name="basic" form={form} layout="vertical" onFinish={onFinish}
            autoComplete="off"
      >
        <div className="row">
          <Form.Item label="مبلغ" name="price"
                     validateStatus={error422.price ? 'error' : 'success'}
                     help={error422.price}
                     rules={[{ required: true, message: 'لطفا مبلغ را وارد کنید!' }]}
          >
            <CurrencyInputComponent onChange={(value) => setPriceCurrency(value)}
                                    className="form-control" />


          </Form.Item>

          <Form.Item label="حساب مبدا" name="bank_id"
                     validateStatus={error422.bank_id ? 'error' : 'success'}
                     help={error422.bank_id}
                     rules={[{ required: true, message: 'لطفا حساب مبدا را وارد کنید!' }]}
          >

            <Select
              loading={loadingBanks}
              fieldNames={{ label: 'title', value: 'id' }}
              options={banksList}
              showSearch
              onChange={(e, x) => {

                setBanksName(x.title);
                form.setFieldValue('bank_id', e);
              }}
              filterOption={(input, option) => {
                return (option?.title.toLowerCase() ?? '').includes(input.toLowerCase());
              }}
            />


          </Form.Item>

          {rowData.pay_type === 'cheque' && <>
            <div className="col-md-6">

              <Form.Item label=" شماره چک" name="cheque_number"
                         validateStatus={error422.cheque_number ? 'error' : 'success'}
                         help={error422.cheque_number}
                         rules={[{ required: true, message: 'لطفا شماره چک را وارد کنید!' }]}
              >

                <Input />


              </Form.Item></div>
            <div className="col-md-6">
              <Form.Item label=" تاریخ چک" name="cheque_date"
                         validateStatus={error422.cheque_date ? 'error' : 'success'}
                         help={error422.cheque_date}
                         rules={[{ required: true, message: 'لطفا تاریخ چک را وارد کنید!' }]}
              >

                <MultiDatePicker activeAll currentDate
                                 onChange={(e) => {

                                   form.setFieldValue('cheque_date', e?.unix ?? null);

                                 }}
                />


              </Form.Item>
            </div>
          </>}


          <div className="d-flex align-items-center justify-content-end gap-2">
            <Button key="back" onClick={handleCancel}>انصراف</Button>


            <Button size="sm" round="true" loading={loading}
                    htmlType="submit" className="defBtn d-flex gap-2 align-items-center blueBtn">
              {/*<i className="fs-4 mt-2 bi bi-printer-fill"></i>*/}
              <BsPrinterFill size={20} />
              <span>ذخیره و پرینت</span>

            </Button>


            <ComponentToPrint ref={componentRefDetailPayment}>

              <PrintPayment detail={rowData} item={{
                bank: { title:banksName },
                price: priceCurrency,
                cheque_number: form.getFieldValue('cheque_number'),
                cheque_date: form.getFieldValue('cheque_date'),
              }} />

            </ComponentToPrint>
          </div>

        </div>
      </Form>


    </Modal>
  </>);
};

export default PrePrintBox;




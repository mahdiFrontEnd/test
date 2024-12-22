import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal, Radio } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { BsCurrencyDollar, BsPrinterFill } from 'react-icons/bs';
import { hasPermission } from '../../../permission/module';
import IconBtn from '../../MicroComponents/button/IconBtn';
import Automation from '../../../api/http_request/Model/automation/Automation';
import CommentsDetail from '../detailbox/comment/Comments';
import Uploader from '../../MicroComponents/Uploader';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import CKEditorComponent from '../../MicroComponents/ckEditor/CKEditorComponent';
import GetListPrePrint from '../../../api/http_request/Model/automation/GetPrePrintList';
import { ConvertToPrice } from '../../../helper/ConvertToPrice';
import ConvertTimestampToDate from '../../../helper/ConvertTimestampToDate';
import { ComponentToPrint } from '../../ComponentToPrint';
import PrintPayment from '../detailbox/PrintPayment';

const PayBox = ({  rowData, inDetail }) => {
  const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);

  const componentRefDetailPayment = useRef();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingPrePrint, setLoadingPrePrint] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPrePay, setSelectedPrePay] = useState();
  const [attachments, setAttachments] = useState([]);
  const [prePrintList, setPrePrintList] = useState([]);
  const [error422, setError422] = useState([]);
  const dispatch = useDispatch();
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
  const onFinish = (values) => {
    values.price = Number(selectedPrePay?.price);
    values.bank_id = selectedPrePay?.bank_id;
    values.attachments = attachments;
    setError422([]);

    setLoading(true);
    Automation.request({
      success: (response) => {

        toast.success(response?.data?.message);
        handleCancel();
        dispatch(getAgainHandler());


      }, error: ({ response }) => {
        if (response?.status === 422) {
          setError422(response?.data?.errors);
        } else {
          toast.error(response?.data?.message);
        }

      }, final: () => {
        setLoading(false);
      },
    }).payAutomationPayment(rowData.id, values);


  };
  useEffect(() => {
    if (open) {
      GetListPrePrint(setPrePrintList, setLoadingPrePrint, rowData.id);
    }
  }, [open]);

  useEffect(() => {
    if (prePrintList.length === 1) {
      form.setFieldValue('prePay_id', prePrintList[0].id);
      setSelectedPrePay(prePrintList[0]);
    }
  }, [prePrintList]);



  const showPrint = useReactToPrint({
    content: () => componentRefDetailPayment.current,


  });

  return (<>
    {automationAddress === 'payment' && (


      <div onClick={showModal} className="flex-1">
        {inDetail ? <Button
          className={` w-100 defBtn ${rowData.paid ? 'greenBtn' : 'orangeBtn'}`}>پرداخت </Button> : <div>
          <div className="d-none d-md-block">
            <IconBtn TooltipText="پرداخت"
                     btnClass={`${rowData.paid ? 'greenIconBtn' : 'orangeIconBtn'}`}
                     icon={<BsCurrencyDollar size={22} />} />
          </div>
          <div className="d-md-none">
            <Button className="text-black d-flex align-items-center gap-2 px-0" type="link">
              {/*<i className={`bi bi-currency-dollar fs-4  ${rowData.paid ? 'greenText' : 'orangeText'}`}></i>*/}
              <span   className={`${rowData.paid ? 'greenText' : 'orangeText'}`}>
                <BsCurrencyDollar size={22} />
              </span>



              <span>پرداخت</span></Button>
          </div>
        </div>

        }
      </div>


    )}
    <Modal open={open} title="پرداخت" onCancel={handleCancel} width={800}
           footer={null}
    >
      {hasPermission(`automation_${automationAddress}`, ['pay']) &&
        <Form name="basic" form={form} layout="vertical" onFinish={onFinish}
              autoComplete="off"
        >
          {!loadingPrePrint ? <>
              {prePrintList.length > 0 ? <Form.Item label="پیش پرداخت" name="prePay_id"
                                                    rules={[{
                                                      required: true,
                                                      message: 'لطفا یِکی از پیش پرداخت ها را انتخاب کنید!',
                                                    }]}

                                                    validateStatus={error422.prePay_id ? 'error' : 'success'}
                                                    help={error422.prePay_id}>

                <Radio.Group className="w-100">


                  {prePrintList.map((item) => (
                    <div className="defBorder p-2 mb-2" key={item?.id}><Radio value={item?.id} onChange={() => {

                      setSelectedPrePay(item);
                    }}>

                      <div className="keyValue align-items-start mb-2">
                        <div className="key">مبلغ:</div>
                        <div className="value">{ConvertToPrice(item?.price)}</div>
                      </div>

                      <div className="keyValue align-items-start mb-2">
                        <div className="key white-space-nowrap">بانک مبدا:</div>
                        <div className="value">{item?.bank?.title}</div>

                      </div>
                      <div className="keyValue align-items-start mb-2">
                        <div className="key white-space-nowrap">نوع پرداخت:</div>
                        <div className="value">{rowData.pay_type === 'cheque' ? 'چکی' : 'نقدی'}</div>

                      </div>

                      {rowData.pay_type === 'cheque' && <>

                        <div className="keyValue align-items-start mb-2">
                          <div className="key white-space-nowrap">تاریخ چک:</div>
                          <div className="value">{ConvertTimestampToDate(item?.cheque_date)}</div>

                        </div>
                        <div className="keyValue align-items-start mb-2">
                          <div className="key white-space-nowrap">شماره چک:</div>
                          <div className="value">{item?.cheque_number}</div>

                        </div>


                      </>}
                  <div className="d-flex justify-content-end">
                    <Button size="sm" round="true" onClick={showPrint}
                            className="defBtn d-flex gap-2 align-items-center blueBtn">

                      <BsPrinterFill size={20} />

                      {/*<i className="fs-4 mt-2 bi bi-printer-fill"></i>*/}

                      <span>پرینت</span>
                    </Button>
                  </div>
                      <ComponentToPrint ref={componentRefDetailPayment}>

                        <PrintPayment detail={rowData} item={item} />

                      </ComponentToPrint>

                    </Radio>



                    </div>))}

                </Radio.Group>

              </Form.Item> : <p className="text-danger">لطفا ابتدا برگه تاییدیه را ثبت نمایید. </p>}</> :
            <div className="defBorder placeholder-glow p-2  w-100 ">
              <div className="  p-2 mb-3  placeholder w-100 "></div>
              <div className="  p-2 mb-3  placeholder w-100 "></div>
              <div className="  p-2 mb-3  placeholder w-100 "></div>
              <div className="  p-2    placeholder w-100 "></div>
            </div>}
          <Form.Item label="متن" name="body"
                     validateStatus={error422.body ? 'error' : 'success'}
                     help={error422.body}>
            <CKEditorComponent getData={(e) => form.setFieldValue('body', e)} />
          </Form.Item>

          <Form.Item
            label="تصویر"
            name="attachments"
            validateStatus={error422.attachments ? 'error' : 'success'}
            help={error422.attachments}
            rules={[{ required: true, message: 'لطفا تصویر را وارد کنید!' }]}>
            <Uploader onChangeImage={(e) => {
              setAttachments(e);
              form.setFieldValue('attachments', e);
            }}

            />
          </Form.Item>
          <Form.Item>
            <div className="d-flex align-items-center justify-content-end gap-2">
              <Button key="back"
                      onClick={handleCancel}>انصراف</Button> {hasPermission(`automation_${automationAddress}`, ['pay']) &&
              <Button key="submit" type="primary" loading={loading} htmlType="submit"
                      disabled={!rowData?.can_change_status_pay || loadingPrePrint || !prePrintList.length}>ثبت
              </Button>}
            </div>

          </Form.Item>

          <hr />
        </Form>}


      <>
        {rowData.paid_list?.length > 0 ? (rowData.paid_list.map((item) => <CommentsDetail payBox key={item.id}
                                                                                          data={item} />)) : (
          <div className="d-flex my-3 text-primary">درحال بررسی... </div>)}</>
    </Modal>


  </>);
};

export default PayBox;




import React, { useEffect, useState } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Select } from 'antd';
import MultiDatePicker from '../../datePicker/MultiDatePicker';
import { UpdatePurchase } from '../../../store/commerce/purchase/PurchaseSlice';
import CurrencyInputComponent from '../../MicroComponents/CurrencyInputComponent';
import UpdateCreateCompanies from '../../automation/company/UpdateCreateCompanies';
import Uploader from '../../MicroComponents/Uploader';
import Commerce from '../../../api/http_request/Model/commerce/Commerce';
import { getHomeData } from '../../../api/http_request/Model/User/HomeRequest';
import Companies from '../../../api/http_request/Model/companies/Companies';

const EditPurchaseInfo = ({ purchaseDetail ,changeShow}) => {
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [fileName, setFileName] = useState([]);
  const [attachmentList, setAttachmentList] = useState([]);

  const [companiesList, setCompaniesList] = useState([]);
  const [companiesListGetAgain, setCompaniesListGetAgain] = useState(false);
  const [reloadCompKey, setReloadCompKey] = useState(0);
  const [errorText, setErrorText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    Companies.request({
      beforeSend: () => {

      }, error: () => {
      }, success: async (data) => {
        setCompaniesList(data?.result);
      }, failed: () => {
      }, final: () => {
      },
    }).addParam('is_commerce', 1).companies();

  }, [companiesListGetAgain]);
  useEffect(() => {
    setErrorText('');
  }, []);
  const handleUpdate = () => {
    setIsAddLoading(true);

    const mainInfo = {
      invoice_id: purchaseDetail.invoice_id,
      company_id: purchaseDetail.company_id,
      register_number: purchaseDetail.register_number,
      performa_date: purchaseDetail.performa_date || '',
      expire_performa_date: purchaseDetail.expire_performa_date || '',
      register_performa_date: purchaseDetail.register_performa_date || '',
      expire_register_performa_date: purchaseDetail.expire_register_performa_date || '',
      currency_allocation_date: purchaseDetail.currency_allocation_date || '',
      amount: purchaseDetail.amount,
      freight_charge: purchaseDetail.freight_charge,
      total: String(purchaseDetail.total),
      attachments: fileName || [],
    };


    Commerce.request({
      success: (data) => {
        toast.success(data.message);
        changeShow();

        setAttachmentList(data.result.attachments);
        getHomeData(dispatch);
        setErrorText('');
        setFileName('');
        setReloadCompKey((key) => key + 1);

        dispatch(UpdatePurchase(purchaseDetail?.id, 'expire_currency_allocation_date', data.result.expire_currency_allocation_date));
        dispatch(UpdatePurchase(purchaseDetail?.id, 'currency_transfer_date', data.result.currency_transfer_date));

      }, error: (error) => {

        setErrorText(error.errors || '');
        toast.error(error.message);
      }, final: () => {
        setIsAddLoading(false);
      },
    }).purchaseDetailUpdate(purchaseDetail?.id, mainInfo);


  };
  useEffect(() => {
    if (purchaseDetail) {
      setAttachmentList(purchaseDetail.attachments);
    }
  }, [purchaseDetail]);
  return (
    <div className="row">
      <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2">
        <FormGroup> <Label for="performa_date">تاریخ پرفرما</Label>
          <MultiDatePicker activeAll
                           dates={purchaseDetail.performa_date && new DateObject({ date: purchaseDetail.performa_date * 1000 }).format('YYYY/MM/DD')}
                           onChange={(value) => dispatch(UpdatePurchase(purchaseDetail?.id, 'performa_date', value ? value.toUnix() : 0))}
                           AD
          />
        </FormGroup>
      </div>
      <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2">
        <FormGroup><Label for="performa_date">تاریخ انقضا پرفرما</Label>
          <MultiDatePicker activeAll
                           dates={purchaseDetail.expire_performa_date && new DateObject(purchaseDetail.expire_performa_date * 1000).format('YYYY/MM/DD')}
                           onChange={(value) => dispatch(UpdatePurchase(purchaseDetail?.id, 'expire_performa_date', value ? value.toUnix() : 0))}
                           AD
          />
        </FormGroup>

      </div>
      <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2">
        <FormGroup>
          <Label for="performa_date">شماره ثبت سفارش </Label>
          <Input
            type="text"
            name="register_number"
            id="register_number"
            value={purchaseDetail.register_number || ''}
            className={errorText.register_number ? ' is-invalid' : ''}
            onChange={(e) => {
              dispatch(UpdatePurchase(purchaseDetail?.id, 'register_number', e.target.value));
            }}
          />
        </FormGroup>
      </div>
      <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2"><FormGroup><Label for="performa_date">تاریخ ثبت
        سفارش </Label>
        <MultiDatePicker activeAll
                         dates={purchaseDetail.register_performa_date && new DateObject({
                           date: purchaseDetail.register_performa_date * 1000,
                           calendar: persian,
                         }).format('YYYY/MM/DD')}
                         onChange={(value) => dispatch(UpdatePurchase(purchaseDetail?.id, 'register_performa_date', value ? value.toUnix() : 0))}
          // AD
        />
      </FormGroup></div>
      <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2"><FormGroup><Label for="performa_date">تاریخ انقضا ثبت
        سفارش </Label>
        <MultiDatePicker activeAll
                         dates={purchaseDetail.expire_register_performa_date && new DateObject({
                           date: purchaseDetail.expire_register_performa_date * 1000,
                           calendar: persian,
                         }).format('YYYY/MM/DD')}
                         onChange={(value) => dispatch(UpdatePurchase(purchaseDetail?.id, 'expire_register_performa_date', value ? value.toUnix() : 0))}
          // AD
        />
      </FormGroup></div>
      <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2"><FormGroup><Label for="performa_date">تاریخ
        تخصیص </Label>
        <MultiDatePicker activeAll
                         dates={purchaseDetail.currency_allocation_date && new DateObject({
                           date: purchaseDetail.currency_allocation_date * 1000,
                           calendar: persian,
                         }).format('YYYY/MM/DD')}
                         onChange={(value) => dispatch(UpdatePurchase(purchaseDetail?.id, 'currency_allocation_date', value ? value.toUnix() : 0))}
          // AD
        />
      </FormGroup></div>
      <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2"><FormGroup>

        <Label for="amount"> مبلغ </Label>


        <CurrencyInputComponent suffix="  یورو" id="amount"
                                name="amount" key={reloadCompKey}
                                className={`form-control${errorText.amount ? ' is-invalid' : ''}`}
                                defaultValue={purchaseDetail.amount || '0'}
                                onChange={(value) => {
                                  dispatch(UpdatePurchase(purchaseDetail?.id, 'amount', value));
                                  dispatch(UpdatePurchase(purchaseDetail?.id, 'total', Number(value) + Number(purchaseDetail.freight_charge)));
                                }}
        />


        {errorText && <div className="invalid-feedback">{errorText.amount}</div>}
      </FormGroup></div>
      <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2"><FormGroup>
        <Label for="freight_charge"> شرکت کشتیرانی : </Label>

        <div className="d-flex align-items-center gap-1 ">
          <div className="flex-1">
            <Select className="w-100 " style={{height:'36.5px',borderColor:"#dee2e6",borderWidth:"1px",borderRadius:"0.3rem"}}

              name="company_id"
              placeholder="کشتیرانی ها" defaultValue={purchaseDetail?.company_id}
              options={companiesList?.map((item) => ({
                value: item.id, label: item.name,
              }))}

              onChange={(e, x) => {

                dispatch(UpdatePurchase(purchaseDetail?.id, 'company_id', e));
                dispatch(UpdatePurchase(purchaseDetail?.id, 'company_title', x.label));


              }}

            />
          </div>
          <UpdateCreateCompanies isPurchase finishEvent={() => {
            setCompaniesListGetAgain(!companiesListGetAgain);
          }} />
        </div>
      </FormGroup></div>
      <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2"><FormGroup>


        <Label for="freight_charge"> هزینه حمل </Label>


        <CurrencyInputComponent suffix="  یورو" key={reloadCompKey}
                                id="freight_charge"
                                name="freight_charge"
                                defaultValue={purchaseDetail.freight_charge || '0'}
                                className={`form-control${errorText.freight_charge ? ' is-invalid' : ''}`}

                                onChange={(value) => {
                                  dispatch(UpdatePurchase(purchaseDetail?.id, 'freight_charge', value));
                                  dispatch(UpdatePurchase(purchaseDetail?.id, 'total', Number(value) + Number(purchaseDetail.amount)));
                                }}
        />


        {errorText && (<div className="invalid-feedback">{errorText.freight_charge}</div>)}
      </FormGroup></div>
      <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2"><FormGroup>
        <Label for="total"> مبلغ نهایی </Label>

        <div className="form-control bg-light">
          <span>{Number(purchaseDetail.total).toLocaleString()}</span>
          <span className="ms-2">یورو</span>
        </div>
      </FormGroup></div>
      <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2">
        <FormGroup>

          <Label for="freight_charge">ارسال فایل</Label>

          <Uploader name="purchase" defaultFile={attachmentList} onChangeImage={(e) => {
            setFileName(e);
          }} />
        </FormGroup>
      </div>

      <div className="d-flex justify-content-end">
        <Button loading={isAddLoading} className="defBtn orangeBtn" onClick={() => handleUpdate(purchaseDetail)}>

          ثبت تغییرات
        </Button>
      </div>

    </div>
  );
};

export default EditPurchaseInfo;


// {/*<tr>*/}
// {/*  <td>*/}
// {/*    <h6>*/}
// {/*      <Label for="invoice_id"> شماره صورتحساب</Label>*/}
// {/*    </h6>*/}
// {/*  </td>*/}
// {/*  <td>*/}
// {/*    <Input*/}
// {/*      type="text"*/}
// {/*      name="invoice_id"*/}
// {/*      id="invoice_id"*/}
// {/*      value={purchaseDetail.invoice_id || ''}*/}
// {/*      className={errorText.invoice_id ? ' is-invalid' : ''}*/}
// {/*      onChange={(e) => {*/}
// {/*        dispatch(UpdatePurchase(purchaseDetail?.id, 'invoice_id', e.target.value));*/}
// {/*      }}*/}
// {/*    />*/}
// {/*    {errorText && <div className="invalid-feedback">{errorText.invoice_id}</div>}*/}
// {/*  </td>*/}
// {/*</tr>*/}
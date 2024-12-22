import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { FormGroup, Input, Label } from 'reactstrap';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import Commerce from '../../../api/http_request/Model/commerce/Commerce';
import { UpdatePurchase } from '../../../store/commerce/purchase/PurchaseSlice';
import { shippingMethod } from '../../../helper/jsons/shippingMethod';
import MultiDatePicker from '../../datePicker/MultiDatePicker';

const EditCarry = ({ changeShow, purchaseDetail, setPurchasePositionTitle, positionList }) => {
  const dispatch = useDispatch();
  const [errorText, setErrorText] = useState('');
  useEffect(() => {
    setErrorText('');
  }, []);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const handleUpdate = () => {
    setIsAddLoading(true);

    const mainInfo = {
      shipping_method: purchaseDetail.shipping_method,
      type: purchaseDetail.type,
      voyage_number: purchaseDetail.voyage_number,
      shippling_line: purchaseDetail.shippling_line,
      container_number: purchaseDetail.container_number,
      container_number_2: purchaseDetail.container_number_2,
      airline_name: purchaseDetail.airline_name,
      bill_lading_number: purchaseDetail.bill_lading_number,
      bill_lading_number_2: purchaseDetail.bill_lading_number_2,
      position: purchaseDetail.position,
      shipping_date: purchaseDetail.shipping_date || '',
      inventory_date: purchaseDetail.inventory_date || '',
      production_date: purchaseDetail.production_date || '',
      bill_lading_date: purchaseDetail.bill_lading_date || '',
      net_weight: purchaseDetail.net_weight,
      gross_weight: purchaseDetail.gross_weight,
    };


    Commerce.request({
      success: (data) => {
        toast.success(data.message);
        changeShow();
        setErrorText('');
      }, error: (error) => {

        setErrorText(error.errors || '');
        toast.error(error.message);
      }, final: () => {
        setIsAddLoading(false);
      },
    }).purchaseDetailUpdate(purchaseDetail?.id, mainInfo);


  };
  return (<div>
      <div className="row">
        <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2">
          <FormGroup>
            <Label for="shipping_method">نوع سفر</Label>
            <Input
              type="select"
              name="shipping_method"
              id="shipping_method"
              className={errorText.shipping_method ? ' is-invalid' : ''}
              defaultValue={purchaseDetail.shipping_method || ''}
              onChange={(e) => {
                dispatch(UpdatePurchase(purchaseDetail?.id, 'shipping_method', e.target.value));
              }}
            >
              <option value={null}></option>
              {shippingMethod.map((item) => (<option value={item.value}>{item.name}</option>

              ))}
            </Input>
            {errorText && (<div className="invalid-feedback">{errorText.shipping_method}</div>)}
          </FormGroup>
        </div>

        {purchaseDetail.shipping_method === 'ship' && (<>
            <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2">
              <FormGroup>
                <Label for="voyage_number">شماره سفر</Label>

                <Input
                  type="text"
                  name="voyage_number"
                  id="voyage_number"
                  value={purchaseDetail.voyage_number || ''}
                  className={errorText.voyage_number ? ' is-invalid' : ''}
                  onChange={(e) => {
                    dispatch(UpdatePurchase(purchaseDetail?.id, 'voyage_number', e.target.value));
                  }}
                />
                {errorText && (<div className="invalid-feedback">{errorText.voyage_number}</div>)}
              </FormGroup>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2">
              <FormGroup>
                <Label for="shippling_line">اسم کشتی</Label>

                <Input
                  type="text"
                  name="shippling_line"
                  id="shippling_line"
                  value={purchaseDetail.shippling_line || ''}
                  className={errorText.shippling_line ? ' is-invalid' : ''}
                  onChange={(e) => {
                    dispatch(UpdatePurchase(purchaseDetail?.id, 'shippling_line', e.target.value));
                  }}
                />
                {errorText && (<div className="invalid-feedback">{errorText.shippling_line}</div>)}
              </FormGroup>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2">
              <FormGroup>

                <Label for="container_number">شماره کانتینر</Label>

                <Input
                  type="text"
                  name="container_number"
                  id="container_number"
                  value={purchaseDetail.container_number || ''}
                  className={errorText.container_number ? ' is-invalid' : ''}
                  onChange={(e) => {
                    dispatch(UpdatePurchase(purchaseDetail?.id, 'container_number', e.target.value));
                  }}
                />
                {errorText && (<div className="invalid-feedback">{errorText.container_number}</div>)}

              </FormGroup>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2">
              <FormGroup>
                <Label for="container_number_2">شماره کانتینر 2</Label>

                <Input
                  type="text"
                  name="container_number_2"
                  id="container_number_2"
                  value={purchaseDetail.container_number_2 || ''}
                  className={errorText.container_number_2 ? ' is-invalid' : ''}
                  onChange={(e) => {
                    dispatch(UpdatePurchase(purchaseDetail?.id, 'container_number_2', e.target.value));
                  }}
                />
                {errorText && (<div className="invalid-feedback">{errorText.container_number_2}</div>)}
              </FormGroup>
            </div>

          </>)}
        {purchaseDetail.shipping_method === 'plane' && (

          <>

            <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2">
              <FormGroup>
                <Label for="airline_name">نام هواپیما</Label>

                <Input
                  type="text"
                  name="airline_name"
                  id="airline_name"
                  value={purchaseDetail.airline_name || ''}
                  className={errorText.airline_name ? ' is-invalid' : ''}
                  onChange={(e) => {
                    dispatch(UpdatePurchase(purchaseDetail?.id, 'airline_name', e.target.value));
                  }}
                />
                {errorText && (<div className="invalid-feedback">{errorText.airline_name}</div>)}
              </FormGroup>
            </div>
          </>)}

        <hr />

        <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2">
          <FormGroup>
            <Label for="bill_lading_number">شماره بارنامه</Label>

            <Input
              type="text"
              name="bill_lading_number"
              id="bill_lading_number"
              value={purchaseDetail.bill_lading_number || ''}
              className={errorText.bill_lading_number ? ' is-invalid' : ''}
              onChange={(e) => {
                dispatch(UpdatePurchase(purchaseDetail?.id, 'bill_lading_number', e.target.value));
              }}
            />
            {errorText && (<div className="invalid-feedback">{errorText.bill_lading_number}</div>)}
          </FormGroup>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2">
          <FormGroup>
            <Label for="bill_lading_number_2">شماره بارنامه 2</Label>

            <Input
              type="text"
              name="bill_lading_number_2"
              id="bill_lading_number_2"
              value={purchaseDetail.bill_lading_number_2 || ''}
              className={errorText.bill_lading_number_2 ? ' is-invalid' : ''}
              onChange={(e) => {
                dispatch(UpdatePurchase(purchaseDetail?.id, 'bill_lading_number_2', e.target.value));
              }}
            />
            {errorText && (<div className="invalid-feedback">{errorText.bill_lading_number_2}</div>)}
          </FormGroup>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2">
          <FormGroup>
            <Label for="shipping_date">تاریخ حمل</Label>

            <MultiDatePicker activeAll
                             dates={purchaseDetail.shipping_date && new DateObject(purchaseDetail.shipping_date * 1000).format('YYYY/MM/DD')}
                             onChange={(value) => dispatch(UpdatePurchase(purchaseDetail?.id, 'shipping_date', value ? value.toUnix() : 0))}
                             AD
            />
          </FormGroup>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2">
          <FormGroup>
            <Label for="position">موقعیت محموله</Label>

            <Input
              type="select"
              name="position"
              id="position"
              className={errorText.position ? ' is-invalid' : ''}
              defaultValue={purchaseDetail.position || ''}
              onChange={(e) => {
                dispatch(UpdatePurchase(purchaseDetail?.id, 'position', e.target.value), setPurchasePositionTitle(e.nativeEvent.target[e.target.value].text));
              }}
            >
              <option value="" />
              {positionList?.map((position) => (<option key={position.value} value={position.value}>
                  {position.name}
                </option>))}
            </Input>
            {errorText && (<div className="invalid-feedback">{errorText.position}</div>)}
          </FormGroup>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2">
          <FormGroup>
            <Label for="type">نوع</Label>

            <Input
              type="select"
              name="type"
              id="type"
              className={errorText.type ? ' is-invalid' : ''}
              defaultValue={purchaseDetail.type || ''}
              onChange={(e) => {
                dispatch(UpdatePurchase(purchaseDetail?.id, 'type', e.target.value));
              }}
            >
              <option value={null}></option>
              <option value="واقعی">واقعی</option>
              <option value="درراه">درراه</option>
            </Input>
            {errorText && (<div className="invalid-feedback">{errorText.type}</div>)}
          </FormGroup>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2">
          <FormGroup>
            <Label for="inventory_date">تاریخ رسیدن به انبار</Label>

            <MultiDatePicker activeAll
                             dates={purchaseDetail.inventory_date && new DateObject({
                               date: purchaseDetail.inventory_date * 1000, calendar: persian,
                             }).format('YYYY/MM/DD')}
                             onChange={(value) => dispatch(UpdatePurchase(purchaseDetail?.id, 'inventory_date', value ? value.toUnix() : 0))}
              // AD
            />
          </FormGroup>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2">
          <FormGroup>
            <Label for="production_date">تاریخ تولید</Label>

            <MultiDatePicker activeAll
                             dates={purchaseDetail.production_date && new DateObject(purchaseDetail.production_date * 1000).format('YYYY/MM/DD')}
                             onChange={(value) => dispatch(UpdatePurchase(purchaseDetail?.id, 'production_date', value ? value.toUnix() : 0))}
                             AD
            />
          </FormGroup>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2">
          <FormGroup>
            <Label for="production_date">تاریخ بارنامه</Label>

            <MultiDatePicker activeAll
                             dates={purchaseDetail.bill_lading_date && new DateObject(purchaseDetail.bill_lading_date * 1000).format('YYYY/MM/DD')}
                             onChange={(value) => dispatch(UpdatePurchase(purchaseDetail?.id, 'bill_lading_date', value ? value.toUnix() : 0))}
                             AD
            />
          </FormGroup>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2">
          <FormGroup>
            <Label for="net_weight">وزن خالص</Label>

            <Input
              type="number"
              min="1"
              max="10000"
              step="1"
              name="net_weight"
              id="net_weight"
              value={purchaseDetail.net_weight || ''}
              className={errorText.net_weight ? ' is-invalid' : ''}
              onChange={(e) => {
                dispatch(UpdatePurchase(purchaseDetail?.id, 'net_weight', e.target.value));
              }}
            />
            {errorText && <div className="invalid-feedback">{errorText.net_weight}</div>}
          </FormGroup>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-12 col-xl-4 px-2">
          <FormGroup>
            <Label for="gross_weight">وزن ناخالص</Label>

            <Input
              type="number"
              min="1"
              max="10000"
              step="1"
              name="gross_weight"
              id="gross_weight"
              value={purchaseDetail.gross_weight || ''}
              className={errorText.gross_weight ? ' is-invalid' : ''}
              onChange={(e) => {
                dispatch(UpdatePurchase(purchaseDetail?.id, 'gross_weight', e.target.value));
              }}
            />
            {errorText && <div className="invalid-feedback">{errorText.gross_weight}</div>}
          </FormGroup>
        </div>

        <div className="d-flex justify-content-end mt-4">

          <Button className="defBtn orangeBtn" loading={isAddLoading} onClick={() => handleUpdate(purchaseDetail)}>
            ثبت تغییرات
          </Button>
        </div>
      </div>
    </div>);
};

export default EditCarry;
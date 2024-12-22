import React from 'react';
import { Descriptions } from 'antd';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persianFa from 'react-date-object/locales/persian_fa';
import { Button } from 'reactstrap';
import AttachmentsShow from '../../automation/detailbox/AttachmentsShow';
import { hasPermission } from '../../../permission/module';

const ShowPurchaseInfo = ({ purchaseDetail, attachmentList, changeShow }) => {

  const items = [

    {
      key: '1',
      label: 'تاریخ پرفرما',
      children: purchaseDetail.performa_date ? new DateObject({ date: purchaseDetail.performa_date * 1000 }).format('YYYY/MM/DD') : 'خالی',
    },
    {
      key: '1',
      label: 'تاریخ انقضا پرفرما',
      children: purchaseDetail.expire_performa_date ? new DateObject({ date: purchaseDetail.expire_performa_date * 1000 }).format('YYYY/MM/DD') : 'خالی',
    },
    {
      key: '1',
      label: 'شماره ثبت سفارش',
      children: purchaseDetail.register_number,
    },
    {
      key: '1',
      label: 'تاریخ ثبت سفارش',
      children: purchaseDetail.register_performa_date ? new DateObject({
        date: purchaseDetail.register_performa_date * 1000, calendar: persian, locale: persianFa,
      }).format('YYYY/MM/DD') : 'خالی',
    },
    {
      key: '1',
      label: 'تاریخ انقضا ثبت سفارش',
      children: purchaseDetail.expire_register_performa_date ? new DateObject({
        date: purchaseDetail.expire_register_performa_date * 1000,
        calendar: persian,
        locale: persianFa,
      }).format('YYYY/MM/DD') : 'خالی',
    },
    {
      key: '1',
      label: 'تاریخ تخصیص',
      children: purchaseDetail.currency_allocation_date ? new DateObject({
        date: purchaseDetail.currency_allocation_date * 1000, calendar: persian, locale: persianFa,
      }).format('YYYY/MM/DD') : 'خالی',
    },
    {
      key: '1',
      label: 'اعتبار تاریخ تخصیص',
      children: purchaseDetail.expire_currency_allocation_date ? new DateObject({
        date: purchaseDetail.expire_currency_allocation_date * 1000,
        calendar: persian,
        locale: persianFa,
      }).format('YYYY/MM/DD') : 'خالی',
    },
    {
      key: '1',
      label: 'تاریخ حدودی حواله',
      children: purchaseDetail.currency_transfer_date ? new DateObject({
        date: purchaseDetail.currency_transfer_date * 1000, calendar: persian, locale: persianFa,
      }).format('YYYY/MM/DD') : 'خالی',
    },
    {
      key: '1',
      label: 'مبلغ',
      children: `${Number(purchaseDetail.amount).toLocaleString() || '0'} یورو`,
    },
    {
      key: '1',
      label: 'شرکت کشتیرانی',
      children: purchaseDetail.company_title,
    },
    {
      key: '1',
      label: 'هزینه حمل',
      children: `${Number(purchaseDetail.freight_charge).toLocaleString() || '0'} یورو`,
    },
    {
      key: '1',
      label: 'مبلغ نهایی',
      children: `${Number(purchaseDetail.total).toLocaleString() || '0'} یورو`,
    },
    {
      key: '1',
      label: 'فایل ها',
      children: purchaseDetail.attachments?.length > 0 ? (<AttachmentsShow data={attachmentList} />) : (
        <div style={{ color: '#cdcdcd' }}>فایلی وجود ندارد </div>),
    },
  ];
  return (
    <div>
      <Descriptions column={{
        xs: 1,
        md: 2,
        lg: 1,
        xl: 2,
        xxl: 3,

      }} bordered items={items} labelStyle={{ fontWeight: 'bold', fontSize: '13px', padding: '10px' }} />
      {hasPermission('commerce_purchase', ['edit']) && (<div className="mt-3 d-flex justify-content-end"><Button
        color="primary"
        onClick={changeShow}
        disabled={!purchaseDetail.editable}
      >
        تغییر اطلاعات
      </Button></div>)}
    </div>
  );
};

export default ShowPurchaseInfo;


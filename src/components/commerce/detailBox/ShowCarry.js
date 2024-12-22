import React, { useEffect } from 'react';
import { Descriptions } from 'antd';
import DateObject from 'react-date-object';
import persianFa from 'react-date-object/locales/persian_fa';
import persian from 'react-date-object/calendars/persian';
import { Button } from 'reactstrap';
import { hasPermission } from '../../../permission/module';

const ShowCarry = ({ purchaseDetail,  changeShow, purchasePositionTitle }) => {
  let items = [
    {
      key: '1',
      label: 'نوع سفر',
      children: <span>
       {(purchaseDetail.shipping_method === null ||
           purchaseDetail.shipping_method === '') &&
         'خالی'}
        {purchaseDetail.shipping_method === 'ship' && 'کشتی'}
        {purchaseDetail.shipping_method === 'plane' && 'هواپیما'}
    </span>,
    },

  ];

  useEffect(() => {
    if (purchaseDetail.shipping_method === 'ship') {
      items = [...items, {
        key: '1',
        label: 'شماره سفر ',
        children: purchaseDetail.voyage_number || 'خالی',
      },

        {
          key: '1',
          label: 'اسم کشتی ',
          children: purchaseDetail.shippling_line || 'خالی',
        },
        {
          key: '1',
          label: 'شماره کانتینر ',
          children: purchaseDetail.container_number || 'خالی',
        },
        {
          key: '1',
          label: 'شماره کانتینر2 ',
          children: purchaseDetail.container_number_2 || 'خالی',
        },
        {
          key: '1',
          label: 'شماره کانتینر2 ',
          children: purchaseDetail.container_number_2 || 'خالی',
        }];
    }
    if (purchaseDetail.shipping_method === 'plane') {
      items = [...items, {
        key: '1',
        label: 'نام هواپیما ',
        children: purchaseDetail.airline_name || 'خالی',
      }];
    }

  }, [purchaseDetail]);

  const items2 = [
    {
      key: '1',
      label: 'شماره بارنامه',
      children: purchaseDetail.bill_lading_number || 'خالی',
    },
    {
      key: '1',
      label: 'شماره بارنامه 2',
      children: purchaseDetail.bill_lading_number_2 || 'خالی',
    },
    {
      key: '1',
      label: 'تاریخ حمل',
      children: purchaseDetail.shipping_date
        ? new DateObject({ date: purchaseDetail.shipping_date * 1000 }).format(
          'YYYY/MM/DD',
        )
        : 'خالی',
    },
    {
      key: '1',
      label: 'نوع',
      children: <span>
      {(purchaseDetail.type === null ||
          purchaseDetail.type === '') &&
        'خالی'}
        {purchaseDetail.type === 'واقعی' && 'واقعی'}
        {purchaseDetail.type === 'درراه' && 'درراه'}
      </span>,
    },
    {
      key: '1',
      label: ' موقعیت محموله',
      children: purchasePositionTitle || purchaseDetail.position_title || 'خالی',
    },
    {
      key: '1',
      label: ' تاریخ رسیدن به انبار',
      children: <span>{purchaseDetail.inventory_date
        ? new DateObject({
          date: purchaseDetail.inventory_date * 1000,
          calendar: persian,
          locale: persianFa,
        }).format('YYYY/MM/DD')
        : 'خالی'}</span>,
    },
    {
      key: '1',
      label: ' تاریخ تولید',
      children: <span> {purchaseDetail.production_date
        ? new DateObject({ date: purchaseDetail.production_date * 1000 }).format(
          'YYYY/MM/DD',
        )
        : 'خالی'}</span>,
    },
    {
      key: '1',
      label: ' تاریخ بارنامه ',
      children: <span> {purchaseDetail.bill_lading_date
        ? new DateObject({ date: purchaseDetail.bill_lading_date * 1000 }).format(
          'YYYY/MM/DD',
        )
        : 'خالی'}</span>,
    },
    {
      key: '1',
      label: ' وزن خالص ',
      children: purchaseDetail.net_weight || 'خالی',
    },
    {
      key: '1',
      label: 'وزن ناخالص',
      children: purchaseDetail.gross_weight || 'خالی',
    },
  ];
  return (
    <div>
      <Descriptions column={{ xs: 1, md: 2, lg: 1, xl: 2, xxl: 3 }} className="mb-2"
                    bordered items={items} labelStyle={{ fontWeight: 'bold', fontSize: '13px', padding: '10px' }} />
      <Descriptions column={{ xs: 1, md: 2, lg: 1, xl: 2, xxl: 3 }}
                    bordered items={items2} labelStyle={{ fontWeight: 'bold', fontSize: '13px', padding: '10px' }} />

      {hasPermission('commerce_purchase', ['edit']) && (
        <div className="d-flex justify-content-end mt-4">
        <Button
          color="primary"
          onClick={() => {
            changeShow();

          }}
        >
          تغییر اطلاعات
        </Button></div>
      )}
    </div>
  );
};


export default ShowCarry;
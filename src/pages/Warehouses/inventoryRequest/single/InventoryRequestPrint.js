import React from 'react';
import { ConfigProvider, Image, Table } from 'antd';
import { useSelector } from 'react-redux';
import { LuCheckSquare } from 'react-icons/lu';
import LogoWhiteSingle from '../../../../assets/images/logos/hasel-novin.svg';

const columns = [
  {
    title: 'ردیف',
    className: 'text-black',
    dataIndex: 'row',
    key: 'row',
    render: (item, row, index) => index + 1,
  },
  { title: 'کد کالا', className: 'text-black', dataIndex: 'sku_code', key: 'sku_code' },
  {
    title: 'شرح کالا',
    width: 100,
    className: 'text-black',
    // ellipsis: true,
    dataIndex: 'product_name',
    key: 'product_name',
    render: (item, row) => (
      <div className="d-flex gap-1" style={{ width: ' 130px', whiteSpace: 'break-spaces' }}>
        <div>{item}</div>- <div>{row.name}</div>
      </div>
    ),
  },
  {
    title: 'واحد اندازه گیری',
    className: 'text-black',
    dataIndex: 'measurement_name',
    key: 'measurement_name',
  },
  { title: 'مقدار', className: 'text-black', dataIndex: 'quantity', key: 'quantity' },
  {
    title: 'مورد مصرف',
    className: 'text-black',
    dataIndex: 'place_consumption_name',
    key: 'place_consumption_name',
    render: (item) => item?.name,
  },
  {
    title: 'تکمیل توسط انبار',
    dataIndex: 'function',
    key: 'function',
    className: 'text-black',
    children: [
      {
        title: 'شماره حواله انبار',
        className: 'text-black',
        dataIndex: 'remittance_number',
        key: 'remittance_number',
        render: (item, row) => <span>{row.remittance_number}</span>,
      },
      {
        title: 'شماره درخواست خرید',
        className: 'text-black',
        dataIndex: 'buy_request_number',
        key: 'buy_request_number',
        render: (item, row) => <span>{row.buy_request_number}</span>,
      },
    ],
  },
];

const InventoryRequestPrint = ({ typeList,title,address, data }) => {
  const cost_center_code = useSelector((state) => state.InventoryRequestRedux.cost_center_code);

  return (
    <div className="bg-white p-3">
      <div className="border-dark border-1 border  d-flex justify-content-between align-items-center mb-4">
        <div className="p-2  ">
          <Image src={LogoWhiteSingle} alt="logoWhite" width="100px" />
        </div>
        <div className="flex-1 d-flex flex-column justify-content-center  border-dark border-1 border" style={{height:"107px"}}>
          <div className="flex-1 p-2 border-bottom border-1 border-dark p-2 fw-bold fs-3 text-black text-center">
            حوزه انبارداری
          </div>
          <div className=" flex-1 p-2 fw-bold text-black text-center fs-5">{title}</div>
        </div>
        <div className="   ">
          <div className="p-2 border-bottom border-1 border-dark">
            <div className="keyValue flex-1 p-2">
              <div className="key text-black">تاریخ:</div>
              <div className="value">{data.created_at}</div>
            </div>
          </div>
          <div className="p-2">
            <div className="keyValue flex-1 p-2">
              <div className="key text-black">شماره سابقه:</div>
              <div className="value">{data.number}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-1 mb-4 border-dark">
        <div className="border-bottom border-dark p-2 text-center text-black">مشخصات درخواست</div>
        <div className="d-flex align-items-center justify-content-around">
          <div className="keyValue border-end border-dark flex-1 p-2">
            <div className="key text-black">واحد درخواست کننده:</div>
            <div className="value">{data.section_name}</div>
          </div>
          <div className="keyValue flex-1 p-2">
            <div className="key text-black">کد مرکز هزینه:</div>
            <div className="value">{cost_center_code}</div>
          </div>
        </div>
        <div className="d-flex gap-4 flex-wrap p-2 border-top border-dark">
          {typeList?.map((item) => (<>
            {item !== "" &&
            <div key={item} className="d-flex gap-2 align-items-center border-end border-dark pe-2">
              <LuCheckSquare size={22} />
              <span>{item}</span>
            </div>}</>
          ))}
        </div>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: '#c2c2c2',
                borderColor: '#424242',
              },
            },
          }}
        >
          <Table
            pagination={false}
            size="small"
            dataSource={data?.items}
            bordered
            columns={columns}
          />
        </ConfigProvider>
        <div className="d-flex justify-content-between ">
          <div className="keyValue flex-1 border-end border-dark p-4">
            <div className="key text-black fw-bold">مرکز نگهداری انبار مبدا:</div>
            <div className="value fw-bold">{data.warehouse_location_name}</div>
          </div>
          <div className="keyValue flex-1 border-end border-dark p-4">
            <div className="key text-black fw-bold">{address === 'inventory_remittance' ? 'مشتری:' : 'مقصد_مرکز نگهداری انبار:'}</div>
            <div className="value fw-bold">{address === 'inventory_remittance'
              ? data.customer_name
              : data.to_warehouse_location_name}</div>
          </div>
          {address !== 'inventory_temporary_receipt' && (<div className="keyValue flex-1 p-4">
            <div className="key text-black fw-bold">نوع تحویل:</div>
            <div className="value fw-bold">{data.delivery_type_name}</div>
          </div>)}
        </div>
      </div>
      <div className="border border-1 border-dark mb-4">
        <div className="d-flex">
          {data?.last_statuses?.map((item) => (
            <div className="flex-1 d-flex flex-column">
              <div className="border border-1 border-dark p-2 text-black fw-bold" style={{ fontSize: '13px' }}>
                {item.post_name}
              </div>
              <div className="border border-1 border-dark flex-1">
                <div className="keyValue flex-1 p-2">
                  <div className="key text-black fw-bold">نام و نام خانوادگی:</div>
                  <div className="value fw-bold">{item.name}</div>
                </div>
                <div className="keyValue flex-1 p-2">
                  <div className="key text-black fw-bold">تاریخ :</div>
                  <div className="value fw-bold">{item.created_at}</div>
                </div>

                {item.signature_image && (
                  <div className="position-relative m-auto" style={{ width: '90px' }}>
                    <img
                      className="position-relative w-100 h-100"
                      src={item.signature_image}
                      alt="signature"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryRequestPrint;

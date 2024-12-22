import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsPinAngle, BsPinAngleFill } from 'react-icons/bs';
import { TbEye } from 'react-icons/tb';
import SearchFilterTable from '../MicroComponents/table/SearchFilterTable';
import SelectFilterTable from '../MicroComponents/table/SelectFilterTable';
import { iconFn } from './IconStatusList';
import { hasPermission } from '../../permission/module';
import StatusModal from './modalbox/StatusModal';
import GetPurchasePosition from '../../api/http_request/Model/commerce/getPurchasePosition';
import PriceFilterTable from '../MicroComponents/table/PriceFilterTable';
import { getAgainHandler, isLoading } from '../../store/loading/LoadingSlice';
import UseSetParams from '../../helper/UseSetParams';
import Commerce from '../../api/http_request/Model/commerce/Commerce';

const PurchaseColumn = () => {
  const dispatch = useDispatch();

  // const [supplierList, setSupplierList] = useState([]);
  const [purchasePosition, setPurchasePosition] = useState([]);
  const filter = useSelector((state) => state.TableRedux.filter);
  const [getColumnSearchProps] = SearchFilterTable();
  const [getColumnSelectProps] = SelectFilterTable();
  const [getColumnPriceProps] = PriceFilterTable();
  const [handleSetParams] = UseSetParams();

  const funcHandleSetParams = (newFilter) => {
    handleSetParams(newFilter);
  };

  // const getSupplierList = () => {
  //   GetSupplierList((x) => {
  //     setSupplierList(
  //       x?.map((item) => ({
  //         value: item.id,
  //         label: item?.name,
  //       })),
  //     );
  //   });
  // };
  const getPurchasePosition = () => {
    GetPurchasePosition((x) => {
      setPurchasePosition(
        x?.map((item) => ({
          value: item.value,
          label: item?.name,
        })),
      );
    });
  };

  const handlePin = (id, type) => {
    dispatch(isLoading('isDataTable'));

    Commerce.request({
      success: () => {
        dispatch(getAgainHandler());
      },
      error: () => {
      },
      final: () => {
      },
    }).pinned(id, { type });
  };
  const columns = [
    //     {
    //     title: 'ردیف', dataIndex: 'row', key: 'row', render: (text, row, index) => {
    //         return index + 1
    //     },
    // },

    {
      title: (
        // <i
        //   onClick={() => {
        //     funcHandleSetParams([{ key: 'is_pinned', value: filter.is_pinned ? 0 : 1 }]);
        //   }}
        //   className={`bi cursor-pointer ${Number(filter.is_pinned) ? 'bi-pin-fill' : 'bi-pin'}`}
        // ></i>


        <span className="cursor-pointer" onClick={() => {
          funcHandleSetParams([{ key: 'is_pinned', value: filter.is_pinned ? 0 : 1 }]);
        }}>
               {

                 Number(filter.is_pinned) ? <BsPinAngleFill size={16} color="#FFC107" />
                   : <BsPinAngle size={16} color="#495057" />
               }
             </span>
      ),
      dataIndex: 'is_pinned',
      key: 'is_pinned',
      render: (text, v) => {
        return (


          <span className="cursor-pointer" onClick={() => {
            // e.stopPropagation();
            handlePin(v.id, v.is_pinned ? 0 : 1);
          }}>
               {

                 text ? <BsPinAngleFill size={16} color="#FFC107" />
                   : <BsPinAngle size={16} color="#495057" />
               }
             </span>

        // <i
        //   onClick={() => {
        //     // e.stopPropagation();
        //     handlePin(v.id, v.is_pinned ? 0 : 1);
        //   }}
        //   className={`bi cursor-pointer  ${text ? 'bi-pin-fill' : 'bi-pin'}`}
        // ></i>;
      )
        ;
      },
    },
    {
      title: 'شماره پرفرما',
      dataIndex: 'performa_id',
      key: 'performa_id',
      ...getColumnSearchProps('شماره پرفرما', filter.performa_id, (res) => {
        funcHandleSetParams([{ key: 'performa_id', value: res }]);
      }),
    },
    {
      title: ' شماره سفارش',
      dataIndex: 'register_number',
      key: 'register_number',
      ...getColumnSearchProps('شماره پرفرما', filter.register_number, (res) => {
        funcHandleSetParams([{ key: 'register_number', value: res }]);
      }),
    },
    {
      title: 'مبلغ نهایی فاکتور',
      dataIndex: 'total',

      key: 'total',

      ...getColumnPriceProps(
        filter.min_price,
        (res1) => {
          funcHandleSetParams([{ key: 'min_price', value: res1 }]);
        },

        filter.max_price,
        (res2) => {
          funcHandleSetParams([{ key: 'max_price', value: res2 }]);
        },
      ),
    },
    {
      title: 'تایید مدیریت',
      dataIndex: 'last_statuses',
      key: 'last_statuses',
      render: (text) => {
        return (

          text?.length ?
            text.map((item) => (
              <span key={item.id} className={item.status ? 'text-success' : 'text-danger'}>
              {item?.name}<br />
            </span>
            )) : '_'
        );
      },
    },
    {
      title: 'مجوزها',
      dataIndex: 'certifications',
      key: 'certifications',

      render: (text) => {
        return (
          <div className="d-flex align-items-center gap-1">
            {text && text.length ? (
              text.map((item) => (
                <Tooltip title={item.status_title} key={item.status_id}>
                  {iconFn(item.status_id)}
                </Tooltip>
              ))
            ) : (
              <span> درحال بررسی </span>
            )}
          </div>
        );
      },
    },
    {
      title: 'شماره بارنامه',
      dataIndex: 'bill_lading_number',
      key: 'bill_lading_number',
      render: (text, row) => {
        return <>
          <div className="mb-1">{row.bill_lading_number}</div>
          <div>{row.bill_lading_number_2}</div>
        </>;
      },
      ...getColumnSearchProps('شماره بارنامه', filter.bill_lading_number, (res) => {
        funcHandleSetParams([{ key: 'bill_lading_number', value: res }]);
      }),
    },
    {
      title: 'موقعیت محموله',
      dataIndex: 'position_title',
      key: 'position_title',

      ...getColumnSelectProps(
        filter.positions,
        'positions',
        'موقعیت محموله',
        purchasePosition,
        getPurchasePosition,
        (res) => {
          funcHandleSetParams([{ key: 'positions', value: res }]);
        },
      ),
    },
    {
      title: 'عملیات',
      dataIndex: 'function',
      key: 'function',
      fixed: 'right',
      render: (text, row) => {
        return (
          <div
            className="text-center d-flex flex-column w-100"
            onDoubleClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="text-center d-flex gap-1 d-flex justify-content-center">
              {hasPermission('commerce_purchase', ['show']) && (
                <Link to={`/commerce/purchase_detail/${row.id}`}>
                  <Tooltip title="نمایش">
                    <Button className="defIconBtn blueIconBtn">
                       <TbEye size={22}/>
                    </Button>
                  </Tooltip>
                </Link>
              )}


              {hasPermission('commerce_purchase', ['approve', 'reject']) && (
                <StatusModal rowData={row} />
              )}
            </div>
          </div>
        );
      },
    },
  ];
  return [columns];
};

export default PurchaseColumn;


//
// =======
//   className={`bi cursor-pointer  ${text ? 'bi-pin-fill' : 'bi-pin'}`}
// ></i>
// );
// },
// >>>>>>> dev-stage
// },
// {
//   title: 'شماره پرفرما',
//     dataIndex: 'performa_id',
//   key: 'performa_id',
// ...getColumnSearchProps('شماره پرفرما', filter.performa_id, (res) => {
//   funcHandleSetParams([{ key: 'performa_id', value: res }]);
// }),
// },
// {
//   title: ' شماره سفارش',
//     dataIndex: 'register_number',
//   key: 'register_number',
// ...getColumnSearchProps('شماره پرفرما', filter.register_number, (res) => {
//   funcHandleSetParams([{ key: 'register_number', value: res }]);
// }),
// },
// {
//   title: 'مبلغ نهایی فاکتور',
//     dataIndex: 'total',
//
//   key: 'total',
//
// ...getColumnPriceProps(
//   filter.min_price,
//   (res1) => {
//     funcHandleSetParams([{ key: 'min_price', value: res1 }]);
//   },
//
//   filter.max_price,
//   (res2) => {
//     funcHandleSetParams([{ key: 'max_price', value: res2 }]);
//   },
// ),
// },
// {
//   title: 'تایید مدیریت',
//     dataIndex: 'last_statuses',
//   key: 'last_statuses',
//   render: (text) => {
//   return (
//     text &&
//     text.length &&
//     text.map((item) => (
//       <span key={item.id} className={item.status ? 'text-success' : 'text-danger'}>
//               {item?.name}
//             </span>
//     ))
//   );
// },
// },
// {
//   title: 'مجوزها',
//     dataIndex: 'certifications',
//   key: 'certifications',
//
//   render: (text) => {
//   return (
//     <div className="d-flex align-items-center gap-1">
//       {text && text.length ? (
//         text.map((item) => (
//           <Tooltip title={item.status_title} key={item.status_id}>
//             {iconFn(item.status_id)}
//           </Tooltip>
//         ))
//       ) : (
//         <span> درحال بررسی </span>
//       )}
//     </div>
//   );
// },
// },
// {
//   title: 'نام شرکت',
//     dataIndex: 'supplier_name',
//   key: 'supplier_name',
// ...getColumnSelectProps(
//   filter.suppliers,
//   'suppliers',
//   'نام شرکت',
//   supplierList,
//   getSupplierList,
//   (res) => {
//     funcHandleSetParams([{ key: 'suppliers', value: res }]);
//   },
// ),
// },
// {
//   title: 'موقعیت محموله',
//     dataIndex: 'position_title',
//   key: 'position_title',
// ...getColumnSelectProps(
//   filter.positions,
//   'positions',
//   'موقعیت محموله',
//   purchasePosition,
//   getPurchasePosition,
//   (res) => {
//     funcHandleSetParams([{ key: 'positions', value: res }]);
//   },
// ),
// },
// {
//   title: 'عملیات',
//     dataIndex: 'function',
//   key: 'function',
//   fixed: 'right',
//   render: (text, row) => {
//   return (
//     <div
//       className="text-center d-flex flex-column w-100"
//       onDoubleClick={(e) => {
//         e.stopPropagation();
//       }}
//     >
//       <div className="text-center d-flex gap-1 d-flex justify-content-center">
//         {isPermission('commerce_purchase', 'show') && (
//           <Link to={`/commerce/purchase_detail/${row.id}`}>
//             <Tooltip title="نمایش">
//               <Button className="defIconBtn blueIconBtn">
//                 <i className="bi bi-eye fs-4 d-flex"></i>
//               </Button>
//             </Tooltip>
//           </Link>
//         )}
//
//         {hasPermission('commerce_purchase', ['approve', 'reject']) && (
//           <StatusModal rowData={row} />
//         )}
//       </div>
//     </div>
//   );
// },
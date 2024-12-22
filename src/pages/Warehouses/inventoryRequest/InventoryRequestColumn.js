import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { TbEye, TbEyeOff } from 'react-icons/tb';
import UseSetParams from '../../../helper/UseSetParams';
import { hasPermission } from '../../../permission/module';
import Common from '../../../api/http_request/Model/common/common';

import DeleteBox from '../../../components/automation/AutomationFunctionButtons/DeleteBox';
import SelectFilterTable from '../../../components/MicroComponents/table/SelectFilterTable';
import GetWarehouseLocationList from '../../../api/http_request/Model/common/GetWarehouseLocationList';
import StatusFilterTable from '../../../components/MicroComponents/table/StatusFilterTable';
import SearchFilterTable from '../../../components/MicroComponents/table/SearchFilterTable';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import StatusBox from './StatusBox';
import CommentModal from '../../../components/CommentModal';
import GetPositionJobList from '../../../api/http_request/Model/common/GetPositionJobList';
import { seenJson } from '../../../helper/jsons/seenJson';

const InventoryRequestColumn = (defParams, address) => {
  const filter = useSelector((state) => state.TableRedux.filter);
  const [locationList, setLocationList] = useState([]);
  const [locationListLoading, setLocationListLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [getColumnSelectProps] = SelectFilterTable(locationListLoading);
  const [getColumnStatusProps] = StatusFilterTable();
  const [getColumnSearchProps] = SearchFilterTable();
  const [statusList, setStatusList] = useState([]);
  const params = { type: address.replace('inventory_', '') };
  const [handleSetParams] = UseSetParams();

  useEffect(() => {


    Common.request({
      success: ({ result }) => {
        setStatusList(
          result?.map(({ value, name, file_required }) => ({
            value,
            label: name,
            file_required,
          })),
        );
      },
    })
      .addParams(params)
      .inventoryStatus();
  }, []);

  const GetAutomationUser = () => {
    GetPositionJobList((x) => {
      setUserList(
        x?.map((item) => ({
          value: item.id,
          label: item?.name,
        })),
      );
    }, setLocationList, params);
  };

  const handleGetWarehouseLocationList = () => {
    GetWarehouseLocationList(setLocationList, setLocationListLoading);
  };

  const funcHandleSetParams = (newFilter) => {
    handleSetParams(newFilter);
  };

  const columns = [
    {
      title: 'فرستنده',
      dataIndex: 'created_by',
      key: 'created_by',
      ...getColumnSelectProps(
        filter?.from,
        'from',
        'فرستنده',
        userList,
        GetAutomationUser,
        (res) => {
          funcHandleSetParams([{ key: 'from', value: res }]);
        },
      ),
      render: (text, row) => {
        return (
          <div className="text-start d-flex align-items-center gap-1 ">
            <img
              className="circleImageMini "
              src={row.image_of_created_by || '/user0.PNG'}
              alt="userImage"
            />
            <span>{text}</span>
          </div>
        );
      },
    },
    {
      title: 'شماره نامه',
      dataIndex: 'number',
      key: 'number',

      ...getColumnSearchProps('شماره نامه', filter.number, (res) => {
        funcHandleSetParams([{ key: 'number', value: res }]);
      }),
    },

    ...(address !== 'inventory_buy_request'
      ? [

        {
          title: 'مبدا',
          dataIndex: 'warehouse_location_name',
          key: 'warehouse_location_name',

          ...getColumnSelectProps(
            filter.warehouse_location_ids,
            'warehouse_location_ids',
            'مبدا',
            locationList,
            handleGetWarehouseLocationList,
            (res) => {
              funcHandleSetParams([{ key: 'warehouse_location_ids', value: res }]);
            },
          ),
        },
      ]
      : []),


    {
      title: 'مقصد',
      dataIndex: 'to_warehouse_location_name',
      key: 'to_warehouse_location_name',

      ...getColumnSelectProps(
        filter.to_warehouse_location_ids,
        'to_warehouse_location_ids',
        'مقصد',
        locationList,
        handleGetWarehouseLocationList,
        (res) => {
          funcHandleSetParams([{ key: 'to_warehouse_location_ids', value: res }]);
        },
      ),
    },
    // {
    //   title: 'مجوز',
    //   dataIndex: 'certifications',
    //   key: 'certifications',
    //
    //   ...getColumnSelectProps(
    //     filter.certifications_ids,
    //     'certifications_ids',
    //     'مجوز',
    //     [],
    //     null,
    //     (res) => {
    //       funcHandleSetParams([{ key: 'certifications_ids', value: res }]);
    //     },
    //   ),
    //
    //   render: (text) => {
    //     return (
    //       <div className="d-flex align-items-center gap-1">
    //         {text && text.length ? (
    //           text.map((item) => (
    //             <Tooltip title={item.status_title} key={item.status_id}>
    //               {/*{item.status_id === 4 ? <MdOutlineHighQuality /> : <MdOutlineHighQuality />}*/}
    //             </Tooltip>
    //           ))
    //         ) : (
    //           <span> درحال بررسی </span>
    //         )}
    //       </div>
    //     );
    //   },
    // },

    {
      dataIndex: 'last_statuses',
      key: 'last_statuses',
      title: 'وضعیت',
      ...getColumnStatusProps(
        filter.positions,
        filter.last_statuses,
        'last_statuses',
        userList,
        GetAutomationUser,
        (positions) => {
          funcHandleSetParams([{ key: 'positions', value: positions }]);
        },
        (statuses) => {
          funcHandleSetParams([{ key: 'last_statuses', value: statuses }]);
        },
        null,
        statusList,
        'سمت',
      ),

      render: (text) => {
        return (
          <div className="d-flex flex-column">
            {text?.length > 0 ? (
              <>
                {text.map((i) => (
                  <span
                    className="mb-1"
                    style={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                      color: i?.status === 1 ? '#1abc1a' : '#f93737',
                    }}
                    key={i?.name}
                  >
                    {i?.name}
                  </span>
                ))}
              </>
            ) : (
              <span> درحال بررسی </span>
            )}
          </div>
        );
      },
    },
    {
      title: 'وضعیت دیدن',
      dataIndex: 'seen',
      key: 'seen',
      ...getColumnSelectProps(
        filter.read,
        'read',
        'وضعیت دیدن',
        seenJson,
        null,
        (res) => {
          funcHandleSetParams([{ key: 'read', value: res }]);
        },
        '',
      ),
      render: (text) => {
        return (

          text ? <span className="text-success"><TbEye title={22} /></span>
            :
            <span className="text-danger"><TbEyeOff title={22} /></span>


        );
      },
    },
    {
      title: 'عملیات',
      dataIndex: 'function',
      key: 'function',
      fixed: 'right',
      hidden: defParams?.status === 'completed',
      render: (text, row) => {
        return (
          <div className="text-center d-flex flex-column w-100">
            <div className="text-center d-flex gap-1 d-flex justify-content-center">
              {defParams?.status !== 'in_progress' && (
                <>
                  {hasPermission('inventory_request', ['delete']) && (
                    <DeleteBox inDetail address="inventory_request" rowData={row} />
                  )}
                  {hasPermission('inventory_request', ['edit']) && row.can_edit && (
                    <Link to={`/warehouses/inventoryRequest/edit/${row.id}`}>
                      <IconBtn
                        TooltipText="ویرایش"
                        btnClass="orangeIconBtn"
                        icon={<FiEdit size={22} />}
                      />
                    </Link>
                  )}
                  <StatusBox statusArray={statusList} rowData={row} address={address} />
                </>
              )}
              {row.can_reply && (
                <CommentModal dontSendFile address="inventory_request" rowData={row} />
              )}
            </div>
          </div>
        );
      },
    },
  ].filter((item) => !item.hidden);
  return [columns];
};

export default InventoryRequestColumn;

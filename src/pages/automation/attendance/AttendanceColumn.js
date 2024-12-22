import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DateObject from 'react-date-object';
import { Tooltip } from 'antd';
import { FaFingerprint } from 'react-icons/fa';
import { LuScanFace } from 'react-icons/lu';
import { FaPersonRunning } from 'react-icons/fa6';
import { RiSlowDownFill } from 'react-icons/ri';
import { BiError  } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import GetAutomationUserList from '../../../api/http_request/Model/automation/automationUserList';
import SelectFilterTable from '../../../components/MicroComponents/table/SelectFilterTable';
import UseSetParams from '../../../helper/UseSetParams';
import DateFilterTable from '../../../components/MicroComponents/table/DateFilterTable';
import { deviceNumberList } from '../../../helper/jsons/deviceNumberList';

const AttendanceColumn = () => {
  const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);
  const [userList, setUserList] = useState([]);
  const filter = useSelector((state) => state.TableRedux.filter);
  const [getColumnSelectProps] = SelectFilterTable();
  const [getColumnDateProps] = DateFilterTable();

  const [handleSetParams] = UseSetParams();
  const funcHandleSetParams = (newFilter) => {
    handleSetParams(newFilter);
  };

  const GetAutomationUser = () => {
    GetAutomationUserList((x) => {
      setUserList(
        x?.map((item) => ({
          value: item.id,
          label: item?.name,
        })),
      );
    }, null, { deactivate: 1 });
  };
  const columns = [


    {
      title: 'نام و نام خانوادگی',
      dataIndex: 'user',
      render: (text) => {
        return (


          <div className="text-start d-flex align-items-center gap-2 ">
            <Tooltip title="جستجوی این کاربر"><span onClick={() => {
              funcHandleSetParams([{ key: 'person_id', value: [text.id] }]);
            }}><CiSearch /></span></Tooltip>
            <span>{text ? `${text?.first_name} ${text?.last_name}` : ''} </span>
          </div>
        )
          ;
      },
      key: 'person_id',
      ...getColumnSelectProps(
        filter?.person_id,
        'person_id',
        'نام و نام خانوادگی',
        userList,
        GetAutomationUser,
        (res) => {
          funcHandleSetParams([{ key: 'person_id', value: res }]);
        },
        undefined,
        ['message'].includes(automationAddress),
      ),
    },


    {
      title: 'تاریخ',
      dataIndex: 'date',
      key: 'date',
      render: (x) => {
        return (
          <p className="mb-0">
            <span>{x}</span>

          </p>
        );
      },
      ...getColumnDateProps(
        [
          filter.from_date &&
          new DateObject({
            date: filter.from_date * 1000,
          }),
          filter.end_date &&
          new DateObject({
            date: filter.end_date * 1000,
          }),
        ],
        (res) => {
          funcHandleSetParams([
            { key: 'from_date', value: res.from_date },
            { key: 'end_date', value: res.end_date },
          ]);
        },
      ),
    },
    {
      title: 'شروع',
      dataIndex: 'time_in',
      key: 'time_in',
      render: (x, row) => {
        return (
          <div
            className={`d-flex align-items-center gap-2 justify-content-center orangeText ${(row.takhir && !row.tatil) ? 'text-danger' : 'orangeText'}`}>
            {row.type ? <span>{row.type[0] === 'face' ?
              <Tooltip title="شروع با اسکن چهره">
                <LuScanFace size={20} /></Tooltip>
              : row.type[0] === 'finger' ?
                <Tooltip title="شروع با اثر انگشت"><FaFingerprint size={18} />
                </Tooltip> : '...'}</span> : '...'}
            <span className={ (row.takhir && !row.tatil) ? 'text-danger' : 'text-black'}>{x}</span>
          </div>
        );
      },


    },
    {
      title: 'پایان',
      dataIndex: 'time_out',
      key: 'time_out',
      render: (x, row) => {
        return (
          <div
            className={`d-flex align-items-center gap-2 justify-content-center orangeText ${ (row.tajil && !row.tatil) ? 'text-danger' : 'orangeText'}`}>
            {row.type ? <span>{row.type[1] === 'face' ?
              <Tooltip title="پایان با اسکن چهره">
                <LuScanFace size={20} /></Tooltip>
              : row.type[1] === 'finger' ?
                <Tooltip title="پایان با اثر انگشت"><FaFingerprint size={18} /></Tooltip> : '...'}</span> : '...'}
            <span className={(row.tajil && !row.tatil) ? 'text-danger ' : 'text-black'}>{x}</span>

          </div>
        );
      },
    },

    {
      title: 'تاخیر',
      dataIndex: 'takhir',
      key: 'takhir',
      render: (x, row) => {
        return (<div className="d-flex align-items-center justify-content-center gap-2">
            {(x && !row.tatil)  ? <Tooltip title="تاخیر">
              <div className={`d-flex gap-1 align-items-center  text-danger `}>
                <RiSlowDownFill size={20} color="red" /><span>{row.takhir_time}</span>
              </div>
            </Tooltip> : '...'}
          </div>
        );
      },

    },
    {
      title: 'تعجیل',
      dataIndex: 'tajil',
      key: 'tajil',
      render: (x, row) => {
        return (<div className="d-flex align-items-center justify-content-center gap-2">
            {(x && !row.tatil) ? <Tooltip title="تعجیل">
              <div className="text-danger d-flex gap-1 align-items-center"><FaPersonRunning size={20} color="red" /><span>{row.tajil_time}</span>
              </div>
            </Tooltip> : '...'}

          </div>
        );
      },

    },
    {
      title: 'توضیحات',
      dataIndex: 'automation_tajil',
      key: 'automation_tajil',
      render: (x, row) => {
        return (<div className="d-flex flex-column gap-2">
            {
              row.automation_takhir ? (
                <Link to={`/automation/request/${row.automation_takhir?.id}`}>
                  <div className="d-flex align-items-center gap-2 text-black">
                    <span>{row.automation_takhir.type}</span>
                    <div className="d-flex align-items-center gap-1">
                      <span>{row.automation_takhir.start_time}</span>
                      <span>تا</span>
                      <span>{row.automation_takhir.end_time}</span>
                    </div>
                  </div>
                </Link>

              ) : ''


            }
            {
              row.automation_tajil ? (
                <Link to={`/automation/request/${row.automation_tajil.id}`}>
                  <div className="d-flex align-items-center gap-2 text-black">
                    <span>{row.automation_tajil.type}</span>
                    <div className="d-flex align-items-center gap-1">
                      <span>{row.automation_tajil.start_time}</span>
                      <span>تا</span>
                      <span>{row.automation_tajil.end_time}</span>
                    </div>
                  </div>
                </Link>

              ) : ''


            }

              {row.tatil === 1 ?  <div>روز تعطیل عادی</div>  : row.tatil === 2 ?  <div>روز تعطیل رسمی</div>  : ''}

         {row.status === 'unallowable' ?  <div>
            <Tooltip title="خروج غیرمجاز"><BiError  size={20} color="red" />
            </Tooltip>
            <span>خروج غیرمجاز</span>
          </div>: ''}
          </div>
        );
      },

    },
    // {
    //   title: 'خروج غیرمجاز',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: (x) => {
    //     return (<div className="d-flex align-items-center justify-content-center gap-2">
    //
    //
    //       </div>
    //     );
    //   },
    //
    // },

    {
      title: 'محل کار',
      dataIndex: 'device_number',
      key: 'device_number',
      ...getColumnSelectProps(
        filter?.device_number,
        'device_number',
        'محل کار',
        deviceNumberList,
        null,
        (res) => {
          funcHandleSetParams([{ key: 'device_number', value: res }]);
        }, false,
      ),


      render: (x) => {

        return (
          <div className="d-flex align-items-center gap-2 justify-content-center">
            <span>{x === 1 ? 'دفتر مرکزی' : x === 2 ? 'کارخانه' : 'انبار'}</span>
          </div>
        );
      },
    },


  ];
  return [columns];
};

export default AttendanceColumn;



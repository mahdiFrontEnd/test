import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateObject from 'react-date-object';
import { BsPinAngle, BsPinAngleFill } from 'react-icons/bs';
import { TbEye, TbEyeOff } from 'react-icons/tb';
import { Tooltip } from 'antd';
import { CiSearch } from 'react-icons/ci';
import SearchFilterTable from '../MicroComponents/table/SearchFilterTable';
import SelectFilterTable from '../MicroComponents/table/SelectFilterTable';
import UseSetParams from '../../helper/UseSetParams';
import { getAgainHandler, isLoading } from '../../store/loading/LoadingSlice';
import { favoriteAdd } from '../../api/automation/favorite';
import AutomationFunctionButtons from './AutomationFunctionButtons/AutomationFunctionButtons';
import GetAutomationUserList from '../../api/http_request/Model/automation/automationUserList';
import GetAutomationCompanyList from '../../api/http_request/Model/automation/automationCompanyList';
import DateFilterTable from '../MicroComponents/table/DateFilterTable';
import StatusFilterTable from '../MicroComponents/table/StatusFilterTable';
import PriceFilterTable from '../MicroComponents/table/PriceFilterTable';
import { seenJson } from '../../helper/jsons/seenJson';
import GetAutomationTypeList from '../../api/http_request/Model/automation/automationTypeList';
import { moduleList } from '../../helper/jsons/moduleList';
import { ConvertToPrice } from '../../helper/ConvertToPrice';
import { setAutomationAddress } from '../../store/automation/automationSlice';

const AutomationColumn = (address, hiddenItem) => {
  const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);

  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [ListLoading, setListLoading] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const filter = useSelector((state) => state.TableRedux.filter);
  const [getColumnSearchProps] = SearchFilterTable();
  const [getColumnSelectProps] = SelectFilterTable(ListLoading);
  const [getColumnDateProps] = DateFilterTable();
  const [getColumnStatusProps] = StatusFilterTable();
  const [getColumnPriceProps] = PriceFilterTable();

  useEffect(() => {
    dispatch(setAutomationAddress(address));
  }, []);


  // const [getColumnPriceProps,] = PriceFilterTable()
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
  const handlePin = (id, type) => {

    favoriteAdd(
      id,
      type,
      () => {
        dispatch(getAgainHandler());
      },
      (c) => {
        dispatch(isLoading(c));
      },
      dispatch,
    );
  };
  const GetAutomationCompany = () => {
    GetAutomationCompanyList((x) => {
      setCompanyList(
        x?.map((item) => ({
          value: item.id,
          label: item?.name,
        })),
      );
    });
  };
  const GetRequestTypes = () => {
    GetAutomationTypeList((x) => {
      setTypeList(
        x?.map((item) => ({
          value: item.value,
          label: item?.name,
        })),
      );
    }, setListLoading);
  };
  const columns = [
    // {
    // title: 'ردیف', dataIndex: 'row', key: 'row', render: (text, row, index) => {
    //     return index + 1
    // },
    // },

    ...(!hiddenItem.includes('is_favorited')
      ? [
        {
          title: (
            <span
              onClick={() => {
                funcHandleSetParams([
                  { key: 'is_favorited', value: filter.is_favorited ? 0 : 1 },
                ]);
              }}
              className="cursor-pointer"


            >
                  {Number(filter.is_favorited) ? <BsPinAngleFill size={22} color="#FFC107" />
                    : <BsPinAngle size={22} color="#495057" />
                  }





            </span>
          ),
          dataIndex: 'is_favorited',
          key: 'is_favorited',
          render: (text, v) => {
            return (
              <span className="cursor-pointer" onClick={() => {
                handlePin(v.id, v.is_favorited);
              }}>
               {

                 text ? <BsPinAngleFill size={16} color="#FFC107" />
                   : <BsPinAngle size={16} color="#495057" />
               }
             </span>

            );
          },
        },
      ]
      : []),

    {
      title: 'فرستنده',
      dataIndex: 'created_by',
      render: (text, row) => {

        return (
            <div className="text-start d-flex align-items-center gap-2 ">
            <img
              className="circleImageMini "
              src={row.image_of_created_by?.length > 4 ? row.image_of_created_by : '/noImage.png'}
              alt="userImage"
            />


                  <Tooltip title="جستجوی این کاربر"><span onClick={() => {
                    funcHandleSetParams([{ key: 'from', value: [row.created_user_id] }]);
                  }}><CiSearch /></span></Tooltip>

                <span>{text}</span>


            </div>
        );
      },
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
        undefined,
        ['message'].includes(automationAddress),
      ),
    },

    ...(!hiddenItem.includes('subjectText')
      ? [
        {
          render: (text) => {
            return (
              <span className="fw-bold fs-6">{text}</span>

            );
          },
          title: 'موضوع',
          className: 'ellipsis-column', // Add custom class
          // ellipsis: {
          //   showTitle: false,
          // },
          dataIndex: 'subject',
          key: 'subject',
          ...getColumnSearchProps('موضوع', filter.search_subject, (res) => {
            funcHandleSetParams([{ key: 'search_subject', value: res }]);
          }),
        },
      ]
      : []),

    ...(!hiddenItem.includes('subjectSelect')
      ? [
        {
          title: 'موضوع',
          dataIndex: 'subject',
          key: 'subject',

          render: (text, row) => {
            return (


           <div className="d-flex align-items-center gap-2">
             <Tooltip title={`جستجوی ${text} ها`}><span onClick={() => {
               funcHandleSetParams([{ key: 'types', value: row.type }]);
             }}><CiSearch /></span></Tooltip>

             <span>{text}</span>




           </div>
            );
          },
          ...getColumnSelectProps(
            filter.types,

            'types',
            'موضوع',
            typeList,
            GetRequestTypes,
            (res) => {
              funcHandleSetParams([{ key: 'types', value: res }]);
            },
            'single',
          ),
        },
      ]
      : []),

    ...(!hiddenItem.includes('company')
      ? [
        {
          title: 'شرکت',
          dataIndex: 'company',
          key: 'company',
          ...getColumnSelectProps(
            filter.company,
            'company',
            'شرکت',
            companyList,
            GetAutomationCompany,
            (res) => {
              funcHandleSetParams([{ key: 'company', value: res }]);
            },
          ),
        },
      ]
      : []),


    // ...!hiddenItem.includes('body') ? [{
    //     title: 'متن', dataIndex: 'body', key: 'body', ...getColumnSearchProps('متن', filter.body, (res) => {
    //         funcHandleSetParams([{key: 'body', value: res}])
    //     },['message'].includes(automationAddress))
    //
    //
    // }] : [],
    ...(!hiddenItem.includes('price')
      ? [
        {
          title: 'مبلغ (ریال)',
          dataIndex: 'price',
          key: 'price',
          render: (item) => {
            return <span>{ConvertToPrice(item)}</span>;
          },
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
      ]
      : []),
    ...(!hiddenItem.includes('detail')
      ? [
        {
          title: 'جزییات / تاریخ',
          render: (text, row) => {
            return (
              <>
                <div className="d-flex justify-content-center ">
                  {row?.type === 'imprest' ? (
                    <span className="d-flex gap-1">
                        <span>{ConvertToPrice(row.price)}</span>
                        <span>ریال</span>
                      </span>
                  ) : row.start_time ? (
                    <div className="d-flex gap-2">
                      <div className="d-flex gap-1">
                        <span>{row.start_time}</span>
                        <span>-</span>
                        <span>{row.end_time}</span>
                      </div>
                      /
                      <div>{row.start_date}
                        {/*{row.start_date*/}
                        {/*  ? new DateObject({*/}
                        {/*    date: row.start_date * 1000,*/}
                        {/*    calendar: persian,*/}
                        {/*    locale: persian_fa,*/}
                        {/*  }).format('DD MMMM YYYY')*/}
                        {/*  : '-'}*/}
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex gap-1">
                        <span>{row.start_date}
                          {/*{row.start_date*/}
                          {/*  ? new DateObject({*/}
                          {/*    date: row.start_date * 1000,*/}
                          {/*    calendar: persian,*/}
                          {/*    locale: persian_fa,*/}
                          {/*  }).format('DD MMMM YYYY')*/}
                          {/*  : '-'}*/}
                        </span>
                      {row.end_date && (<>
                          <span>-</span>
                          <span>
                            {row.end_date}
                            {/*{new DateObject({*/}
                            {/*  date: row.end_date * 1000,*/}
                            {/*  calendar: persian,*/}
                            {/*  locale: persian_fa,*/}
                            {/*}).format('DD MMMM YYYY')}*/}
                          </span></>
                      )}
                    </div>
                  )}
                </div>
              </>
            );
          },
          dataIndex: 'detail',
          key: 'detail',
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
                {
                  key: 'end_date',
                  value: res.end_date,
                },
              ]);
            },
          ),
        },
      ]
      : []),

    ...(!hiddenItem.includes('computing')
      ? [
        {
          title: 'محاسبه',
          dataIndex: 'detail',
          key: 'detail',
          render: (x, c) => {
            return (
              <p className="mb-0">
                <span>{c.estimate_time}</span>
                {/*{c.before_total_estimate_time &&*/}
                {/*  hasPermission(automationAddress, ['reject', 'approve']) && (*/}
                {/*    <>*/}
                {/*      <hr className="my-0" />*/}
                {/*      <span>{c.before_total_estimate_time}</span>*/}
                {/*    </>*/}
                {/*  )}*/}
              </p>
            );
          },
        },
      ]
      : []),
    ...(!hiddenItem.includes('time')
      ? [
        {
          render: (text) => {

            const myArray = text.split(' ');


            return (
              <div className="d-flex gap-2 justify-content-center">
                <span>{myArray[0]}</span>
                <span>{myArray[1]}</span><br />
              </div>
            );
          },
          title: 'زمان',
          dataIndex: 'created_at',
          key: 'created_at',
          ...getColumnDateProps(
            [
              filter.from_create_date ?
                new DateObject({
                  date: filter.from_create_date * 1000,
                }) : '',
              filter.end_create_date ?
                new DateObject({
                  date: filter.end_create_date * 1000,
                }) : '',
            ],
            (res) => {
              funcHandleSetParams([
                { key: 'from_create_date', value: res.from_date },
                {
                  key: 'end_create_date',
                  value: res.end_date,
                },
              ]);
            },
            ['message'].includes(automationAddress), ['from_create_date',
              'end_create_date'],
          ),
        },
      ]
      : []),


    ...(!hiddenItem.includes('number')
      ? [
        {
          title: ' شماره نامه',
          dataIndex: 'number',
          key: 'number',
          ...getColumnSearchProps('شماره نامه', filter.number, (res) => {

            funcHandleSetParams([{ key: 'number', value: res.replace('#', '') }]);
          }),
        },
      ]
      : []),


    ...(!hiddenItem.includes('status')
      ? [
        {
          dataIndex: 'last_statuses',
          key: 'last_statuses',
          title: 'وضعیت',
          ...getColumnStatusProps(
            filter.last_statuses_users,
            filter.last_statuses,
            'last_statuses',
            userList,
            GetAutomationUser,
            (users) => {
              funcHandleSetParams([{ key: 'last_statuses_users', value: users }]);
            },
            (statuses) => {
              funcHandleSetParams([{ key: 'last_statuses', value: statuses }]);
            },
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
                          color: i.status === 1 ? '#1abc1a' : '#f93737',
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
      ]
      : []),

    ...(!hiddenItem.includes('module_name')
      ? [
        {
          title: 'عنوان',

          dataIndex: 'module_name',
          key: 'module_name',
          ...getColumnSelectProps(
            filter.module,
            'module',
            'عنوان',
            moduleList,
            null,
            (res) => {
              funcHandleSetParams([{ key: 'module', value: res }]);
            },
            false,
            ['message'].includes(automationAddress),
          ),
        },
      ]
      : []),

    ...(!hiddenItem.includes('seen')
      ? [
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
              // <i
              //   className={`bi fs-2 ${text ? 'bi-eye text-success' : 'bi-eye-slash text-warning'}`}
              // ></i>

              text ? <span className="text-success"><TbEye size={20} /></span> :
                <span className="text-warning"><TbEyeOff size={20} /></span>


            );
          },
        },
      ]
      : []),

    ...(!hiddenItem.includes('function')
      ? [
        {
          title: 'عملیات',
          dataIndex: 'function',

          key: 'function',
          fixed: 'right',
          render: (text, row) => {
            return <AutomationFunctionButtons row={row} />;
          },
        },
      ]
      : []),
  ];
  return [columns];
};

export default AutomationColumn;
import React, { useEffect, useState } from 'react';
import { Form, Skeleton } from 'antd';

import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { LuCheckSquare } from 'react-icons/lu';
import ComponentCard from '../../../../components/ComponentCard';
import TopBox from './TopBox';
import TopTable from './TopTable';
import Inventory from '../../../../api/http_request/Model/inventory/Inventory';
import {
  resetState,
  setCost_center_code,
  setInventoryRequestData,
} from '../../../../store/inventoryRequest/InventoryRequest';
import ShowBox from './ShowBox';
import FormBox from './FormBox';
import BreadcrumbDetail from '../../../../layouts/breadcrumbs/BreadcrumbDetail';
import Error from '../../../not-found/Error';
import LastStatuses from './LastStatuses';

import MoreData from './MoreData/MoreData';

const InventoryRequestSingle = ({ pageType, address, title, linkAddress }) => {
  // const [searchParams] = useSearchParams();`
  const getAgain = useSelector((state) => state.loadingReducer.getAgain);

  const location = useLocation();
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [typeList, setTypeList] = useState([]);
  const [editingKey, setEditingKey] = useState();
  const [isEditable] = useState(['create', 'edit'].includes(pageType));
  const [data, setData] = useState({});
  const [notFoundId, setNotFoundId] = useState(false);
  const [loading, setLoading] = useState(false);
  const inventoryRequestData = useSelector(
    (state) => state.InventoryRequestRedux.InventoryRequestData,
  );
  useEffect(() => {
    // dispatch(setInventoryRequestData({ items: [] }));
    dispatch(resetState());
    if (id) {
      Inventory.request({
        beforeSend: () => {
          setLoading(true);
        },
        success: ({ result }) => {
          setData(result);
          const {
            section_id,
            delivery_type_name,
            delivery_type_id,
            to_warehouse_location_id,
            to_warehouse_location_name,
            customer_name,
            warehouse_location_id,
            warehouse_location_name,
            section_name,
            cost_center_code,
            statuses,
            receipts,
            remittances,
            last_statuses,
          } = result;

          const newArr = [];
          result.items.map(
            ({
               description,
               name,
               type_name,
               product_name,
               warehouse,
               to_warehouse,
               quantity,
               product_sku,
               measurement_name,
               place_consumption_name,
               // eslint-disable-next-line array-callback-return
             }) => {
              newArr.push({
                description,
                quantity,
                measurement_name,
                type_name,
                warehouse,
                receipts,
                to_warehouse,
                product: `${name}${product_name && `/${product_name}`}`,
                productIds: product_sku,
                inventory_place_consumption: place_consumption_name,
              });
            },
          );

          dispatch(
            setInventoryRequestData({
              // ...inventoryRequestData,
              section_id,
              receipts,
              remittances,
              delivery_type_name: `${delivery_type_name}`,
              delivery_type_id: `${delivery_type_id}`,
              to_warehouse_location_name,
              customer_name,
              statuses,
              last_statuses,
              to_warehouse_location_id: `${to_warehouse_location_id || ''}`,
              warehouse_location_id: `${warehouse_location_id}`,
              warehouse_location_name,
              section_name,
              cost_center_code,
              items: [...newArr],
            }),
          );
          dispatch(setCost_center_code(cost_center_code));
        },
        error: (error) => {
          toast.error(error?.error?.data?.message);
          if (error.error_code === 404) {
            setNotFoundId(true);
          }
        },
        final: () => {
          setLoading(false);
        },
      }).getInventoryRequest(id, address);
    }
  }, [id, pageType, location, getAgain]);
  useEffect(() => {
    form.resetFields();
  }, [editingKey]);

  useEffect(() => {
    const newTypeList = [];

    inventoryRequestData.items?.map((item) => {
      const type = item.type_name;

      if (!newTypeList.includes(type)) {
        newTypeList.push(type);
      }
      return null;
    });
    setTypeList(newTypeList);
  }, [inventoryRequestData.items]);

  if (loading) return <Skeleton loading={loading} active />;
  if (notFoundId) return <Error />;

  return (
    <div>
      <BreadcrumbDetail title={title} hiddenTitle linkAddress={linkAddress} useBackBtn />

      <TopBox
        data={data}
        typeList={typeList}
        id={id}
        pageType={pageType}
        title={title}
        address={address}
        linkAddress={linkAddress}
      />

      <ComponentCard>
        {pageType === 'show' &&
          <div className="mb-4 d-flex gap-3">
            <div className="keyValue">
              <div className="key">ایجاد کننده:</div>
              <div className="value">{data.created_by}</div>
            </div>
            <div className="keyValue">
              <div className="key">تاریخ ایجاد:</div>
              <div className="value">{data.created_at}</div>
            </div>
          </div>}
        <TopTable pageType={pageType} address={address} linkAddress={linkAddress} />

        <div className="border border-bottom-0 border-top-0 p-3 d-flex gap-2 align-items-center flex-wrap border-1">
          {typeList.map((item) => (
            <>
              {item !== '' && (
                <div key={item} className="d-flex gap-1 ">
                 <span className="text-warning">

                  <LuCheckSquare size={22} />
                 </span>
                  <span>{item}</span>
                </div>
              )}
            </>
          ))}
        </div>

        <div className="border border-1 ">
          {isEditable && (
            <div>
              {!editingKey ? (
                <FormBox
                  address={address}
                  linkAddress={linkAddress}
                  pageType={pageType}
                  formName={form2}
                  resetForm2={() => {
                    form2.resetFields();
                  }}
                  setEditingKey={setEditingKey}
                  isEditable={isEditable}
                />
              ) : (
                <p
                  style={{ height: '64px' }}
                  className="mb-0 d-flex align-items-center ps-3 fw-bold"
                >
                  برای افزودن کالا ابتدا ویرایش کالاهای قبلی را به سرانجام برسانید.
                </p>
              )}
            </div>
          )}
          <div className="">
            {inventoryRequestData.items.map((item, index) => (
              <>
                <hr className="m-0" />
                {index === editingKey - 1 ? (
                  <FormBox
                    address={address}
                    pageType={pageType}
                    isEditable={isEditable}
                    formName={form}
                    setEditingKey={setEditingKey}
                    item={item}
                    index={index}
                    showButton="showButton"
                  />
                ) : (
                  <ShowBox
                    address={address}
                    pageType={pageType}
                    item={item}
                    index={index}
                    setEditingKey={setEditingKey}
                  />
                )}
              </>
            ))}
          </div>
        </div>
      </ComponentCard>

      <LastStatuses />

      {pageType === 'show' && inventoryRequestData && (
        <MoreData singleData={data}
                  address={address}
                  pageType={pageType}
                  id={id}
                  inventoryRequestData={inventoryRequestData}
        />
      )}
    </div>
  );
};

export default InventoryRequestSingle;

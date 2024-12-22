import React, { useEffect, useState } from 'react';
import { Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import GetInventoryDeliveryTypeList from '../../../../api/http_request/Model/common/inventoryDeliveryTypeList';
import GetWarehouseLocationList from '../../../../api/http_request/Model/common/GetWarehouseLocationList';
import GetSectionList from '../../../../api/http_request/Model/common/GetSectionList';

import Inventory from '../../../../api/http_request/Model/inventory/Inventory';
import { setCost_center_code, setInventoryRequestData } from "../../../../store/inventoryRequest/InventoryRequest";
import customerList from '../../../../api/http_request/Model/common/customerList';
import ShowTopTable from './ShowTopTable';
import GetSupplierList from '../../../../api/http_request/Model/commerce/supplier';

const TopTable = ({ pageType, address, linkAddress }) => {
  const inventoryRequestData = useSelector(
    (state) => state.InventoryRequestRedux.InventoryRequestData,
  );
  const cost_center_code = useSelector(
    (state) => state.InventoryRequestRedux.cost_center_code,
  );
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [suppliers, setSuppliers] = useState([]);
  const [suppliersLoading, setSuppliersLoading] = useState(false);
  const [sectionListLoading, setSectionListLoading] = useState(false);
  const [sectionList, setSectionList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [toLocationList, setToLocationList] = useState([]);
  const [deliveryList, setDeliveryList] = useState([]);
  const [deliveryLoading, setDeliveryLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [type] = useState(searchParams.get('type'));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitForm = () => {
    const data = {};
    const arr = [];
    data.delivery_type_id = Number(inventoryRequestData.delivery_type_id);
    data.section_id = Number(inventoryRequestData.section_id);
    data.cost_center_code = Number(cost_center_code);
    data.warehouse_location_id = Number(inventoryRequestData.warehouse_location_id);
    data.supplier_id = Number(inventoryRequestData.warehouse_location_id);
    if(type){
      data.type = type ;

    }

    if (inventoryRequestData.to_warehouse_location_id) {
      data.to_warehouse_location_id = Number(inventoryRequestData.to_warehouse_location_id);
    } else {
      data.customer_id = Number(inventoryRequestData.customer_id);
    }

    inventoryRequestData.items.map(
      ({
        quantity,
        to_warehouse,
        warehouse,
        description,
        productIds,
        batch_number,
        inventory_place_consumption,
      }) => {
        const val = {
          sku_id: Number(productIds[productIds.length - 1]),
          quantity: Number(quantity),
          place_consumption_id: Number(inventory_place_consumption?.id),
          warehouse_id: Number(warehouse?.id),
          description,
        };
        if (to_warehouse) {
          val.to_warehouse_id = Number(to_warehouse?.id);
        }
        if (batch_number) {
          val.batch_number = batch_number;
        }
        arr.push(val);

        return null;
      },
    );

    if (address === 'inventory_remittance') {
      data.type = 'sell';
    }
    data.items = arr;
    setLoading(true);
    Inventory.request({
      success: (result) => {
        toast.success(result.message);
        navigate(`/warehouses/${linkAddress}`);
      },
      error: (response) => {
        if (response?.response) {
          toast.error(response?.response?.data?.message);
        } else {
          toast.error(response?.message);
        }
      },
      final: () => {
        setLoading(false);
      },
    }).inventoryRequest(data, pageType === 'edit' ? 'put' : 'post', id, address);
  };

  useEffect(() => {
    let params = {};
    if (type) {
      params = { type };
    }

    if (address === 'inventory_remittance') {
      customerList(setToLocationList, setLocationLoading);
    }
    if (address === 'inventory_receipt' && type === 'purchase') {
      GetSupplierList((result) => {
        let arr = [];
        // eslint-disable-next-line array-callback-return
        result.map((item) => {
          arr = [...arr, { value: `${item.id}`, label: item.name }];
        });

        setSuppliers(arr);
      }, setSuppliersLoading);
    }
    GetWarehouseLocationList(
      (e) => {
        setLocationList(e);

        if (address !== 'inventory_remittance') {
          setToLocationList(e);
        }
      },
      setLocationLoading,
      params,
    );

    GetInventoryDeliveryTypeList(setDeliveryList, setDeliveryLoading);

    GetSectionList(
      (e) => {
        setSectionList(e);
        // if (e.length && !inventoryRequestData.section_id && pageType === 'create') {
        //   dispatch(
        //     setInventoryRequestData({
        //       ...inventoryRequestData,
        //       // section_id: e[0].id,
        //       cost_center_code: e[0].cost_center_code,
        //     }),
        //   );
        // }
      },
      setSectionListLoading,
      'inventory',
    );
  }, []);
  return (
    <div className="border border-1">
      {pageType !== 'show' ? (
        <div className="d-flex">
          <div className="d-flex flex-1 justify-content-center border-1 px-3 py-2 align-items-center  border-end   ">
            <Select
              className="w-75"
              placeholder="واحد درخواست کننده"
              onChange={(e, x) => {
                dispatch(
                  setInventoryRequestData({
                    ...inventoryRequestData,
                    section_name: x.name,
                    section_id: e,
                  }),
                );
                dispatch(setCost_center_code(x.cost_center_code));
              }}
              value={inventoryRequestData.section_id}
              loading={sectionListLoading}
              defaultActiveFirstOption
              options={sectionList}
              // disabled={sectionList.length === 1}
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </div>
          <div className="d-flex justify-content-center border-1 px-3 py-2 align-items-center  border-end  keyValue">
            <div className="key">کد مرکز هزینه:</div>
            <div className="value">{cost_center_code}</div>
          </div>
          {address !== 'inventory_temporary_receipt' && (
            <div className="d-flex justify-content-center border-1 py-2  border-end flex-1 align-items-center">
              <Select
                className="w-75"
                showSearch
                placeholder="نوع تحویل"
                loading={deliveryLoading}
                options={deliveryList}
                allowClear
                filterOption={(input, option) => {
                  return (option?.label.toLowerCase() ?? '').includes(input.toLowerCase());
                }}
                onChange={(e) => {
                  dispatch(
                    setInventoryRequestData({ ...inventoryRequestData, delivery_type_id: e }),
                  );
                }}
                value={inventoryRequestData.delivery_type_id || null}
              />
            </div>
          )}
          { address !== "inventory_buy_request" &&
            <div className="d-flex justify-content-center flex-1   py-2   align-items-center  ">
              <Select
                disabled={inventoryRequestData.items?.length}
                className="w-75"
                placeholder={
                  address === 'inventory_receipt' && type === 'purchase'
                    ? 'تامین کننده'
                    : 'مبدا_مرکز نگهداری انبار'
                }
                loading={
                  address === 'inventory_receipt' && type === 'purchase'
                    ? suppliersLoading
                    : locationLoading
                }
                showSearch
                options={
                  address === 'inventory_receipt' && type === 'purchase' ? suppliers : locationList
                }
                allowClear
                filterOption={(input, option) => {
                  return (option?.label.toLowerCase() ?? '').includes(input.toLowerCase());
                }}
                onChange={(e) => {
                  // dispatch(setWarehouse_location_id(e));
                  const data = { warehouse_location_id: e };
                  if (address === 'inventory_temporary_receipt') {
                    data.to_warehouse_location_id = e;
                  }
                  dispatch(
                    setInventoryRequestData({
                      ...inventoryRequestData,
                      ...data,
                    }),
                  );
                }}
                value={inventoryRequestData.warehouse_location_id}
              />
            </div>
          }
          <div className="d-flex justify-content-center flex-1   py-2   align-items-center  ">
            <Select
              disabled={
                inventoryRequestData.items?.length || address === 'inventory_temporary_receipt'
              }
              className="w-75"
              placeholder={address === 'inventory_remittance' ? 'مشتری' : 'مقصد_مرکز نگهداری انبار'}
              loading={locationLoading}
              showSearch
              options={toLocationList}
              allowClear
              filterOption={(input, option) => {
                return (option?.label.toLowerCase() ?? '').includes(input.toLowerCase());
              }}
              onChange={(e) => {
                const value =
                  address === 'inventory_remittance'
                    ? { customer_id: e }
                    : { to_warehouse_location_id: e };
                // dispatch(setWarehouse_location_id(e));
                dispatch(setInventoryRequestData({ ...inventoryRequestData, ...value }));
              }}
              value={
                inventoryRequestData.to_warehouse_location_id || inventoryRequestData.customer_id
              }
            />
          </div>
          <div className="d-flex px-3 justify-content-center  py-2 align-items-center  ">
            <Button
              loading={loading}
              disabled={!inventoryRequestData.items?.length}
              className="defBtn orangeBtn"
              onClick={() => {
                submitForm();
              }}
            >
              ثبت اطلاعات
            </Button>
          </div>
        </div>
      ) : (
        <ShowTopTable address={address} />
      )}
    </div>
  );
};

export default TopTable;

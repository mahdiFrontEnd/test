import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cascader, Form, Input, Select } from 'antd';
import { useSearchParams } from "react-router-dom";
import { IoCheckmark } from 'react-icons/io5';
import { CiCircleRemove } from 'react-icons/ci';
import {
  setEditedDataRow,
  setInventoryRequestData,
} from '../../../../store/inventoryRequest/InventoryRequest';
import GetInventoryPlace from '../../../../api/http_request/Model/common/GetInventoryPlace';
import GetWarehouses from '../../../../api/http_request/Model/common/GetWarehouses';
import IconBtn from '../../../../components/MicroComponents/button/IconBtn';
import GetProductSku from '../../../../api/http_request/Model/common/GetProductSku';
import GetBatchList from '../../../../api/http_request/Model/common/GetBatchList';

const FormBox = ({
  formName,
  pageType,
  item,
  index,
  showButton,
  setEditingKey,
  isEditable,
  resetForm2,
  address,
}) => {
  const dispatch = useDispatch();

  const inventoryRequestData = useSelector(
    (state) => state.InventoryRequestRedux.InventoryRequestData,
  );
  const editedDataRow = useSelector((state) => state.InventoryRequestRedux.editedDataRow);
  const [searchParams] = useSearchParams();
  const [type] = useState(searchParams.get('type'));

  const [selectedProductId, setSelectedProductId] = useState([]);
  // const [unit, setUnit] = useState('');
  const [toWarehouseLoading, setToWarehouseLoading] = useState(false);
  const [toWarehouseList, setToWarehouseList] = useState([]);
  const [fromWarehouseLoading, setFromWarehouseLoading] = useState(false);
  const [fromWarehouseList, setFromWarehouseList] = useState([]);

  const [inventoryPlaceList, setInventoryPlaceList] = useState([]);
  const [inventoryPlaceLoading, setInventoryPlaceLoading] = useState(false);
  const [skuProductLoading, setSkuProductLoading] = useState(false);
  const [skuProductList, setSkuProductList] = useState([]);
  const [batchLoading, setBatchLoading] = useState(false);
  const [batchList, setBatchList] = useState([]);
  const [batchNumber, setBatchNumber] = useState();

  useEffect(() => {
    if (item) {
      dispatch(setEditedDataRow(item));
      setSelectedProductId(item.productIds);
    }
  }, [item]);

  useEffect(() => {
    if (address === 'inventory_temporary_receipt') {
      GetBatchList(setBatchList, setBatchLoading);
    }
  }, [item]);

  useEffect(() => {
    if (inventoryRequestData.warehouse_location_id && isEditable) {
      GetProductSku(
        setSkuProductList,
        setSkuProductLoading,
        inventoryRequestData.warehouse_location_id,
      );
    }
  }, [inventoryRequestData.warehouse_location_id]);

  let unitName = item?.unit || '';
  const onFinish = () => {
    let newArr = [];

    if (item) {
      newArr = [...inventoryRequestData.items];
      newArr[index] = editedDataRow;
      setEditingKey();
    } else {
      newArr = [editedDataRow, ...inventoryRequestData.items];
      resetForm2();
      // setUnit('');
      dispatch(
        setEditedDataRow({ ...editedDataRow,unit: '' }),
      );
    }
    dispatch(setInventoryRequestData({ ...inventoryRequestData, items: newArr }));
  };

  const onChangeProduct = (ids, row) => {
    if (row?.length) {
      unitName = row[row?.length - 1].measurement_name;
    }

    if (!item) {
      // setUnit(unitName);
      dispatch(
        setEditedDataRow({ ...editedDataRow,unit: unitName }),
      );


    }

    let name = '';
    // eslint-disable-next-line array-callback-return
    row?.map((i) => {
      name += i.name;
    });

    dispatch(
      setEditedDataRow({ ...editedDataRow, product: name, productIds: ids, unit: unitName }),
    );
    setSelectedProductId(ids);
  };
  useEffect(() => {
    // dispatch(setEditedDataRow({...editedDataRow,warehouse : {}}))

    if (selectedProductId?.length ||  batchNumber) {
      const product_id = selectedProductId[selectedProductId?.length - 1];
      const params = {}
      if(address !== 'inventory_receipt' || type !== 'purchase') {
         params.warehouse_location_id =  inventoryRequestData.warehouse_location_id

      }
      if(product_id){
        params.product_id=product_id
      }
      GetInventoryPlace(setInventoryPlaceList, setInventoryPlaceLoading, product_id || null);
      GetWarehouses(setFromWarehouseList, setFromWarehouseLoading, params);
    }
  }, [JSON.stringify(selectedProductId), batchNumber,inventoryRequestData.warehouse_location_id]);

  useEffect(() => {
    if (inventoryRequestData.to_warehouse_location_id) {
      GetWarehouses(setToWarehouseList, setToWarehouseLoading, {
        to_warehouse_location_id: inventoryRequestData.to_warehouse_location_id,
      });
    }
  }, [inventoryRequestData.to_warehouse_location_id]);
  return (
    <>
      {pageType !== 'show' && (
        <Form
          className=" w-100 "
          name={`basic${index}`}
          form={formName}
          initialValues={
            item
              ? {
                  product_sku_id: item.productIds,
                  quantity: item.quantity,
                  inventory_place_consumption_id: item.inventory_place_consumption.id,
                  warehouse_id: item.warehouse.id,
                  to_warehouse_id: item.to_warehouse.id,
                  description: item.description,
                }
              : {}
          }
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="d-flex w-100 gap-2 p-3 ">
            <div className="d-flex gap-1 mx-0 flex-1">
              {address === 'inventory_temporary_receipt' ? (
                <>
                  <div className="flex-3">
                    <Form.Item
                      className="mb-0  pe-2"
                      name="product_sku_id"
                      rules={[
                        {
                          required: true,
                          message: 'لطفا  کالا را انتخاب کنید!',
                        },
                      ]}
                    >
                      <Select
                        className="w-100"
                        showSearch
                        allowClear
                        onChange={(e, x) => {
                          setBatchNumber(e);
                          dispatch(
                            setEditedDataRow({
                              ...editedDataRow,
                              type_name: x.type_name,
                              batch_number: e,
                              product: x.product_name,
                              productIds: [],
                              unit: x.measurement_name,
                            }),
                          );

                          // setUnit(x.measurement_name);
                        }}
                        disabled={
                          (!inventoryRequestData.to_warehouse_location_id &&
                            !inventoryRequestData.customer_id) ||
                          !inventoryRequestData.warehouse_location_id
                        }
                        placeholder="شماره بچ"
                        loading={batchLoading}
                        options={batchList}
                      />
                    </Form.Item>
                  </div>
                </>
              ) : (
                <div className="flex-3">
                  <Form.Item
                    className="mb-0  pe-2"
                    name="product_sku_id"
                    rules={[
                      {
                        required: true,
                        message: 'لطفا  کالا را انتخاب کنید!',
                      },
                    ]}
                  >
                    <Cascader
                      placeholder="کالا"
                      disabled={
                        (!inventoryRequestData.to_warehouse_location_id && !inventoryRequestData.customer_id) ||
                        (!inventoryRequestData.warehouse_location_id  && address !== "inventory_buy_request") ||

                        !inventoryRequestData.delivery_type_id
                      }
                      fieldNames={{ label: 'name', value: 'id', children: 'skus' }}
                      showSearch
                      allowClear
                      loading={skuProductLoading}
                      options={skuProductList}
                      onChange={onChangeProduct}
                    />
                  </Form.Item>
                </div>
              )}

              <div style={{ width: '140px' }}>
              <Form.Item
                className="mb-0 pe-2"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: 'لطفا مقدار را وارد کنید!',
                  },
                ]}
              >
                <Input
                  addonAfter={editedDataRow.unit}
                  placeholder="مقدار"
                  disabled={!selectedProductId?.length && !batchNumber}
                  onChange={(e) => {
                    dispatch(setEditedDataRow({ ...editedDataRow, quantity: e.target.value }));
                  }}
                />
              </Form.Item>
            </div>
              <div className="flex-2">
                <Form.Item
                  className="mb-0 pe-2"
                  name="inventory_place_consumption_id"
                  rules={[
                    {
                      required: true,
                      message: 'لطفا محل مصرف را انتخاب کنید!',
                    },
                  ]}
                >
                  <Select
                    allowClear
                    onChange={(e, x) => {
                      dispatch(
                        setEditedDataRow({
                          ...editedDataRow,
                          inventory_place_consumption: x,
                        }),
                      );
                    }}
                    disabled={!selectedProductId?.length && !batchNumber}
                    placeholder=" محل مصرف"
                    loading={inventoryPlaceLoading}
                    fieldNames={{ label: 'name', value: 'id' }}
                    options={inventoryPlaceList}
                  />
                </Form.Item>
              </div>
              {(address !== 'inventory_receipt' || type !== 'purchase') && address !== "inventory_buy_request" && (
                <div className="flex-2 px-0">
                  <Form.Item
                    className="mb-0 pe-2"
                    name="warehouse_id"
                    rules={[{ required: true, message: 'لطفا مبدا را انتخاب کنید!' }]}
                  >
                    <Select
                      allowClear
                      onChange={(e, x) => {
                        dispatch(setEditedDataRow({ ...editedDataRow, warehouse: x }));
                      }}
                      value={editedDataRow?.warehouse?.id}
                      disabled={!selectedProductId?.length && !batchNumber}
                      placeholder=" مبدا"
                      loading={fromWarehouseLoading}
                      fieldNames={{ label: 'name', value: 'id' }}
                      options={fromWarehouseList}
                    />
                  </Form.Item>
                </div>

              )}
              {address !== 'inventory_remittance' && (
                <div className="flex-2 px-0">
                  <Form.Item
                    className="mb-0 pe-2"
                    name="to_warehouse_id"
                    rules={[{ required: true, message: 'لطفا مقصد را انتخاب کنید!' }]}
                  >
                    <Select
                      allowClear
                      onChange={(e, x) => {
                        dispatch(setEditedDataRow({ ...editedDataRow, to_warehouse: x }));
                      }}
                      value={editedDataRow?.to_warehouse?.id}
                      disabled={!selectedProductId?.length && !batchNumber}
                      placeholder=" مقصد"
                      loading={toWarehouseLoading}
                      fieldNames={{ label: 'name', value: 'id' }}
                      options={toWarehouseList}
                    />
                  </Form.Item>
                </div>
              )}

              <div className="flex-2 px-0">
                <Form.Item className="mb-0 pe-2" name="description">
                  <Input
                    placeholder="توضیحات"
                    disabled={!selectedProductId?.length && !batchNumber}
                    onChange={(e) => {
                      dispatch(setEditedDataRow({ ...editedDataRow, description: e.target.value }));
                    }}
                  />
                </Form.Item>
              </div>
            </div>

            <Form.Item className="mb-0 ">
              <div className="gap-2 d-flex">
                {showButton && (
                  <IconBtn
                    btnClass="orangeIconBtn"
                    icon={<CiCircleRemove size={22} />}
                    onClick={() => {
                      setEditingKey(null);
                      formName.resetFields();
                      formName.setFieldsValue({});
                    }}
                  />
                )}

                <div style={{ marginRight: !showButton && '40px' }}>
                  <IconBtn
                    disabled={!selectedProductId?.length && !batchNumber}
                    btnClass="blueIconBtn"
                    icon={<IoCheckmark size={22} />}
                    onClick={() => {
                      formName.submit();
                    }}
                  />
                </div>
              </div>
            </Form.Item>
          </div>
        </Form>
      )}
    </>
  );
};

export default FormBox;

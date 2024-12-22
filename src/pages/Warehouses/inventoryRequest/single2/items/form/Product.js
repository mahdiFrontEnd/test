import React, { useEffect, useState } from 'react';
import { Cascader, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setEditedDataRow } from '../../../../../../store/inventoryRequest/InventoryRequest';
import GetProductSku from '../../../../../../api/http_request/Model/common/GetProductSku';

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const [skuProductLoading, setSkuProductLoading] = useState(false);
  const [skuProductList, setSkuProductList] = useState([]);

  const { fromWarehouseLocation, toWarehouseLocation, customer,editedDataRow, deliveryType } = useSelector((state) => state.InventoryRequestRedux2);

  const onChangeProduct = (ids, row) => {
    let unitName = item?.unit || '';
    if (row?.length) {
      unitName = row[row?.length - 1].measurement_name;
    }
    if (!item) {
      dispatch(setEditedDataRow({ ...editedDataRow, unit: unitName }));
    }

    let name = '';
    // eslint-disable-next-line array-callback-return
    row?.map((i) => {
      name += i.name;
    });

    dispatch(
      setEditedDataRow({ ...editedDataRow, product: name, productIds: ids, unit: unitName }),
    );
  };

  useEffect(() => {
    if((toWarehouseLocation || customer) && fromWarehouseLocation && deliveryType){

    GetProductSku(setSkuProductList, setSkuProductLoading, fromWarehouseLocation?.value);
    }
  }, [toWarehouseLocation,
    customer,
    fromWarehouseLocation,
    deliveryType,]);
  return (
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
          disabled={(!toWarehouseLocation && !customer) || !fromWarehouseLocation || !deliveryType}
          fieldNames={{ label: 'name', value: 'id', children: 'skus' }}
          showSearch
          allowClear
          loading={skuProductLoading}
          options={skuProductList}
          onChange={onChangeProduct}
        />
      </Form.Item>
    </div>
  );
};

export default Product;

import React, { useEffect, useState } from 'react';
import { Cascader, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import GetProductSku from '../../../../../../api/http_request/Model/common/GetProductSku';
import { setEditeBeforeDataRow } from '../../../../../../store/inventoryRequest/InventoryRequest2';

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const [skuProductLoading, setSkuProductLoading] = useState(false);
  const [skuProductList, setSkuProductList] = useState([]);

  const { fromWarehouseLocation, editeBeforeDataRow } = useSelector(
    (state) => state.InventoryRequestRedux2,
  );

  const onChangeProduct = (ids, row) => {
    let unitName = item?.unit || '';
    if (row?.length) {
      unitName = row[row?.length - 1].measurement_name;
    }
    if (!item) {
      dispatch(setEditeBeforeDataRow({ ...editeBeforeDataRow, unit: unitName }));
    }

    let name = '';
    // eslint-disable-next-line array-callback-return
    row?.map((i) => {
      name += i.name;
    });

    dispatch(
      setEditeBeforeDataRow({
        ...editeBeforeDataRow,
        product: name,
        productIds: ids,
        unit: unitName,
      }),
    );
  };

  useEffect(() => {
    GetProductSku(setSkuProductList, setSkuProductLoading, fromWarehouseLocation?.value);
  }, []);
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

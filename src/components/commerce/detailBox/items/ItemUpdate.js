import React from 'react';

import CurrencyInput from 'react-currency-input-field';
import { Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import SelectFilter from '../../../select/SelectFilter';
import { UpdateItems } from '../../../../store/commerce/purchase/ItemSlice';
import { currencyTypeList } from '../../../../helper/jsons/currencyTypeList';

const ItemUpdate = ({ itemsData, productList }) => {
// const ItemUpdate = ({ itemsData, productList, measurementList }) => {
  const dispatch = useDispatch();
  // const [reloadCompKey, setReloadCompKey] = useState(0);

  return (<div>
    <div className="d-flex gap-4  my-2">
      <div className="flex-1">نام محصول</div>
      <div className="flex-1">مقدار</div>
      <div className="flex-1">تعداد در بسته</div>
      <div className="flex-1">مبلغ</div>
      <div className="flex-1">واحد ارزی</div>

    </div>
    {itemsData.length > 0 && productList && itemsData?.map((item) => {
      return (<div className="d-flex gap-2 ps-1 my-2">

        <SelectFilter
          id={`product-${item?.id}`}
          data={productList?.map((product) => ({
            value: product.id, label: product.name,
          }))}
          onChange={(e) => {
            dispatch(UpdateItems(item?.id, 'name', e.label));
            dispatch(UpdateItems(item?.id, 'product_id', e.value));
          }}
          defaultValue={productList?.find((product) => product.name === item.name)?.id}
        />


        <Input
          type="number"
          min="1"
          max="10000"
          step="1"
          name="quantity"
          id={`quantity-${item?.id}`}
          value={item.quantity}
          onChange={(e) => {
            dispatch(UpdateItems(item?.id, 'quantity', Number(e.target.value)));
          }}
          required
        />


        <Input type="number"
               min="1"
               max="100000"

               name="fee"
               id={`fee-${item?.id}`}
               value={item.fee}
               onChange={(e) => {
                 dispatch(UpdateItems(item?.id, 'fee', e.target.value));
               }}

        />


        <CurrencyInput
          name="price"
          id={`price-${item?.id}`}
          decimalsLimit={3}
          // value={item.price}
          onValueChange={(e) => {

            dispatch(UpdateItems(item?.id, 'price', e));
          }}
          defaultValue={item?.price}

          className="form-control"

        />


        <SelectFilter
          id={`currency-${item?.id}`}
          data={currencyTypeList?.map((currency) => ({
            value: currency.value, label: currency.label,
          }))}
          onChange={(e) => {
            dispatch(UpdateItems(item?.id, 'currency', e.value));
            dispatch(UpdateItems(item?.id, 'currency_name', e.label));
          }}
          defaultValue={item?.currency}

        />
      </div>);
    })}
  </div>);
};

export default ItemUpdate;

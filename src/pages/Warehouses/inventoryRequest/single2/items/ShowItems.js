import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Card } from 'reactstrap';
import { IoTrashOutline } from 'react-icons/io5';
import BatchNumber from './show/BatchNumber';
import Product from './show/Product';
import Quantity from './show/Quantity';
import InventoryPlaceConsumption from './show/InventoryPlaceConsumption';
import FromWarehouse from './show/FromWarehouse';
import ToWarehouse from './show/ToWarehouse';
import Description from './show/Description';
import IconBtn from '../../../../../components/MicroComponents/button/IconBtn';
import { setItems } from '../../../../../store/inventoryRequest/InventoryRequest2';
import FormItemEdit from './FormItemEdit';

const ShowItems = ({ address,pageType }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [type] = useState(searchParams.get('type'));
  const items = useSelector((state) => state.InventoryRequestRedux2.items);
  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index);
    dispatch(setItems(newItems));
  };
  return (
    <>
      {items.map((i, index) => (
        <Card className=" mt-2 mb-0">
          <div className="d-flex p-3 gap-3 justify-content-between">
            <div className="d-flex flex-1 gap-3  flex-wrap justify-content-between">
              {address === 'inventory_temporary_receipt' ? (
                <BatchNumber data={i.batch_number} />
              ) : (
                <Product data={i.product_name} />
              )}

              <Quantity data={i.quantity} unit={i.unit} />
              <InventoryPlaceConsumption data={i.place_consumption_name} />
              {(address !== 'inventory_receipt' || type !== 'purchase') && address !== "inventory_buy_request" && (
                <FromWarehouse data={i.warehouse} />
              )}
              {address !== 'inventory_remittance' && <ToWarehouse data={i.to_warehouse} />}
              <Description data={i.description} />
            </div>
            {pageType !== 'show' && <div className="d-flex gap-2">
              <FormItemEdit address={address} item={i} index={index} />
              <IconBtn
                btnClass="redIconBtn"
                icon={<IoTrashOutline size={20} />}
                onClick={() => {
                  deleteItem(index);
                }}
              />
            </div>}
          </div>
        </Card>
      ))}
    </>
  );
};

export default ShowItems;

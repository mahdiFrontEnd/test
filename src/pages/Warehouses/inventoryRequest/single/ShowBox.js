import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { IoTrashOutline } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';
import { setInventoryRequestData } from '../../../../store/inventoryRequest/InventoryRequest';
import IconBtn from '../../../../components/MicroComponents/button/IconBtn';

const ShowBox = ({ pageType, item, index, address, setEditingKey }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [type] = useState(searchParams.get('type'));

  const inventoryRequestData = useSelector(
    (state) => state.InventoryRequestRedux.InventoryRequestData,
  );

  const deleteItem = () => {
    const newData = [...inventoryRequestData.items];
    newData.splice(index, 1);

    dispatch(setInventoryRequestData({ ...inventoryRequestData, items: newData }));
  };
  return (
    <div className="d-flex w-100 gap-2 p-3 ">
      <div className="d-flex gap-1 mx-0 flex-1">
        <div className="flex-3">
          <div className="keyValue">
            <div className="value">
              {address === 'inventory_temporary_receipt' ? item.batch_number : item.product}

              {/*{item.product}*/}
              {/*{item.product.map((i) => (*/}
              {/*  <span>{i.name}/</span>*/}
              {/*))}*/}
            </div>
          </div>
        </div>
        <div style={{ width: '140px' }}>
          <div className="keyValue">
            <div className="value d-flex gap-1">
              <span>{item.quantity}</span>
              <span>{item.measurement_name}</span>
            </div>
          </div>
        </div>
        <div className="flex-2">
          <div className="keyValue">
            <div className="value">{item?.inventory_place_consumption?.name}</div>
          </div>
        </div>

        {(address !== 'inventory_receipt' || type !== 'purchase') && address !== "inventory_buy_request" && (
          <div className="flex-2">
            <div className="keyValue">
              <div className="value">{item.warehouse?.name}</div>
            </div>
          </div>
        )}
        <div className="flex-2">
          <div className="keyValue">
            <div className="value">{item.to_warehouse?.name}</div>
          </div>
        </div>
        <div className="flex-2">
          <div className="keyValue">
            <div className="value">{item.description}</div>
          </div>
        </div>
      </div>
      {['create', 'edit'].includes(pageType) && (
        <div className="d-flex align-items-center gap-2">
          <IconBtn
            btnClass="redIconBtn"
            icon={<IoTrashOutline size={20} />}
            onClick={() => {
              deleteItem();
            }}
          />
          <IconBtn
            btnClass="orangeIconBtn"
            icon={<FiEdit size={22} />}
            onClick={() => {
              setEditingKey(index + 1);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ShowBox;

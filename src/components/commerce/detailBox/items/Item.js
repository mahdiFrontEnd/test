import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { IoTrashOutline } from 'react-icons/io5';
import DeleteBox from '../../../automation/modalBox/DeleteBox';
import { itemsUpdateApi } from '../../../../api/commerce/item';
import { DeleteItem } from '../../../../store/commerce/purchase/ItemSlice';
import Loading from '../../../../layouts/loader/Loading';

const Item = ({ item, dataId }) => {
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useDispatch();
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [selected, setSelected] = useState();

  const handleDelete = (row) => {
    setIsAddLoading(true);

    const value = {
      type: 3, product_id: row.product_id,
    };
    itemsUpdateApi(value, dataId, setIsAddLoading, setShowDelete, () => {

      dispatch(DeleteItem(row.id));


    }, (res) => {
      toast.error(res.message);

    });

  };

  return (<>
    {isAddLoading && <Loading isFullLoading />}
    <hr />
    <div className="d-flex gap-2 mb-2"><Modal isOpen={showDelete && selected === item.id}>
      <DeleteBox loading={isAddLoading}
                 handleOut={() => {
                   handleDelete(item);
                 }}
                 toggle={() => {
                   setShowDelete(false);
                 }}
                 onClick={() => {

                 }}

      />
    </Modal>

      <div className="flex-2 overflow-auto custom-scroll">

        <div style={{ width: 'max-content' }}>{item.name}</div>
      </div>
      <div className="flex-1">
        <div>{item.quantity}</div>
      </div>
      <div className="flex-1">
        <div>{item.fee}</div>
      </div>
      <div className="flex-1">
        <div>{item.price}</div>
      </div>
      <div className="flex-1">
        <div>{item.total}</div>
      </div>
      <div className="flex-1">
        <div>{item.measurement_name}</div>
      </div>
      <div className="flex-1">
        <div>{item.currency_name}</div>
      </div>
      <div className="d-flex align-items-center">
                    <span className="redText d-flex flex-column align-items-center justify-content-center">
                      <span onClick={() => {
                        setSelected(item.id);
                        setShowDelete(true);
                      }}>
                      <IoTrashOutline size={20} />
                      </span>
                    </span>
      </div>
    </div>


  </>);
};

export default Item;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Modal } from 'reactstrap';
import { hasPermission } from '../../../../permission/module';
import { getItems } from '../../../../store/commerce/purchase/ItemSlice';
import { itemsUpdateApi } from '../../../../api/commerce/item';
import Loading from '../../../../layouts/loader/Loading';
import { getProducts } from '../../../../api/common';
import ItemAdd from './ItemAdd';
import ItemUpdate from './ItemUpdate';
import ItemList from './ItemList';


const Items = ({ purchaseDetail }) => {
  const dispatch = useDispatch();
  const [showStatus, setShowStatus] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const toggleAdd = () => setShowAdd(!showAdd);
  const [productList, setProductList] = useState();
  const [isAddLoading, setIsAddLoading] = useState(false);
  const itemsData = useSelector((state) => state.itemsReducer.items);

  const changeShow = () => {
    setShowStatus(prevState => !prevState);
  };


  useEffect(() => {
    dispatch(getItems(purchaseDetail.items));

    getProducts(({ result }) => {
      setProductList(result);

    });
    // getMeasurement(({result}) => {
    //     setMeasurementList(result);
    // });
  }, [purchaseDetail]);

  const addProductList = productList?.filter((item) => !itemsData?.map((data) => data.product_id)?.includes(item?.id));

  const handleUpdate = () => {
    setIsAddLoading(true);

    const itemValue = {
      type: 2, items: itemsData,
    };


    itemsUpdateApi(itemValue, purchaseDetail?.id, setIsAddLoading, null, (data) => {
      dispatch(getItems(data));
      changeShow();


    }, (res) => {

      toast.error(res.message || res.errors);
    });


  };

  return (<div>
      {isAddLoading && <Loading isFullLoading />}

      <Modal isOpen={showAdd}>
        <ItemAdd
          toggle={toggleAdd}
          dataId={purchaseDetail?.id}
          productList={addProductList}
          // measurementList={measurementList}
        />
      </Modal>
      {showStatus ? (<>
          <div className="d-flex justify-content-end">
            <Button
              color="primary"
              size="sm"

              onClick={() => {
                setShowAdd(!showAdd);
              }}
              disabled={!purchaseDetail.editable}
            >
              محصول جدید
            </Button>
          </div>
          <div style={{overflow:"auto"}}>
            <ItemList dataId={purchaseDetail?.id} itemsData={itemsData} />
          </div>


          {hasPermission('commerce_purchase', ['edit']) && (

            <div className="d-flex justify-content-end">
              <Button
                color="primary"
                onClick={() => {
                  changeShow();
                }}
                disabled={!purchaseDetail.editable}
              >
                تغییر اطلاعات
              </Button></div>)}
        </>) : (<>
          <ItemUpdate
            itemsData={itemsData}
            productList={productList}
          />
          <div className="d-flex justify-content-end">
            <Button
              disabled={itemsData.some((item) => item.quantity === 0 || !item.quantity)}
              color="success"
              onClick={() => handleUpdate(purchaseDetail)}
            >
              ثبت تغییرات
            </Button>
          </div>

        </>)}

    </div>);
};

export default Items;

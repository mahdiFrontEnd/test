import React from 'react';
import Item from './Item';

const ItemList = ({ dataId, itemsData }) => {
  return (
    <div style={{ minWidth: '900px', backgroundColor: 'white' }}>

      
      <div className="d-flex gap-2 ps-1 my-2 fw-bold text-black mt-4">
        <span className="flex-2 ps-1">نام محصول</span>
        <span className="flex-1 ps-1">مقدار</span>
        <span className="flex-1 ps-1">تعداد در بسته</span>
        <span className="flex-1 ps-1">مبلغ</span>
        <span className="flex-1 ps-1">قیمت نهایی</span>
        <span className="flex-1 ps-1">واحد اندازه گیری</span>
        <span className="flex-1 ps-1">واحد ارزی</span>
        <div style={{ width: '14px' }}></div>
      </div>

      {itemsData?.length > 0 &&
        itemsData?.map((item) => {
          return (
            <Item item={item} dataId={dataId} />
          );
        })}


    </div>
  );
};

export default ItemList;

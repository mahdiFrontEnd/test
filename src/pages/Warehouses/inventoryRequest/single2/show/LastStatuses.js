import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { useSelector } from "react-redux";

const LastStatuses = () => {
  const inventoryRequestData = useSelector(
    (state) => state.InventoryRequestRedux.InventoryRequestData,
  );

   return (<>
       { inventoryRequestData?.last_statuses &&
    <Card className="p-3 my-4 ">
      <CardBody>
        <div className="d-flex">
          {inventoryRequestData?.last_statuses?.map((item) => (
            <div className="flex-1 d-flex flex-column">
              <div className="border border-1  p-2  " style={{ fontSize: '13px' }}>
                {item.post_name}
              </div>
              <div className="border border-1  flex-1">
                <div className="keyValue flex-1 p-2">
                  <div className="key  ">نام و نام خانوادگی:</div>
                  <div className="value fw-bold">{item.name}</div>
                </div>
                <div className="keyValue flex-1 p-2">
                  <div className="key  ">تاریخ :</div>
                  <div className="value ">{item.created_at}</div>
                </div>

                {item.signature_image && (
                  <div className="position-relative m-auto" style={{ width: '90px' }}>
                    <img
                      className="position-relative w-100 h-100"
                      src={item.signature_image}
                      alt="signature"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
       }</>
  );
};

export default LastStatuses;

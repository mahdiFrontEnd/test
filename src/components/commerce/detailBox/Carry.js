import React, { useEffect, useState } from 'react';

 import { getPurchasePosition } from '../../../api/common';
import ShowCarry from './ShowCarry';
import EditCarry from './EditCarry';

const Carry = ({ purchaseDetail }) => {
  useEffect(() => {
    getPurchasePosition(({ result }) => {
      setPositionList(result);
    });
  }, []);

  const [purchasePositionTitle, setPurchasePositionTitle] = useState('');
  const [positionList, setPositionList] = useState();
  const [showStatus, setShowStatus] = useState(true);
  const changeShow = () => {

    setShowStatus(prevState => !prevState);
  };


  return (
    <div>

      {showStatus ? (
        <ShowCarry purchaseDetail={purchaseDetail}  purchasePositionTitle={purchasePositionTitle} changeShow={changeShow} />
      ) : (
        <EditCarry positionList={positionList} setPurchasePositionTitle={setPurchasePositionTitle} changeShow={changeShow}
                   purchaseDetail={purchaseDetail} />
      )}

    </div>
  );
};

export default Carry;

import React, { useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import ShowPurchaseInfo from './ShowPurchaseInfo';
import EditPurchaseInfo from './EditPurchaseInfo';

const MainInfo = ({ purchaseDetail }) => {
  const [showStatus, setShowStatus] = useState(true);

  const changeShow = () => {
    setShowStatus(prevState => !prevState)
  };
  return (<div>

    {showStatus ? (<ShowPurchaseInfo purchaseDetail={purchaseDetail} changeShow={changeShow} />) : (
      <EditPurchaseInfo purchaseDetail={purchaseDetail} changeShow={changeShow} />

    )}


  </div>);
};

export default MainInfo;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { FaFileAlt } from "react-icons/fa";

const LinkList = ({ inventoryReceiptList,
                    inventoryRemittanceList }) => {
  const navigate = useNavigate();

  const [inventoryReceiptData, setInventoryReceiptData] = useState(inventoryReceiptList);
  const [inventoryRemittanceListData, setInventoryRemittanceListData] = useState(inventoryRemittanceList);
  useEffect(() => {
    setInventoryReceiptData(inventoryReceiptList);
    setInventoryRemittanceListData(inventoryRemittanceList);
  }, [inventoryReceiptList
    ,inventoryRemittanceList]);
  return (
    <div className="d-flex gap-2 align-items-center flex-wrap">
    <div>
      {inventoryReceiptData?.map((item,index) => (
        <Button className="defBtn greenBtn"
          onClick={() => {
            navigate(`/warehouses/inventoryReceipt/show/${item}`);
          }}
          key={item}
        >
          <div> <FaFileAlt /> {`رسید ${index+1}`}</div>
        </Button>
      ))}
    </div>
    <div>
      {inventoryRemittanceListData?.map((item,index) => (
        <Button className="defBtn blueBtn"
          onClick={() => {
            navigate(`/warehouses/inventoryRemittance/show/${item}`);
          }}
          key={item}
        >
          <div> <FaFileAlt /> {`حواله ${index+1}`}</div>
        </Button>
      ))}
    </div>
    </div>
  );
};

export default LinkList;

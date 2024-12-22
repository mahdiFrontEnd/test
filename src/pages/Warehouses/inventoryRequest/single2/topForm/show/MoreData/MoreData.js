import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import CommentsComponent from './CommentsComponent';
import StatusesList from './StatusesList';
import { hasPermission } from '../../../../../permission/module';
import CommentBox from '../../../../../components/CommentModal';
import LinkList from './LinkList';
import StatusBox from '../../StatusBox';
import Common from '../../../../../api/http_request/Model/common/common';

const MoreData = ({ inventoryRequestData, singleData, pageType, address, id }) => {
  const [data, setData] = useState(inventoryRequestData);
  const [itemsCollapse, setItemsCollapse] = useState([]);
  const [getAgain, setGetAgain] = useState(true);
  const [statusList, setStatusList] = useState([]);
  const params = { type: address.replace('inventory_', '') };
  useEffect(() => {
    Common.request({
      success: ({ result }) => {
        setStatusList(
          result?.map(({ value, name, file_required }) => ({
            value,
            label: name,
            file_required,
          })),
        );
      },
    })
      .addParams(params)
      .inventoryStatus();
  }, []);
  useEffect(() => {
    let items = [
      {
        key: '1',
        label: <h5>وضعیت ها</h5>,
        className: 'card mb-2',
        children: <StatusesList statuses={data?.statuses} />,
        extra:    <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        ><StatusBox statusArray={statusList} rowData={singleData} address={address} /></div>,
          },
          pageType === 'show' && {
            key: "2",
            label: <h5>پیام ها</h5>,
            extra: hasPermission(address, ['reply']) && (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <CommentBox
              inDetail
              handleGetDataAgain={() => {
                setGetAgain((prevState) => !prevState);
              }}
              address={address}
              rowData={{ id }}
            />
          </div>
        ),
        className: 'card mb-2',
        children: <CommentsComponent id={id} address={address} getAgainStatus={getAgain} />,
      },
    ];

    if (
      ['inventory_request', 'inventory_buy_request', 'inventory_temporary_receipt'].includes(
        address,
      )
    ) {
      items = [
        ...items,
        {
          key: '3',
          label: <h5>رسید ها و حواله ها</h5>,
          className: 'card mb-2',
          children: (
            <LinkList
              linkAddress="inventoryReceipt"
              inventoryReceiptList={data?.receipts}
              inventoryRemittanceList={data?.remittances}
            />
          ),
        },
        // {
        //   key: '4',
        //   label: <h5></h5>,
        //   className: 'card mb-2',
        //   children: <LinkList linkAddress="inventoryRemittance" inventoryRemittanceList={data?.remittances} />,
        // },
      ];
    }

    setItemsCollapse(items);
  }, [inventoryRequestData,statusList]);
  useEffect(() => {
    setData(inventoryRequestData);
  }, [inventoryRequestData]);

  return (
    <div>
      <Collapse ghost items={itemsCollapse} />
    </div>
  );
};

export default MoreData;

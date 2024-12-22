import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CommentsBox from '../../../../../components/automation/detailbox/detailTabs/CommentsBox';
import Inventory from '../../../../../api/http_request/Model/inventory/Inventory';

const CommentsComponent = ({ id, address,getAgainStatus }) => {
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [getAgain, setGetAgain] = useState(true);
  const [commentList, setCommentList] = useState({ list: [] });

  useEffect(() => {
    setGetAgain(getAgainStatus)
  }, [getAgainStatus]);
  useEffect(() => {
    if (id) {
      Inventory.request({
        beforeSend: () => {
          setCommentsLoading(true);
        },
        success: ({ result }) => {
          setCommentList({ list: result.comments });
        },
        error: ({ error }) => {
          toast.error(error?.data?.message);
        },
        final: () => {
          setCommentsLoading(false);
        },
      }).getInventoryRequestComments(id, address);
    }
  }, [getAgain]);
  const handleGetDataAgain = () => {
    setGetAgain((prevState) => !prevState);
  };
  return (
    <div className="m-auto">
      <CommentsBox
        handleGetDataAgain={handleGetDataAgain}
        data={commentList}
        dontSendFile
        loading={commentsLoading}
        dataId={id}
        hiddenReplayBtn
        requestAddress="inventory_request"
      />
    </div>
  );
};

export default CommentsComponent;

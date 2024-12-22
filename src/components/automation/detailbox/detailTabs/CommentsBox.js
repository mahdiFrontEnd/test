import React from 'react';

import { Media } from 'reactstrap';
import { useSelector } from 'react-redux';
import { hasPermission } from '../../../../permission/module';
import CommentsDetail from '../comment/Comments';
import LoadingAutoDetailComment from '../../../../layouts/loader/LoadingAutoDetailComment';
// eslint-disable-next-line import/no-cycle
import CommentModal from '../../../CommentModal';
import ComponentCard from '../../../ComponentCard';

const CommentsBox = ({
                        hasMaxWidth,

                       dataId, dontSendFile,
                       loading,
                       data,
                       PrintButton, hiddenReplayBtn,
                     }) => {
  const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);


  return (
    <ComponentCard>
      <div style={{ maxWidth: hasMaxWidth ? '600px' : '100%' }}>
        {!loading ? (
          <>
            <div className="d-flex align-items-center justify-content-end gap-2 mb-2">
              {PrintButton && <div className="d-flex align-items-center justify-content-end">{PrintButton}</div>}

              {hasPermission(`automation_${automationAddress}`, ['reply']) && !hiddenReplayBtn && (
                <CommentModal dontSendFile={dontSendFile}
                              inDetail


                              rowData={{ id: dataId }}
                />
              )}
            </div>
            {data?.list?.length > 0 ? (
              data?.list?.map((item) => <>
                <CommentsDetail showEdit key={item.id} data={item}   />
              </>)
            ) : (
              <Media className="d-flex my-3">هیچ کامنتی وجود ندارد ...</Media>
            )}
          </>
        ) : (
          <LoadingAutoDetailComment />
        )}
      </div>
    </ComponentCard>
  );
};

export default CommentsBox;

import React from 'react';

import StatusDetail from '../../automation/detailbox/Statuses';

const Status = ({ statusList }) => {
  return (
    <div>

      {statusList && (
        <div className="automation-status-detail">
          {statusList.length > 0 ? (
            statusList.map((item) => <StatusDetail key={item.id} data={item} />)
          ) : (
            <p className="d-flex my-3 text-primary">درحال بررسی... </p>
          )}
        </div>
      )}

    </div>
  );
};

export default Status;

import React, { useEffect, useState } from "react";
import { Media } from 'reactstrap';
import StatusesDetail from '../../../../../components/automation/detailbox/Statuses';

const StatusesList = ({ statuses =[]}) => {
     const [data,setData]=useState(statuses)
    useEffect(() => {
      setData(statuses)
    }, [statuses]);
  return (
    <div className="automation-status-detail">
      {data?.length > 0 ? (
        data.map((item) => <StatusesDetail key={item.id} data={item} />)
      ) : (
        <Media className="d-flex my-3 text-primary">درحال بررسی... </Media>
      )}
    </div>
  );
};

export default StatusesList;

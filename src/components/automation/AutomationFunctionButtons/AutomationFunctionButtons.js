import React from 'react';
import { Dropdown } from 'antd';
import { useSelector } from 'react-redux';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import CommentModal from '../../CommentModal';
import ReferralBox from './ReferralBox';
import DeleteBox from './DeleteBox';
import StatusBox from './StatusBox';
import PayBox from './PayBox';
import { hasPermission } from '../../../permission/module';
import IconBtn from '../../MicroComponents/button/IconBtn';
import ChangeStatusCorrespondence from './ChangeStatusCorrespondence';

const AutomationFunctionButtons = ({ row }) => {
  const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);
  const correspondenceStatus = useSelector((state) => state.automationAddressRedux.correspondenceStatus);


  const items = automationAddress === 'correspondence' && correspondenceStatus === 'completed' ?

    [{
      label: <ChangeStatusCorrespondence rowData={row} />, key: '5',
    }]
    :

    [{
      label: <PayBox rowData={row} />, key: '1',
    }, {
      type: hasPermission(`automation_${automationAddress}`, ['reject', 'approve']) && 'divider',
    }, {
      label: <StatusBox rowData={row} />, key: '2',
    }, {
      type: hasPermission(`automation_${automationAddress}`, ['all']) && 'divider',
    }, {
      label: <ReferralBox rowData={row} />, key: '3',
    }, {
      type: hasPermission(`automation_${automationAddress}`, ['reply']) && 'divider',
    }, {
      label: <CommentModal rowData={row} />, key: '4',
    }, {
      type: hasPermission(`automation_${automationAddress}`, ['delete']) && 'divider',
    }, {
      label: <DeleteBox type="dropDownBtn" rowData={row} />, key: '5',
    }, {
      label: <ChangeStatusCorrespondence rowData={row} />, key: '5',
    },
    ];

  return (<div className="d-flex gap-1 justify-content-center" onDoubleClick={(e) => {
    e.stopPropagation();
  }}>

    <div className="d-none d-md-flex gap-1">
      {items.map((item) => (// eslint-disable-next-line react/no-array-index-key
        <>{item.label}</>))}
    </div>


    <div className="d-md-none">
      <Dropdown menu={{ items }} trigger={['click']}>
        <IconBtn btnClass="grayIconBtn" icon={<HiOutlineDotsVertical size={22} />} />
      </Dropdown>
    </div>
  </div>);
};

export default AutomationFunctionButtons;
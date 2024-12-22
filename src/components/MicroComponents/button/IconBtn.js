import React from 'react';
import { Button, Tooltip } from 'antd';

const IconBtn = ({ onClick, icon, btnClass,style={}, loading = false, disabled = false, TooltipText = '' }) => {
  return (

    <Tooltip title={TooltipText}><Button style={style} disabled={disabled} loading={loading} className={`defIconBtn ${btnClass} `}
                                         onClick={onClick}
    >
      {!loading && icon && icon}
    </Button></Tooltip>

  );
};

export default IconBtn;
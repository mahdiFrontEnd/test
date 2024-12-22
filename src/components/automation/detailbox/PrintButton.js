import React from 'react';
import ReactToPrint from 'react-to-print';
import { Button } from 'reactstrap';
import { BsPrinterFill } from 'react-icons/bs';

const PrintButton = ({ content, handleOnBeforeGetContent, showText, btnClass = 'grayBtn' }) => {
  return (<ReactToPrint
    onBeforeGetContent={handleOnBeforeGetContent}

    trigger={() => (<Button data-bs-toggle="tooltip" data-bs-placement="top" title="پرینت"
                            size="sm"
                            round="true"
                            type="button" className={`defBtn d-flex gap-2 align-items-center ${btnClass}`}>
      <BsPrinterFill size={20} />{showText}
    </Button>)}
    content={() => content.current}
  />);
};

export default PrintButton;



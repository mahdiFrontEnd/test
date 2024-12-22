import React from 'react';
import { IoMdClose } from 'react-icons/io';

const CloseModalBtn = ({toggle}) => {
    return (
        <button className="close border-0 bg-transparent fw-bold fs-3 p-0 " onClick={toggle} type="button">
          <IoMdClose />
        </button>
    );
};

export default CloseModalBtn;
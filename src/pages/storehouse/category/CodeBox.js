import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { convertPersianNumberToEng } from '../../../helper/convertPersianNumberToEng';

const CodeBox = ({ selectedParent, codeItem, onChangeCode }) => {
  const [item, setItem] = useState(selectedParent);
  const [activeCode, setActiveCode] = useState('');

  console.log(selectedParent);
  useEffect(() => {
    setItem(selectedParent);
  }, [selectedParent]);
  useEffect(() => {
    setActiveCode(codeItem);
  }, [codeItem]);


  useEffect(() => {
    onChangeCode(activeCode);
  }, [activeCode]);
  return (

    <div  className="d-flex align-items-center gap-1" dir="ltr">
      {selectedParent?.code && <><OtpInput inputType="tel" shouldAutoFocus name="code"
                                           inputStyle="otpInput"
                                           value={item?.complete_code}
                                           numInputs={selectedParent.code.length}
                                           renderSeparator={<span className="mx-1">-</span>}
                                           renderInput={(props) => <input  {...props} disabled />}
      />   <span>-</span></>}

      <OtpInput inputType="tel" shouldAutoFocus name="code"
                inputStyle="otpInput"

                value={activeCode}
                onChange={(e) => {
                  setActiveCode(convertPersianNumberToEng(e));

                }}
                numInputs={2}
                renderSeparator={<span className="mx-1">-</span>}
                renderInput={(props) => <input  {...props} />}
      />
    </div>

  );
};

export default CodeBox;
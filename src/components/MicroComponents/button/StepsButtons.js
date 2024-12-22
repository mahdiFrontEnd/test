import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

const StepsButtons = ({ setCurrent, current, stepsLength, onClick }) => {
  const [currentNumber, setCurrentNumber] = useState(current);

  useEffect(() => {
    setCurrentNumber(current);
  }, [current]);
  return (
    <div className="d-flex align-items-center gap-2 justify-content-end mt-5">
      {currentNumber > 0 && <Button onClick={() => setCurrent(currentNumber - 1)}>قبلی</Button>}
      {currentNumber < stepsLength - 1 && (
        <Button type="primary" onClick={() => setCurrent(currentNumber + 1)}>
          بعدی
        </Button>
      )}
      {currentNumber === stepsLength - 1 && (
        <Button type="primary" onClick={onClick}>
          ثبت
        </Button>
      )}
    </div>
  );
};

export default StepsButtons;

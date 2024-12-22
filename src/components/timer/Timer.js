import React from 'react';
import {useTimer} from 'react-timer-hook';

function Timer({ expiryTimestamp }) {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn('onExpire called'),
  });

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '1rem' }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}

export default Timer;

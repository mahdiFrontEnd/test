import {forwardRef} from 'react';

export const ComponentToPrint = forwardRef((props, ref) => {
  return (
    <div className="print-source" ref={ref}>
      {props.children}
    </div>
  );
});

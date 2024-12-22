import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Tour } from 'antd';

const TourBox = ({ steps }) => {
  const [openTour, setOpenTour] = useState(true);


  return (
    <>
      {
        !Cookies.get('tour') &&

        <Tour open={openTour} onClose={() => {
          Cookies.set('tour', 'true',
            {
              expires: 70000,
            },
          );
          setOpenTour(false);
        }} steps={steps} />}
    </>
  );
};

export default TourBox;
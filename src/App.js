import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
import { ConfigProvider } from 'antd';
import faIR from 'antd/locale/fa_IR';
import { useSelector } from 'react-redux';
import { JalaliLocaleListener } from 'antd-jalali';
import Themeroutes from './routes/Router';
import ThemeSelector from './layouts/theme/ThemeSelector';
import { hasPermission } from './permission/module';

const App = () => {
  const [countNotif, setCountNotif] = useState(0);
  const routing = useRoutes(Themeroutes);
  const notifCount = useSelector((state) => state.loadingReducer.notifCount);

  useEffect(() => {


    let number = 0;
    Object.entries(notifCount).forEach(([title, value]) => {



      if ((title !== 'commerce_count'   || hasPermission('commerce_purchase', ['create'])) &&  title !== 'calendar_count') {

        number += value;
      }
    });
    setCountNotif(number);
  }, [notifCount]);

  return (
    <>
      <Helmet>
        <title>
          {`${countNotif > 0 ? `اعلان های خوانده نشده (${countNotif})` : 'حاصل نوین'}`}
        </title>
        {/*<meta httpEquiv="Content-Security-Policy"*/}
        {/*      content="default-src 'self' * ; img-src * ; media-src * ; script-src * ; style-src *"/>*/}
        {/*<meta*/}
        {/*    httpEquiv="Content-Security-Policy"*/}
        {/*    content="script-src * ; img-src *; "/>*/}
        {/*todo check this before deploy*/}

        {/*<meta*/}
        {/*  httpEquiv="Content-Security-Policy"*/}
        {/*  content="script-src 'self' www.google.com www.gstatic.com ; img-src  *;"*/}
        {/*  // content="script-src * ; img-src *; "*/}
        {/*/>*/}
      </Helmet>
      <ConfigProvider
        direction="rtl"
        locale={faIR}
        theme={{
          token: {
            fontFamily: 'Shabnam FD',
            colorPrimary: '#f78e20',
          },
        }}
      >

        <div
          className="rtl"
          dir="rtl"
        >
          <ThemeSelector />
          {routing}
          <JalaliLocaleListener />
        </div>
      </ConfigProvider>
      <ToastContainer rtl style={{ fontFamily: 'Shabnam' }} />
    </>
  );
};

export default App;

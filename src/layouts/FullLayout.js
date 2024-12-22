import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container } from 'reactstrap';
import Header from './header/Header';
import { getHomeData } from '../api/http_request/Model/User/HomeRequest';
import Sidebar from './sidebars/Sidebar2';

const FullLayout = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    getHomeData(dispatch, true);
  }, []);

  return (<main>
    <div className="pageWrapper d-md-block d-lg-flex pb-2">
      <Sidebar />
      <Header />
      <div className="d-flex justify-content-end w-100">
        <div className="contentArea">

          <div>
            <Container fluid className={`pe-2 p-0  `}>
              <Outlet />
            </Container>
          </div>
        </div>
      </div>
    </div>
  </main>);
};

export default FullLayout;

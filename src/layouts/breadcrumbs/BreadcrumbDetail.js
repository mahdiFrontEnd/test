import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { TbSmartHome } from 'react-icons/tb';
import BackBtn from '../../components/MicroComponents/button/BackBtn';

const BreadcrumbDetail = ({ title, hiddenTitle, linkAddress, useBackBtn }) => {
  // const location = useLocation();
  // const firstUrl = `${location.pathname.split('/')[1]}`;

  return (

    <div className="d-flex align-items-center justify-content-between px-0">
      <div className="">
        {!hiddenTitle && <h4 className="text-capitalize">جزئیات {title}</h4>}
        <Breadcrumb>
          <BreadcrumbItem className="text-decoration-none d-flex align-items-start gap-1" to="/" tag={Link}>
            <TbSmartHome size={18} />
            <span>خانه</span>
          </BreadcrumbItem>
          <BreadcrumbItem
            className="text-decoration-none"
            to={linkAddress}
            // to={
            //   linkAddress
            //     ? `/${firstUrl}/${linkAddress}`
            //     : `${firstUrl === 'commerce' ? `/commerce/purchase` : `/${firstUrl}`}`
            // }
            tag={Link}
          >
            {title}
          </BreadcrumbItem>
          <BreadcrumbItem>جزئیات </BreadcrumbItem>
        </Breadcrumb>
      </div>
      {useBackBtn && <BackBtn />}
    </div>

  );
};

export default BreadcrumbDetail;

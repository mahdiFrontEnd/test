import React from 'react';

import CertificationList from './CertificationList';

const Certification = ({ certificationList }) => {
  return (
    <div>

      <div>
        {certificationList?.length > 0 ? (
          certificationList.map((item) => <CertificationList key={item.id} data={item} />)
        ) : (
          <p className="d-flex my-3 text-primary">درحال بررسی... </p>
        )}
      </div>

    </div>
  );
};

export default Certification;

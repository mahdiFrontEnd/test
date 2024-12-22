import React from 'react';

import { Card, CardBody, Media } from 'reactstrap';
import RefersDetail from '../refers/Refers';
import LoadingAutoDetailReferences from '../../../../layouts/loader/LoadingAutoDetailReferences';
import ReferralBox from '../../AutomationFunctionButtons/ReferralBox';


const References = ({
                      dataId,  PrintButton, data, loading,
                    }) => {

  return (<Card>

    <CardBody>
      {!loading ? <>
        <div className="d-flex align-items-center justify-content-end gap-2 mb-2"> {PrintButton}
          <ReferralBox rowData={{ id: dataId }}
                        inDetail />
        </div>


        <div>

          {data.length > 0 ? (data.map((item) => <>


            <RefersDetail key={item.user_id} data={item} /></>)) : (
            <Media className="d-flex my-3"> هیچکس</Media>)}
        </div>
      </> : <LoadingAutoDetailReferences />}
    </CardBody>
  </Card>);
};

export default References;
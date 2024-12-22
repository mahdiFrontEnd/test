import React from 'react';
// {useEffect, useState}
import { Card, CardBody, Media } from 'reactstrap';
import { useSelector } from 'react-redux';
import FormDetail from '../Form';
import StatusDetail from '../Statuses';
import LoadingAutoDetail from '../../../../layouts/loader/LoadingAutoDetail';
import SendsList from './SendsList';
import PaymentDetail from '../payment/paymentDetail';

const Details = ({ loading, data, PrintButton }) => {
  const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);

  return (<>

    {loading ? <LoadingAutoDetail /> :
      <>
        <FormDetail data={data} PrintButton={PrintButton} />


        <SendsList data={data} />

        {(automationAddress === 'payment' || automationAddress === 'sent_letter' || automationAddress === 'request') && data?.statuses && (
          <Card className=" mt-2 mb-0">
            <CardBody>
              <h5 className="mb-4">وضعیت</h5>
              <div className="automation-status-detail">
                {data?.statuses?.length > 0 ? (data?.statuses.map((item) => <StatusDetail key={item.id}
                                                                                          data={item} />)) : (
                  <Media className="d-flex my-3 text-primary">درحال بررسی... </Media>)}
              </div>
            </CardBody>
          </Card>)}
        {automationAddress === 'payment' && (<Card className=" mt-2 mb-0">
          <CardBody>
            <h5 className="mb-4 d-flex align-items-center justify-content-between">
              پرداخت ها
            </h5>
            <div>
              {data?.paid_list?.length > 0 ? (data?.paid_list?.map((item) => <PaymentDetail key={item.id} detail={data}
                                                                                            data={item} />)) : (
                <Media className="d-flex my-3 text-primary">درحال بررسی... </Media>)}
            </div>
          </CardBody>
        </Card>)}
      </>}


  </>);
};

export default Details;
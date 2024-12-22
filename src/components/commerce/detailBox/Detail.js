import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { Card, CardBody } from 'reactstrap';
import { Tabs as TabsAntd } from 'antd';
import { useSearchParams } from 'react-router-dom';
import BreadcrumbDetail from '../../../layouts/breadcrumbs/BreadcrumbDetail';
import MainInfo from './MainInfo';
import ProductItems from './items/ProductItems';
import Carry from './Carry';
import Status from './Status';
import Certification from './Certification';
import PurchaseInfoBox from './PurchaseInfoBox';
import ComponentCard from '../../ComponentCard';

const Detail = ({
                  statusList, certificationList,
                }) => {
  const [activeTab, setActiveTab] = useState('1');
  const [searchParams, setSearchParams] = useSearchParams();

  const dataDetail = useSelector((state) => state.purchasesReducer.dataDetail);
  const newActiveTab = searchParams.get('activeTab') || '1';
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    newActiveTab && setActiveTab(newActiveTab);
  }, [newActiveTab]);
  const items = [{
    key: '1', label: 'اطلاعات اصلی', children: (<Card>
      <CardBody>
        <MainInfo purchaseDetail={dataDetail} />
      </CardBody>
    </Card>),

  }, {
    key: '2', label: 'محصولات', children: (<Card>
      <CardBody>
        <ProductItems purchaseDetail={dataDetail} />
      </CardBody>
    </Card>),
  }, {
    key: '3', label: 'حمل', children: (<Card>
      <CardBody>
        <Carry purchaseDetail={dataDetail} />
      </CardBody>
    </Card>),

  }, {
    key: '4', label: 'وضعیت', children: (<Card>
      <CardBody>
        <Status statusList={statusList} purchaseDetail={dataDetail} />
      </CardBody>
    </Card>),

  }, {
    key: '5', label: 'مجوز ها', children: (<Card>
      <CardBody>
        <Certification certificationList={certificationList} purchaseDetail={dataDetail} />
      </CardBody>
    </Card>),

  }];
  return (<div>
    <div className="automation-detail-data">
      <ComponentCard>
        <BreadcrumbDetail linkAddress="/commerce/purchase"  title="لیست خرید" id={dataDetail?.id} useBackBtn hiddenTitle />
      </ComponentCard>


      <div className="d-lg-flex align-items-start gap-2 flex-row-reverse">
        <PurchaseInfoBox data={dataDetail} />
        <div className="flex-1 overflow-auto">


          <TabsAntd tabBarStyle={{
            backgroundColor: 'white', padding: '0 20px', marginBottom: '8px', border: '1px solid #e7e7e7',

          }}
                    defaultActiveKey="1" activeKey={activeTab} items={items}
                    onChange={(e) => {
                      setSearchParams(params => {
                        params.set('activeTab', e);
                        return params;
                      });

                      setActiveTab(e);
                    }}
          />


        </div>


      </div>

    </div>
  </div>);
};

export default Detail;

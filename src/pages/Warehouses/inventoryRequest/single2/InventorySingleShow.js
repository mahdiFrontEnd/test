import React, { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../../not-found/Error';
import BreadcrumbDetail from '../../../../layouts/breadcrumbs/BreadcrumbDetail';
import TopForm from './topForm/TopForm';
import FormItem from './items/FormItem';
import LastStatuses from '../single/LastStatuses';
import ShowItems from './items/ShowItems';
import { resetState } from '../../../../store/inventoryRequest/InventoryRequest';
import Inventory from '../../../../api/http_request/Model/inventory/Inventory';
import TopBox from '../single/TopBox';

const InventorySingle2 = ({ address, pageType, linkAddress, title }) => {
  const getAgain = useSelector((state) => state.loadingReducer.getAgain);
  const [data, setData] = useState({});

  const [loading, setLoading] = useState(false);
  const [notFoundId, setNotFoundId] = useState(false);
  const location = useLocation();

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    if (id) {
      Inventory.request({
        beforeSend: () => {
          setLoading(true);
        },
        success: ({ result }) => {
          setData(result);
        },
        error: (error) => {
          toast.error(error?.error?.data?.message);
          if (error.error_code === 404) {
            setNotFoundId(true);
          }
        },
        final: () => {
          setLoading(false);
        },
      }).getInventoryRequest(id, address);
    }
  }, [id, pageType, location, getAgain]);

  if (loading) return <Skeleton loading={loading} active />;
  if (notFoundId) return <Error />;
  return (
    <div>
      <BreadcrumbDetail title={title} hiddenTitle linkAddress={linkAddress} useBackBtn />
      <TopBox
        data={data}
        // typeList={typeList}
        id={id}
        pageType={pageType}
        title={title}
        address={address}
        linkAddress={linkAddress}
      />
      <div className="border border-1 bg-white">
        <TopForm
          address={{ address }}
          pageType={pageType}
          linkAddress={linkAddress}
          title={title}
        />
        <FormItem
          address={{ address }}
          pageType={pageType}
          linkAddress={linkAddress}
          title={title}
        />
      </div>
      <ShowItems address={address} />

      <LastStatuses />
      {/*{pageType === 'show' && inventoryRequestData && (*/}
      {/*  <MoreData*/}
      {/*    address={address}*/}
      {/*    pageType={pageType}*/}
      {/*    id={id}*/}
      {/*    inventoryRequestData={inventoryRequestData}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  );
};

export default InventorySingle2;

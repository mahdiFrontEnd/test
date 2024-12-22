import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ComponentCard from '../../components/ComponentCard';
import PurchaseAdd from '../../components/commerce/PurchaseAdd';
import CreatorTable from '../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../components/MicroComponents/DeleteFilterTable';
import ShowSearchBtn from '../../components/MicroComponents/button/ShowSearchBtn';
import CollapseBox from '../../components/MicroComponents/CollapseBox';
import SearchPurchase from '../../components/commerce/detailBox/SearchPurchase';
import PurchaseColumn from '../../components/commerce/PurchaseColumn';
import CheckPermissionPage from '../../permission/CheckPermissionPage';
import { hasPermission } from '../../permission/module';
import TitleBox from '../../components/TitleBox';


const Purchase = () => {
  const showSearchBox = useSelector((state) => state.PurchaseTableRedux.showSearchBox);
  const navigate = useNavigate();
  const [columns] = PurchaseColumn();


  return (<>

    <TitleBox title="لیست خرید" adterBox={<div className="searchBox">
      <CollapseBox activeKey={showSearchBox ? ['1'] : null} items={[{
        showArrow: false, headerPadding: '1px',
        style: { backgroundColor: 'white', border: 'none' },
        key: '1', children: <SearchPurchase />,
      }]} />

    </div>}>
      {hasPermission('commerce_purchase', ['create']) && (
        <PurchaseAdd />)}

      <DeleteFilterTable />
      <ShowSearchBtn />
    </TitleBox>
    <CheckPermissionPage module="commerce_purchase">
      <ComponentCard>
        <CreatorTable columns={columns}
                      listAddress="commerce_purchase"
                      onDoubleClickRowHandler={(row) => navigate(`/commerce/purchase_detail/${row?.id}`)} />
      </ComponentCard>
    </CheckPermissionPage>
  </>);
};

export default Purchase;

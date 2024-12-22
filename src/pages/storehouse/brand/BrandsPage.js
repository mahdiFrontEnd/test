import React from 'react';
import ComponentCard from '../../../components/ComponentCard';
import UpdateCreateBrands from './UpdateCreateBrands';
import SearchInputTopTable from '../../../components/MicroComponents/table/SearchInputTopTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import TitleBox from '../../../components/TitleBox';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import BrandColumn from './BrandColumn';


const BrandsPage = () => {
  const [columns] = BrandColumn();


  return (<>

      <TitleBox title="برند ها">
        <div className="d-flex gap-2 align-items-center">
          <SearchInputTopTable searchName="name" />
          {/*{hasPermission('product_brand', ['create']) &&*/}
          <UpdateCreateBrands />
          {/*}*/}
          <DeleteFilterTable />
        </div>
      </TitleBox>

      <CheckPermissionPage module="category">
        <ComponentCard>
          <CreatorTable columns={columns} listAddress="storehouse/brand"  />
        </ComponentCard>
      </CheckPermissionPage></>
  );


};


export default BrandsPage;
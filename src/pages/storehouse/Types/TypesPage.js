import React from 'react';
import ComponentCard from '../../../components/ComponentCard';
import SearchInputTopTable from '../../../components/MicroComponents/table/SearchInputTopTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import TitleBox from '../../../components/TitleBox';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import BrandColumn from './TypesColumn';
import UpdateCreateTypes from './UpdateCreateTypes';


const TypesPage = () => {
  const [columns] = BrandColumn();


  return (<>

      <TitleBox title="انواع محصول">
        <div className="d-flex gap-2 align-items-center">
          <SearchInputTopTable searchName="name" />
          {/*{hasPermission('product_brand', ['create']) &&*/}
          <UpdateCreateTypes />
          {/*}*/}
          <DeleteFilterTable />
        </div>
      </TitleBox>

      <CheckPermissionPage module="category">
        <ComponentCard>
          <CreatorTable columns={columns} listAddress="storehouse/type"  />
        </ComponentCard>
      </CheckPermissionPage></>
  );


};


export default TypesPage;
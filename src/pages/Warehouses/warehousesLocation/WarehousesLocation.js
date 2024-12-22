import React from 'react';
import { hasPermission } from '../../../permission/module';
import ComponentCard from '../../../components/ComponentCard';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import UserColumn from './WarehousesLocationColumn';
import UpdateCreateUser from './UpdateCreateWarehousesLocation';
import TitleBox from '../../../components/TitleBox';

const WarehousesLocation = () => {
  const [columns] = UserColumn();

   return (
    <>


      <TitleBox title="محل نگهداری کالاها">
        {hasPermission('warehouse_location', ['create']) && <UpdateCreateUser />}
        <DeleteFilterTable  />
      </TitleBox>




      <CheckPermissionPage module="warehouse_location">
        <ComponentCard>
          <CreatorTable
            columns={columns}
            listAddress="warehouse_location"
            childrenColumnName="childs"
            expandable={{ childrenColumnName: 'childs' }}
          />
        </ComponentCard>
      </CheckPermissionPage>
    </>
  );
};

export default WarehousesLocation;

import React from 'react';
import { hasPermission } from '../../../permission/module';
import ComponentCard from '../../../components/ComponentCard';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import UserColumn from './WarehousesColumn';
import UpdateCreateUser from './UpdateCreateWarehouses';
import TitleBox from '../../../components/TitleBox';

const Warehouses = () => {
  const [columns] = UserColumn();

  return (
    <>


      <TitleBox title="انبارها">
        {hasPermission('warehouse', ['create']) && <UpdateCreateUser />}
        <DeleteFilterTable />
      </TitleBox>


      <CheckPermissionPage module="warehouse">
        <ComponentCard>
          <CreatorTable
            columns={columns}
            listAddress="warehouse"
            childrenColumnName="childs"
            expandable={{ childrenColumnName: 'childs' }}
          />
        </ComponentCard>
      </CheckPermissionPage>
    </>
  );
};

export default Warehouses;

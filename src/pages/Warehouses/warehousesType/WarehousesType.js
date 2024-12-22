import React from 'react';
import { hasPermission } from '../../../permission/module';
import ComponentCard from '../../../components/ComponentCard';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import UserColumn from './WarehousesTypeColumn';
import UpdateCreateUser from './UpdateCreateWarehousesType';
import TitleBox from '../../../components/TitleBox';

const WarehousesType = () => {
  const [columns] = UserColumn();

  return (
    <>
      <TitleBox title="انواع انبار ">
        {hasPermission('warehouse', ['create']) && <UpdateCreateUser />}
        <DeleteFilterTable />
      </TitleBox>


      <CheckPermissionPage module="warehouse_type">
        <ComponentCard>
          <CreatorTable
            columns={columns}
            listAddress="warehouse_type"
            childrenColumnName="childs"
            expandable={{ childrenColumnName: 'childs' }}
          />
        </ComponentCard>
      </CheckPermissionPage>
    </>
  );
};

export default WarehousesType;

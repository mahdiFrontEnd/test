import React from 'react';
import { hasPermission } from '../../../permission/module';
import ComponentCard from '../../../components/ComponentCard';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import UserColumn from './PlaceConsumptionColumn';
import UpdateCreatePlaceConsumption from './UpdateCreatePlaceConsumption';
import TitleBox from '../../../components/TitleBox';

const PlaceConsumption = () => {
  const [columns] = UserColumn();

  return (
    <>
      <TitleBox title="موارد مصرف">
        {hasPermission('warehouse', ['create']) && <UpdateCreatePlaceConsumption />}
        <DeleteFilterTable />
      </TitleBox>
      <CheckPermissionPage module="place_consumption">
        <ComponentCard>
          <CreatorTable
            columns={columns}
            listAddress="place_consumption"
            childrenColumnName="childs"
            expandable={{ childrenColumnName: 'childs' }}
          />
        </ComponentCard>
      </CheckPermissionPage>
    </>
  );
};

export default PlaceConsumption;

import React from 'react';
import { hasPermission } from '../../../permission/module';
import ComponentCard from '../../../components/ComponentCard';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import PlaceColumn from './PlaceColumn';
import UpdateCreatePlace from './UpdateCreatePlace';
import TitleBox from '../../../components/TitleBox';


const UpdateCreateSection = () => {
  const [columns] = PlaceColumn();

  return (<>

      <TitleBox title="انبارها">
        {hasPermission('category', ['create']) && <UpdateCreatePlace />}
        <DeleteFilterTable />
      </TitleBox>

      <CheckPermissionPage module="category">
        <ComponentCard>
          <CreatorTable columns={columns} listAddress="storehouse/place" childrenColumnName="childs" expandable={{
            childrenColumnName: 'children_place', indentSize: 15,
            // childrenColumnName: (row)=> {
            //     return row.childs.length && 'childs'
            // }
          }} />
        </ComponentCard>
      </CheckPermissionPage></>
  );
};

export default UpdateCreateSection;

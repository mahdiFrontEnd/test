import React from 'react';
import CategoryColumn from './CategoryColumn';
import UpdateCreateCategory from './UpdateCreateCategory';
import TitleBox from '../../../components/TitleBox';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import { hasPermission } from '../../../permission/module';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import ComponentCard from '../../../components/ComponentCard';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';


const UpdateCreateSection = () => {
  const [columns] = CategoryColumn();

  return (<>

      <TitleBox title="دسته بندی محصولات">
        {hasPermission('storehouse_category', ['create']) && <UpdateCreateCategory />}
        <DeleteFilterTable />
      </TitleBox>

      <CheckPermissionPage module="storehouse_category">
        <ComponentCard>
          <CreatorTable columns={columns} listAddress="storehouse/category" childrenColumnName="childs" expandable={{
            childrenColumnName: 'children_category', indentSize: 15,
            // childrenColumnName: (row)=> {
            //     return row.childs.length && 'childs'
            // }
          }} />
        </ComponentCard>
      </CheckPermissionPage></>
  );
};

export default UpdateCreateSection;

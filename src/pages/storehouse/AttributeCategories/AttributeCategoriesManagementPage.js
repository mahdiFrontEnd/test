import React from 'react';
import TitleBox from '../../../components/TitleBox';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import { hasPermission } from '../../../permission/module';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import ComponentCard from '../../../components/ComponentCard';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import AttributeCategoriesColumn from './AttributeCategoriesColumn';
import UpdateCreateAttributeCategories from './UpdateCreateAttributeCategories';


const AttributeCategoriesManagementPage = () => {
  const [columns] = AttributeCategoriesColumn();

  return (<>

      <TitleBox title="دسته بندی ویژگی ها">
        {hasPermission('category', ['create']) && <UpdateCreateAttributeCategories />}
        <DeleteFilterTable />
      </TitleBox>

      <CheckPermissionPage module="category">
        <ComponentCard>
          <CreatorTable columns={columns} listAddress="storehouse/attribute_category" childrenColumnName="childs"
                        expandable={{
                          childrenColumnName: 'children_attribute_category', indentSize: 15,
                          // childrenColumnName: (row)=> {
                          //     return row.childs.length && 'childs'
                          // }
                        }} />
        </ComponentCard>
      </CheckPermissionPage></>
  );
};

export default AttributeCategoriesManagementPage;

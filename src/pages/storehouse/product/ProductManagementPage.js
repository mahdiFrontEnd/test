import React from 'react';

import ProductColumn from './ProductColumn';
import ComponentCard from '../../../components/ComponentCard';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import UpdateCreateProduct from './UpdateCreateProduct';

const UserManagementPage = () => {
  const [columns] = ProductColumn();

  return (
    <>
      <ComponentCard>
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">محصولات</h4>
          <div className="d-flex gap-2 align-items-center">


            <UpdateCreateProduct />
            <DeleteFilterTable />
          </div>
        </div>
      </ComponentCard>
      <CheckPermissionPage module="product">
        <ComponentCard>
          <CreatorTable
            columns={columns}
            listAddress="storehouse/product"
          />
        </ComponentCard>
      </CheckPermissionPage>
    </>
  );
};
export default UserManagementPage;

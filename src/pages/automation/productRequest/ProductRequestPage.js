// import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useSearchParams } from 'react-router-dom';
// import { hasPermission } from '../../../permission/module';
// import ComponentCard from '../../../components/ComponentCard';
// import CheckPermissionPage from '../../../permission/CheckPermissionPage';
// import UpdateCreateProductRequest from './UpdateCreateProductRequest';
// import { HandleSetParamsInRedux } from '../../../helper/HandleSetParamsInRedux';
// import { getFilter } from '../../../store/TableRedux/TableRedux';
// import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
// import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
// import ProductRequestColumn from './ProductRequestColumn';
//
// const ProductRequestPage = () => {
//   const [searchParams] = useSearchParams();
//   const [columns] = ProductRequestColumn();
//   const dispatch = useDispatch();
//
//
//
//   useEffect(() => {
//     HandleSetParamsInRedux(dispatch, getFilter, searchParams);
//   }, [searchParams]);
//
//   return (
//     <>
//       <ComponentCard>
//         <div className="d-flex justify-content-between">
//           <h4>درخواست کالا</h4>
//
//           <div className="d-flex gap-2 align-items-center">
//              {hasPermission('ware', ['create']) && <UpdateCreateProductRequest />}
//             <DeleteFilterTable/>
//           </div>
//         </div>
//       </ComponentCard>
//       <CheckPermissionPage module="ware">
//         <ComponentCard>
//           <CreatorTable
//             columns={columns}
//             listAddress="ware"
//           />
//         </ComponentCard>
//       </CheckPermissionPage>
//     </>
//   );
// };
//
// export default ProductRequestPage;


import React from 'react';
import ComponentCard from '../../../components/ComponentCard';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import TitleBox from '../../../components/TitleBox';
import ProductRequestColumn from './ProductRequestColumn';
import { hasPermission } from '../../../permission/module';
import UpdateCreateProductRequest from './UpdateCreateProductRequest';

const ProductRequestPage = () => {
  const [columns] = ProductRequestColumn();


  return (<>

      <TitleBox title="درخواست کالا">
        {hasPermission('ware', ['create']) && <UpdateCreateProductRequest />}
        <DeleteFilterTable />
      </TitleBox>


      <CheckPermissionPage module="ware">
        <ComponentCard>
          <CreatorTable
            columns={columns}
            listAddress="ware"
            // onDoubleClickRowHandler={(row) => navigate(`/automation/ware/${row?.id}`)}
          />
        </ComponentCard>
      </CheckPermissionPage>
    </>
  );
};

export default ProductRequestPage;

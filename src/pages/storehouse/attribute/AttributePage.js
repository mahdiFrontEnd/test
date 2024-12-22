import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { hasPermission } from '../../../permission/module';
import ComponentCard from '../../../components/ComponentCard';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import UpdateCreateAttribute from './UpdateCreateAttribute';
import { HandleSetParamsInRedux } from '../../../helper/HandleSetParamsInRedux';
import { getFilter } from '../../../store/TableRedux/TableRedux';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import AttributeColumn from './AttributeColumn';

const AttributePage = () => {
  const [searchParams] = useSearchParams();
  const [columns] = AttributeColumn();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setLoading(true);
  //
  //   Products.request({
  //     success: ({ result }) => {
  //       setRoleList(result.data);
  //     },
  //     final: () => {
  //       setLoading(false);
  //     },
  //   })
  //     .addParams(filter)
  //     .attribute();
  // }, [getAgain, filter]);

  useEffect(() => {
    HandleSetParamsInRedux(dispatch, getFilter, searchParams);
  }, [searchParams]);

  return (
    <>
      <ComponentCard>
        <div className="d-flex justify-content-between">
          <h4>ویژگی ها</h4>

          <div className="d-flex gap-2 align-items-center">
            {/*<SearchInputTopTable searchName="name_fa" />*/}
            {hasPermission('product_attribute', ['create']) && <UpdateCreateAttribute />}
            <DeleteFilterTable/>
          </div>
        </div>
      </ComponentCard>
      <CheckPermissionPage module="product_attribute">
        <ComponentCard>
          <CreatorTable
            columns={columns}
            listAddress="storehouse/attribute"
            childrenColumnName="childs"
            expandable={{
              childrenColumnName: 'childs',
              indentSize: 15,
            }}
          />
        </ComponentCard>
      </CheckPermissionPage>
    </>
  );
};

export default AttributePage;

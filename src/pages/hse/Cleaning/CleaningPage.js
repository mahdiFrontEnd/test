import { Link } from 'react-router-dom';
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import ComponentCard from '../../../components/ComponentCard';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import CleaningColumn from './CleaningColumn';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';

const CleaningPage = () => {
  const [columns] = CleaningColumn();

  return (
    <>
      <ComponentCard>
        <div className="d-flex justify-content-between">
          <h4>نظافت</h4>
          <div className="d-flex gap-2 align-items-center">
            {/*{hasPermission('hse', ['create']) && (*/}
              <Link to="/hse/cleaning/create">
                <IconBtn
                  TooltipText="ایجاد"
                  btnClass="greenIconBtn"
                  icon={<FiPlus size={22} />}
                />
              </Link>
            {/*)}*/}
            <DeleteFilterTable  />
          </div>
        </div>
      </ComponentCard>
      <CheckPermissionPage module="customer">
        <ComponentCard>
          <CreatorTable columns={columns} listAddress="customer" />
        </ComponentCard>
      </CheckPermissionPage>
    </>
  );
};

export default CleaningPage;

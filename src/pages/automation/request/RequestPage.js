import React from 'react';
import { useNavigate } from 'react-router-dom';
import ComponentCard from '../../../components/ComponentCard';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import AutomationColumn from '../../../components/automation/AutomationColumn';
import AutomationAddModal from '../../../components/automation/AutomationFunctionButtons/AutomationAddModal';
import SearchInputTopTable from '../../../components/MicroComponents/table/SearchInputTopTable';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import ExportModal from './ExportModal';
import TitleBox from '../../../components/TitleBox';
import SeeAllButton from '../../../components/automation/AutomationFunctionButtons/SeeAllButton';

const RequestPage = () => {
  const navigate = useNavigate();
  const [columns] = AutomationColumn('request', [
    'body',
    'subjectText',
    'module_name',
    'company',
    'time',
    'price',
  ]);

  return (<>

      <TitleBox title="درخواست ها">
        <SearchInputTopTable showSeen />
        <ExportModal />

        <AutomationAddModal address="automation_request" title="اضافه کردن درخواست" />
        <SeeAllButton address="request"/>
        <DeleteFilterTable />
      </TitleBox>


      <CheckPermissionPage module="automation_request">
        <ComponentCard>
          <CreatorTable
            columns={columns}
            listAddress="automation_request"
            onDoubleClickRowHandler={(row) => navigate(`/automation/request/request_detail/${row?.id}`)}
          />
        </ComponentCard>
      </CheckPermissionPage>
    </>
  );
};

export default RequestPage;


// <<<<<<< HEAD:src/pages/automation/request/RequestPage.js
//   =======
//   return (
//     <>
//       <ComponentCard>
//         <div className="d-flex justify-content-between">
//           <h4>درخواست ها</h4>
//           <div className="d-flex gap-2 align-items-center">
//             <SearchInputTopTable showSeen />
//             <ExportModal />
//             <VacationDetail />
//             <AutomationAddModal address="automation_request" title="اضافه کردن درخواست" />
//             <DeleteFilterTable  />
//           </div>
//           >>>>>>> dev-stage:src/views/automation/request/RequestPage.js
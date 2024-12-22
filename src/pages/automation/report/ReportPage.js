import React from 'react';
import { useNavigate } from 'react-router-dom';
import ComponentCard from '../../../components/ComponentCard';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import AutomationColumn from '../../../components/automation/AutomationColumn';
import AutomationAddModal from '../../../components/automation/AutomationFunctionButtons/AutomationAddModal';
import SearchInputTopTable from '../../../components/MicroComponents/table/SearchInputTopTable';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import TitleBox from '../../../components/TitleBox';


const ListPageAutomation = () => {
  const navigate = useNavigate();
  const [columns] = AutomationColumn('report', ['module_name', 'subjectSelect', 'company', 'status', 'price', 'detail', 'computing']);

  return (

    <>

      <TitleBox title="گزارش دهی">
        <SearchInputTopTable showSeen />
        <AutomationAddModal address="automation_report" title="اضافه کردن گزارش" />
        <DeleteFilterTable />
      </TitleBox>
      <CheckPermissionPage module="automation_report">
        <ComponentCard>

          <CreatorTable columns={columns}
                        listAddress="automation_report"
                        onDoubleClickRowHandler={(row) => navigate(`/automation/report/report_detail/${row?.id}`)} />
        </ComponentCard></CheckPermissionPage></>);
};

export default ListPageAutomation;

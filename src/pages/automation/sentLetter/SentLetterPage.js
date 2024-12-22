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
import SeeAllButton from '../../../components/automation/AutomationFunctionButtons/SeeAllButton';


const SentLetterPage = () => {
  const navigate = useNavigate();
  const [columns] = AutomationColumn('sent_letter', ['module_name', 'subjectSelect', 'price', 'detail', 'computing']);

  return (<>
    <TitleBox title="نامه های ارسالی">
      <SearchInputTopTable showSeen />
      <AutomationAddModal address="automation_sent_letter" title="اضافه کردن نامه های ارسالی" />
      <SeeAllButton address="sent_letter"/>
      <DeleteFilterTable />
    </TitleBox>
    <CheckPermissionPage module="automation_sent_letter"><ComponentCard>

      <CreatorTable columns={columns}
                    listAddress="automation_sent_letter"
                    onDoubleClickRowHandler={(row) => navigate(`/automation/sent_letter/sent_letter_detail/${row?.id}`)} />
    </ComponentCard></CheckPermissionPage></>);
};

export default SentLetterPage;

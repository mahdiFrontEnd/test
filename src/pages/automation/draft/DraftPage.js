import { useNavigate } from 'react-router-dom';
import ComponentCard from '../../../components/ComponentCard';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import AutomationAddModal from '../../../components/automation/AutomationFunctionButtons/AutomationAddModal';
import SearchInputTopTable from '../../../components/MicroComponents/table/SearchInputTopTable';
import AutomationColumn from '../../../components/automation/AutomationColumn';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import TitleBox from '../../../components/TitleBox';
import SeeAllButton from '../../../components/automation/AutomationFunctionButtons/SeeAllButton';


const DraftPage = () => {
  const navigate = useNavigate();
  const [columns] = AutomationColumn('draft', ['module_name', 'subjectSelect', 'price', 'detail', 'computing', 'company', 'status']);


  return (<>


    <TitleBox title="پیش نویس نامه">
      <SearchInputTopTable showSeen />
      <AutomationAddModal address="automation_draft" title="اضافه کردن مکاتبات"
                          showList={['inputSubject', 'selectSubject', 'to', 'cc', 'company_id', 'body', 'attachments']} />
      <SeeAllButton address="draft"/>
      <DeleteFilterTable />
    </TitleBox>


    <CheckPermissionPage module="automation_draft">
      <ComponentCard>
        <CreatorTable columns={columns}
                      listAddress="automation_draft"
                      onDoubleClickRowHandler={(row) => navigate(`/automation/draft/draft_detail/${row?.id}`)} />
      </ComponentCard></CheckPermissionPage></>);
};

export default DraftPage;

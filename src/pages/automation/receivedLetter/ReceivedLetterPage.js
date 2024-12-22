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


const ReceivedLetterPage = () => {
  const navigate = useNavigate();
  const [columns] = AutomationColumn('received_letter', ['module_name', 'subjectSelect', 'price', 'detail', 'computing']);

  // const [columns] = ReceivedLetterColumn()

  return (<>
    <TitleBox title="نامه های دریافتی">
      <SearchInputTopTable showSeen />
      <AutomationAddModal address="automation_received_letter" title="اضافه کردن نامه های دریافتی" />
      <SeeAllButton address="received_letter"/>
      <DeleteFilterTable />
    </TitleBox>
    <CheckPermissionPage module="automation_received_letter">
      <ComponentCard>

        <CreatorTable columns={columns}
                      listAddress="automation_received_letter"
                      onDoubleClickRowHandler={(row) => navigate(`/automation/received_letter/received_letter_detail/${row?.id}`)} />
      </ComponentCard></CheckPermissionPage></>);
};

export default ReceivedLetterPage;

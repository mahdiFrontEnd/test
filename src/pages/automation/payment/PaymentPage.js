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


const PaymentPage = () => {
  const navigate = useNavigate();
  const [columns] = AutomationColumn('payment', ['module_name', 'subjectSelect', 'detail', 'computing', 'company']);


  return (<>
    <TitleBox title="اعلامیه پرداخت">
      <SearchInputTopTable />
      <AutomationAddModal address="automation_payment" title="اضافه کردن اعلامیه پرداخت" />
      <SeeAllButton address="payment"/>
      <DeleteFilterTable />
    </TitleBox>
    <CheckPermissionPage module="automation_payment">
      <ComponentCard>
        <CreatorTable columns={columns}
                      listAddress="automation_payment"
                      onDoubleClickRowHandler={(row) => navigate(`/automation/payment/payment_detail/${row?.id}`)} />
      </ComponentCard></CheckPermissionPage></>);
};

export default PaymentPage;

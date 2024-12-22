import { hasPermission } from '../../permission/module';
import ComponentCard from '../../components/ComponentCard';
import CreatorTable from '../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../components/MicroComponents/DeleteFilterTable';
import CustomerColumn from './CustomerColumn';
import UpdateCreateCustomer from './UpdateCreateCustomer';
import CheckPermissionPage from '../../permission/CheckPermissionPage';
import TitleBox from '../../components/TitleBox';


const CustomerManagementPage = () => {
  const [columns] = CustomerColumn();

  return (
    <>

      <TitleBox title="مشتریان">
        {hasPermission('customer', ['create']) && <UpdateCreateCustomer />}
        <DeleteFilterTable />
      </TitleBox>


      <CheckPermissionPage module="customer">
        <ComponentCard>

          <CreatorTable columns={columns} listAddress="customer" />
        </ComponentCard>
      </CheckPermissionPage>
    </>
  );
};

export default CustomerManagementPage;

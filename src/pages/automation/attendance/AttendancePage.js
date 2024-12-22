import ComponentCard from '../../../components/ComponentCard';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import TitleBox from '../../../components/TitleBox';
import AttendanceColumn from './AttendanceColumn';
import BestAndWorst from './BestAndWorst';


const AttendancePage = () => {
  const [columns] = AttendanceColumn();

  return (<>
    <TitleBox title="ورود و خروج ها">
      <DeleteFilterTable />
    </TitleBox>
    <BestAndWorst />
    <ComponentCard>


      <CreatorTable columns={columns} listAddress="attendance"  />
    </ComponentCard>
  </>);
};

export default AttendancePage;

import React from 'react';
import ComponentCard from '../../components/ComponentCard';
import CreatorTable from '../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../components/MicroComponents/DeleteFilterTable';
import PurchaseReportAdd from '../../components/commerce/PurchaseReportAdd';
import SearchInputTopTable from '../../components/MicroComponents/table/SearchInputTopTable';
import ReportCommercePurchaseColumn from '../../components/commerce/ReportCommercePurchaseColumn';
import CheckPermissionPage from '../../permission/CheckPermissionPage';
import TitleBox from '../../components/TitleBox';


const PurchaseReportPage = () => {
  const [columns] = ReportCommercePurchaseColumn();

  return (
    <>
      <TitleBox title="گزارشات">
        <SearchInputTopTable />
        <PurchaseReportAdd address="commerce_purchase/report" title="گزارش جدید" />
        <DeleteFilterTable />
      </TitleBox>
      <CheckPermissionPage module="commerce_purchase">
        <ComponentCard>
          <CreatorTable columns={columns} listAddress="commerce_purchase/report" />
        </ComponentCard></CheckPermissionPage></>
  );
};

export default PurchaseReportPage;

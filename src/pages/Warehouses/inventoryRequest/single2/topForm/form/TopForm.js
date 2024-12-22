import React from "react";
import SectionForm from "./SectionForm";
import CostCenterCodeBox from "./CostCenterCodeBox";
import DeliveryTypeForm from "./DeliveryTypeForm";
import SupplierForm from "./SupplierForm";
import FromWarehouseLocationForm from "./FromWarehouseLocationForm";
import ToWarehouseLocationForm from "./ToWarehouseLocationForm";
import CustomerForm from "./CustomerForm";
import SubmitForm from "./SubmitForm";

const TopForm = () => {
  return (
    <div>
      <SectionForm/>
      <CostCenterCodeBox/>
      <DeliveryTypeForm/>
      <SupplierForm/>
      <FromWarehouseLocationForm/>
      <ToWarehouseLocationForm/>
      <CustomerForm/>
      <SubmitForm/>

    </div>
  );
};

export default TopForm;
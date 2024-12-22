import React from 'react';
import {hasPermission} from "./module";
import ComponentCard from "../components/ComponentCard";

const CheckPermissionPage = ({children, module, permission=["self_list","list",'show']}) => {
    return (
        <div>
            {hasPermission(module, permission) ?  children  :  <ComponentCard><div>شما به این قسمت دسترسی ندارید !!</div></ComponentCard>}
        </div>
    );
};

export default CheckPermissionPage;
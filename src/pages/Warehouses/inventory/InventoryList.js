import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { BsFiletypeExe } from 'react-icons/bs';
import ComponentCard from '../../../components/ComponentCard';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import UserColumn from './InventoryColumn';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import Inventory from '../../../api/http_request/Model/inventory/Inventory';
import { baseURL } from '../../../api/http_request/url';
import TitleBox from '../../../components/TitleBox';

const InventoryList = () => {
  const [columns] = UserColumn();
  const [loading, setLoading] = useState(false);
  const filter = useSelector((state) => state.TableRedux.filter);

  const getExcel = () => {
    const params = { ...filter };

    const convertToString = (key) => {
      params[key] = JSON.stringify(params[key]);
    };
    const handleDelete = (key) => {
      delete params[key];
    };
    Object.entries(params).forEach(([key, value]) => {
      if (['', undefined, 'undefined', null, 0, '0'].includes(value) && !value) {
        handleDelete(key);
      } else if (Array.isArray(value)) {
        if (value?.length > 0) {
          convertToString(key);
        } else {
          handleDelete(key);
        }
      }
    });

    Inventory.request({
      beforeSend: () => {
        setLoading(true);
      },
      success: ({ result }) => {
        window.open(baseURL + result, '_blank');

      },
      error: ({ error }) => {
        toast.error(error.data.message);
      },
      final: () => {
        setLoading(false);
      },
    }).inventoryReport(params);
  };
  return (
    <>


      <TitleBox title="موجودی انبار ها">
        <IconBtn
          btnClass="blueIconBtn"
          icon={<BsFiletypeExe size={22} />}
          onClick={getExcel}
          loading={loading}
        />
        <DeleteFilterTable />
      </TitleBox>


      <CheckPermissionPage module="inventory">
        <ComponentCard>
          <CreatorTable
            columns={columns}
            listAddress="inventory"
            childrenColumnName="childs"
            expandable={{ childrenColumnName: 'childs' }}
          />
        </ComponentCard>
      </CheckPermissionPage>
    </>
  );
};

export default InventoryList;

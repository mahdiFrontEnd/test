import { useSelector } from 'react-redux';
import { useState } from "react";
 import UseSetParams from '../../../helper/UseSetParams';
import WarehouseFilterTable from '../../../components/MicroComponents/table/WarehouseFilterTable';
import CascaderFilterTable from '../../../components/MicroComponents/table/CascaderFilterTable';
import GetProductSku from "../../../api/http_request/Model/common/GetProductSku";

const UserColumn = () => {
  const filter = useSelector((state) => state.TableRedux.filter);

  const [productArray, setProductArray] = useState([]);
  const [handleSetParams] = UseSetParams();
  const [getColumnWarehouseProps] = WarehouseFilterTable();

  const getProducts = () => {
    GetProductSku(
      setProductArray,
    );


  };
  const funcHandleSetParams = (newFilter) => {
    handleSetParams(newFilter);
  };
  const [getColumnCascaderProps] = CascaderFilterTable();

  const columns = [
    {
      title: 'نام محصول',
      dataIndex: 'sku_name',
      key: 'sku_name',
      ...getColumnCascaderProps(
        filter.sku_ids,
        'sku_ids',
        'نام محصول',
        productArray,
        getProducts,
        (res) => {
          funcHandleSetParams([{ key: 'sku_ids', value: res }]);
        },
      ),
    },
    {
      title: 'مرکز نگهداری',
      dataIndex: 'warehouse_location_id',
      key: 'warehouse_location_id',

      render: (item, row) => {
        return row.warehouse_location_name;
      },
    },
    {
      title: 'انبار ',
      dataIndex: 'warehouse_ids',
      key: 'warehouse_ids',
      ...getColumnWarehouseProps(
        filter.warehouse_ids,
        'warehouse_ids',
        (x) => {
          funcHandleSetParams([{ key: 'warehouse_ids', value: x }]);
        },
        filter.warehouse_location_id,
        (e) => {
          funcHandleSetParams([{ key: 'warehouse_location_id', value: e }]);
        },
      ),

      render: (item, row) => {
        return row.warehouse_name;
      },
    },
    {
      title: 'تعداد ',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'تعداد کل ',
      dataIndex: 'total_quantity',
      key: 'total_quantity',
    },
  ];
  return [columns];
};

export default UserColumn;

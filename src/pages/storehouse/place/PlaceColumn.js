import React from 'react';
// import {useSelector} from "react-redux";
// import UseSetParams from "../../../helper/UseSetParams";
// import SearchFilterTable from "../../../components/MicroComponents/table/SearchFilterTable";
import UpdateCreatePlace from './UpdateCreatePlace';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';

const PlaceColumn = () => {
  // const filter = useSelector((state) => state.TableRedux.filter);
  // const [getColumnSearchProps,] = SearchFilterTable()

  // const [handleSetParams,] = UseSetParams()

  // const funcHandleSetParams = (newFilter) => {
  //     handleSetParams(newFilter)
  // }

  const columns = [
    {
      title: 'نام',
      dataIndex: 'row',
      className: 'text-start ',
      key: 'row',
      // ...getColumnSearchProps('نام', filter.name, (res) => {
      //     funcHandleSetParams([{key: 'name', value: res}])
      // }),
      render: (text, row) => {
        return (
          <div className="d-flex gap-2 align-items-center py-2">
            {/*<img*/}
            {/*  alt="category"*/}
            {/*  className="main-img img-responsive img-circle"*/}
            {/*  src={row.icon || '/noImage.png'}*/}
            {/*  width={40}*/}
            {/*  height={40}*/}
            {/*/>*/}
            <span>{row?.name}</span>
          </div>
        );
      },
    },
    // {
    //   title: 'انبار مادر',
    //   dataIndex: 'parent_category',
    //   render: (text) => {
    //     return (
    //
    //       <span>{text?.name}</span>
    //
    //     );
    //   },
    // },

    {
      title: 'عملیات',
      dataIndex: 'function',
      key: 'function',
      fixed: 'right',
      render: (text, row) => {
        return (
          <div className="text-center  d-flex flex-column w-100">
            <div className="text-center d-flex gap-1 d-flex justify-content-center">
              {/*{hasPermission('category', ['edit']) &&*/}
              <UpdateCreatePlace rowData={row} />
              {/*}*/}
              {/*{hasPermission('category', ['delete']) && (*/}
              <ConfirmDeleteModal id={row.id} apiAddress="storehouse/place/remove" />
              {/*<DeleteBox inDetail address="category" rowData={row} />*/}
              {/*)}*/}
            </div>
          </div>
        );
      },
    },
  ];
  return [columns];
};

export default PlaceColumn;

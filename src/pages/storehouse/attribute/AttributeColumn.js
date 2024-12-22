import React from 'react';
import { hasPermission } from '../../../permission/module';
import UpdateCreateAttribute from './UpdateCreateAttribute';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';

const AttributeColumn = () => {
  // const filter = useSelector((state) => state.TableRedux.filter);
  // const [getColumnSearchProps,] = SearchFilterTable()

  // const [handleSetParams,] = UseSetParams()

  // const funcHandleSetParams = (newFilter) => {
  //     handleSetParams(newFilter)
  // }


  const columns = [{
    title: 'نام',
    dataIndex: 'name',
    key: 'name',

  },
     {
      title: 'فعال',
      dataIndex: 'status',
      key: 'status', render: (x) => {
        return x === 1 ? 'فعال' : 'غیرفعال';
      },
    }, {
      title: 'عملیات', dataIndex: 'function', key: 'function', fixed: 'right', render: (text, row) => {
        return <div className="text-center d-flex flex-column w-100">
          <div className="text-center d-flex gap-1 d-flex justify-content-center">

            {hasPermission('section', ['edit']) && <UpdateCreateAttribute rowData={row} />}
            {/*{hasPermission("section", ["delete"]) &&*/}
            {/*    <DeleteBox inDetail address='section' rowData={row}/>*/}
            {/*}*/}

            {hasPermission('category', ['delete']) && (
              <ConfirmDeleteModal apiAddress="storehouse/attribute/remove" id={row?.id} />
            )}
          </div>
        </div>;

      },
    },

  ];
  return [columns];
};

export default AttributeColumn;
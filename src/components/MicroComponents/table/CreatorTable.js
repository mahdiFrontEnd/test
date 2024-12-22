import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import TableBox from './TableBox';
import { getDataTable2 } from '../../../api/automation/getDataTable';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import { getConfig, getDataRows, getFilter, getTotalCount ,getFullTableData} from '../../../store/TableRedux/TableRedux';

const CreatorTable = ({defFilter={},
                        childrenColumnName,
                        expandable,handleRowClassName,
                        listAddress,
                        onDoubleClickRowHandler,
                        columns,

                      }) => {
  const didMountRef = useRef(false);
  const dispatch = useDispatch();
  const getAgain = useSelector((state) => state.loadingReducer.getAgain);
  const loading = useSelector((state) => state.loadingReducer.loader);
  const [searchParams] = useSearchParams();
  const filter = useSelector((state) => state.TableRedux.filter);
  const dataRows = useSelector((state) => state.TableRedux.dataRows);
  const total = useSelector((state) => state.TableRedux.totalCount);

  useEffect(() => {
    let params = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [k, v] of searchParams.entries()) {
      params = { ...params, [k]: v };
    }

    dispatch(getFilter({ ...params,...defFilter }));

  }, [searchParams]);


  const getData = ({ data, totalCount, config }) => {
    dispatch(getDataRows(data));
    dispatch(getTotalCount(totalCount));
    if (config) {
      dispatch(getConfig(config));
    }

  };
  useEffect(() => {
    if (didMountRef.current) {

      getDataTable2(listAddress, filter, dispatch, (data) => {
        dispatch(getFullTableData(data));
        getData(data);
      });
    } else {
      didMountRef.current = true;
    }
  }, [getAgain, filter, listAddress]);


  useEffect(() => {
    dispatch(getDataRows([]));
    dispatch(getTotalCount(0));
    const params = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    if (Object.keys(params)?.length > 0) {
      dispatch(getFilter({ ...params,...defFilter }));
    } else {
      dispatch(getFilter({...defFilter}));
      dispatch(getAgainHandler());
    }

  }, []);

  return (<div>

    <TableBox handleRowClassName={handleRowClassName} childrenColumnName={childrenColumnName} loading={loading} columns={columns}
              dataRows={dataRows}
              totalCount={total}
              onDoubleClickRow={(row) => {
                // eslint-disable-next-line no-unused-expressions
                onDoubleClickRowHandler && onDoubleClickRowHandler(row);
              }}
              expandable={expandable}
    />
  </div>);
};

export default CreatorTable;
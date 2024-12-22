import { useSelector } from 'react-redux';
import UseSetParams from '../../../helper/UseSetParams';
import { getFilter } from '../../../store/TableRedux/TableRedux';

const usePagination = ( totalCount,showSizeChanger = true, showPagination = true ) => {

  const filter = useSelector((state) => state.TableRedux.filter);

  const [, , handleSetSkipTakeParams] = UseSetParams(getFilter);


  const funcHandleSetParams = (skip, take) => {
    handleSetSkipTakeParams(skip, take);
  };


  const paginationJson = showPagination ? {
    hideOnSinglePage: true,
    total: totalCount,
    showTotal: (x) => `جمعا  ${x} مورد`,
    defaultPageSize: 10, pageSize: filter.take,
    position: ['bottomCenter'],
    showSizeChanger,

    onChange: (e = 1, x = 10) => {
      funcHandleSetParams(((e - 1) * x), x);
    },
    current: filter.skip ? ((filter.skip / filter.take) + 1) : 1,
  } : false;
  return [paginationJson];
};

export default usePagination;
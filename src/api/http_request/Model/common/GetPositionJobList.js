import { toast } from 'react-toastify';
// eslint-disable-next-line import/no-cycle
import Common from './common';

const GetPositionJobList = (setCategoryList, setLoading, params) => {
  Common.request({
    beforeSend: () => {
      // eslint-disable-next-line no-unused-expressions
      setLoading && setLoading(true);
    },
    success: (result) => {
      setCategoryList(result.result);
    },
    error: ({ error }) => {
      toast.error(error.data.message);
    },
    final: () => {
      // eslint-disable-next-line no-unused-expressions
      setLoading && setLoading(false);
    },
  })
    .addParams(params)
    .positionJobList();
};
export default GetPositionJobList;

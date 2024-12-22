import { toast } from 'react-toastify';
import Common from '../common/common';

const GetTypeListCommon = (setTypeList, setLoading) => {
  Common.request({
    beforeSend: () => {
      // eslint-disable-next-line no-unused-expressions
      setLoading && setLoading(true);
    },
    success: ({ result }) => {
      setTypeList(result);
    },
    error: ({ error }) => {
      toast.error(error.data.message);
    },
    final: () => {
      // eslint-disable-next-line no-unused-expressions
      setLoading && setLoading(false);
    },
  }).productTypeList();
};
export default GetTypeListCommon;

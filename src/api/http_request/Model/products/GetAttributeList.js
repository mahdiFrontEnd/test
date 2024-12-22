import { toast } from 'react-toastify';
import Common from '../common/common';

const GetAttributeList = (setAttributeList, setLoading, params = {}) => {
  Common.request({
    beforeSend: () => {
      // eslint-disable-next-line no-unused-expressions
      setLoading && setLoading(true);
    },
    success: ({ result }) => {
      setAttributeList(result);
    },
    error: ({ error }) => {
      toast.error(error?.data?.message);
    },
    final: () => {
      // eslint-disable-next-line no-unused-expressions
      setLoading && setLoading(false);
    },
  })
    .addParams(params)
    .attributeList();
};
export default GetAttributeList;

import { toast } from 'react-toastify';
import Common from './common';

const GetSectionList = (setCategoryList, setLoading, type) => {
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
    .addParams(  type ? { type } : {})
    .sectionListCommon();
};
export default GetSectionList;

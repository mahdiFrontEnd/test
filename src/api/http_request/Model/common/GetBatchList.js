import { toast } from 'react-toastify';
import Common from './common';

const GetBatchList = (setCategoryList, setLoading) => {
  Common.request({
    beforeSend: () => {
      // eslint-disable-next-line no-unused-expressions
      setLoading && setLoading(true);
    },
    success: ({ result }) => {

      let arr = [];
      // eslint-disable-next-line array-callback-return
      result.map((item) => {
        arr = [...arr, { value: `${item.code}`, label: item.code, measurement_name: item.measurement_name, product_name: item.product_name, type_name: item.type_name}];
      });




      setCategoryList(arr);
    },
    error: ({ error }) => {
      toast.error(error.data.message);
    },
    final: () => {
      // eslint-disable-next-line no-unused-expressions
      setLoading && setLoading(false);
    },
  }).batchNumber();
};
export default GetBatchList;

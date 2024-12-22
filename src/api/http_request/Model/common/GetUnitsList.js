import { toast } from 'react-toastify';
import Common from './common';

const GetUnitsList = (setCategoryList, setLoading) => {

  Common.request({
    beforeSend: () => {
      setLoading(true);
    },
    success: ({ result }) => {

      setCategoryList(result);
    },
    error: ({ error }) => {
      toast.error(error.data.message);
    },
    final: () => {
     setLoading(false);
    },
  }).unitsListCommon();
};
export default GetUnitsList;

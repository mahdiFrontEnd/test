import Automation from './Automation';

const GetListPrePrint = (setData, setLoading,id) => {

  Automation.request({
    beforeSend: () => {
      setLoading(true);
    }, error: () => {
    }, success: async (x) => {

      setData(x.result);

    }, failed: () => {
    }, final: () => {
      setLoading(false);
    },
  }).listPrePrint(id);

};
export default GetListPrePrint;






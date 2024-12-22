import Commerce from './Commerce';

const GetPurchaseBanks = (setData, setLoading) => {

  Commerce.request({
    beforeSend: () => {
      setLoading(true);
    }, error: () => {
    }, success: async (x) => {

      setData(x.result);

    }, failed: () => {
    }, final: () => {
      setLoading(false);
    },
  }).purchaseBanks();

};
export default GetPurchaseBanks;






import { toast } from 'react-toastify';
import Common from './common';

const GetInventoryPlace = (setCategoryList, setLoading, product_id) => {
  const params = {};
  if (product_id) {
    params.product_id = product_id;
  }
  Common.request({
    beforeSend: () => {
      // eslint-disable-next-line no-unused-expressions
      setLoading && setLoading(true);
    },
    success: ({ result }) => {
      // let arr = [];
      // // eslint-disable-next-line array-callback-return
      // result.map((item) => {
      //   arr = [...arr, { value: `${item.id}`, label: item.name ,children: item.skus}];
      // });
      setCategoryList(result);
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
    .inventoryPlaceConsumption();
};
export default GetInventoryPlace;

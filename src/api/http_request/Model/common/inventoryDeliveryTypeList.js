import {toast} from "react-toastify";
import Common from "./common";

const GetInventoryDeliveryTypeList = (setCategoryList, setLoading) => {


    Common.request({
        beforeSend: () => {
            // eslint-disable-next-line no-unused-expressions
            setLoading && setLoading(true)
        },
        success: ({ result }) => {
            let arr = [];
            // eslint-disable-next-line array-callback-return
            result.map((item) => {
                arr = [...arr, { value: `${item.id}`, label: item.name }];
            });
            setCategoryList(arr);
        },



        error: ({error}) => {
            toast.error(error.data.message);
        },
        final: () => {
            // eslint-disable-next-line no-unused-expressions
            setLoading && setLoading(false)

        }
    }).inventoryDeliveryTypeList()

}
export default GetInventoryDeliveryTypeList



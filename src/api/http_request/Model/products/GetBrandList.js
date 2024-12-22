import {toast} from "react-toastify";
import Products from "./Products";

const GetCategoryList = (setCategoryList, setLoading) => {


    Products.request({
        beforeSend: () => {
            // eslint-disable-next-line no-unused-expressions
            setLoading && setLoading(true)
        },
        success: (result) => {
            console.log(result);
            setCategoryList(result.result.data)
        },
        error: ({error}) => {
            toast.error(error.data.message);
        },
        final: () => {
            // eslint-disable-next-line no-unused-expressions
            setLoading && setLoading(false)

        }
    }).addParams({ skip:0, take: 5000    }).brandList()

}
export default GetCategoryList



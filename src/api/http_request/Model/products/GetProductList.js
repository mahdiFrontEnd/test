import {toast} from "react-toastify";
import Products from "./Products";

const GetProductList = (setProductList, params) => {


    Products.request({
        success: (result) => {
            setProductList(result.result)
        },
        error: ({error}) => {
            toast.error(error.data.message);
        }
    }).addParams({params}).categoryList()

}
export default GetProductList



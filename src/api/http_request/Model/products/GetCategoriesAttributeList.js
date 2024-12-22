import {toast} from "react-toastify";
import Products from "./Products";

const GetCategoriesAttribute = (setCategoryList, setLoading) => {


    Products.request({
        beforeSend: () => {
            // eslint-disable-next-line no-unused-expressions
            setLoading && setLoading(true)
        },
        success: (result) => {
            setCategoryList(result.result)
        },
        error: ({error}) => {
            toast.error(error.data.message);
        },
        final: () => {
            // eslint-disable-next-line no-unused-expressions
            setLoading && setLoading(false)

        }
    }).addParams({ skip:0, take: 5000    }).categoriesAttributeList()

}
export default GetCategoriesAttribute



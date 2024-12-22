import {getDataTable2} from "../../../automation/getDataTable";

const GetPurchaseList = (dispatch, filter, getData) => {


    getDataTable2('commerce_purchase', filter, dispatch, getData)
}
export default GetPurchaseList

import Common from "./http_request/Model/common/common";
import Companies from "./http_request/Model/companies/Companies";


export const automationUser = (ignoreMyName, isCashier, callback) => {


    const params = {}
    if (!ignoreMyName) params.ignore_my_name = true
    params.is_cashier = !isCashier ? 1 : 0


    Common.request({
        success: (data) => {
            callback(data)
        }
    }).addParams(params).automationUserList()

};
export const automationType = (callback,setLoading) => {
    // eslint-disable-next-line no-unused-expressions
    setLoading && setLoading(true)
    Common.request({
        success: ({result}) => {
            callback(result)
        },final:()=>{
            // eslint-disable-next-line no-unused-expressions
            setLoading && setLoading(false)
        }
    }).automationTypeList()

};
export const automationCompany = (callback) => {


    Companies.request({
        success: (data) => {
            callback(data)
        }
    }).companies()


};
export const getProducts = (callback) => {


    Common.request({
        success: (data) => {
            callback(data)
        }
    }).productList()

};
export const getMeasurement = (callback) => {

    Common.request({
        success: (data) => {
            callback(data)
        }
    }).measurementList()



};

export const getPurchasePosition = (callback) => {
    Common.request({
        success: (data) => {
            callback(data)
        }
    }).purchasePositionList()


};
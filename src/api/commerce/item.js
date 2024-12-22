import Commerce from "../http_request/Model/commerce/Commerce";

export const itemsUpdateApi = (data, dataId, setIsAddLoading,
                               setShowDelete, callback, callbackError) => {


    Commerce.request({
        success: ({result}) => {
            callback(result);
        }, error: (response) => {
            callbackError(response);
        }, final: () => {
            // eslint-disable-next-line no-unused-expressions
            setIsAddLoading && setIsAddLoading(false)
            // eslint-disable-next-line no-unused-expressions
            setShowDelete && setShowDelete(false)
        }
    }).commerceProducts(data, dataId)

};

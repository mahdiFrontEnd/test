import Commerce from "./Commerce";

const GetPurchasePosition = (setPurchasePosition) => {

    Commerce.request({
        beforeSend: () => {

        }, error: () => {
        }, success: async (data) => {
            setPurchasePosition(data?.result);
        }, failed: () => {
        }, final: () => {
        }
    }).purchasePosition()

}
export default GetPurchasePosition






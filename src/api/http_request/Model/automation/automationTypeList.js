import Common from "../common/common";


const GetAutomationTypeList = (setAutomationTypeList, setAutomationTypeListLoading) => {
    // eslint-disable-next-line no-unused-expressions
    setAutomationTypeListLoading && setAutomationTypeListLoading(true)
    Common.request({
        success: (data) => {
            // eslint-disable-next-line no-unused-expressions
            setAutomationTypeListLoading && setAutomationTypeListLoading(false)
            setAutomationTypeList(data?.result);
        }
    }).automationTypeList()

}
export default GetAutomationTypeList

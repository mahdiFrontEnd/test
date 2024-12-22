import Common from "../common/common";


const GetAutomationUserList = (setAutomationUserList, setAutomationUserListLoading) => {
    // eslint-disable-next-line no-unused-expressions
    setAutomationUserListLoading && setAutomationUserListLoading(true)
    Common.request({
        success: (data) => {
            // eslint-disable-next-line no-unused-expressions
            setAutomationUserListLoading && setAutomationUserListLoading(false)
            setAutomationUserList(data?.result);
        }
    }).automationUserList()

}
export default GetAutomationUserList

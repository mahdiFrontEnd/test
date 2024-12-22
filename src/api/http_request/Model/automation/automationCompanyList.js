import Common from "../common/common";


const GetAutomationCompanyList = (setAutomationCompanyList, setAutomationCompanyListLoading) => {
    // eslint-disable-next-line no-unused-expressions
    setAutomationCompanyListLoading && setAutomationCompanyListLoading(true)
    Common.request({
        success: (data) => {
            // eslint-disable-next-line no-unused-expressions
            setAutomationCompanyListLoading && setAutomationCompanyListLoading(false)
            setAutomationCompanyList(data?.result);
        }
    }).companyList()

}

export default GetAutomationCompanyList

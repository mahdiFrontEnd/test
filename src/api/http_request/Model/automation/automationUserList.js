import Common from '../common/common';


const GetAutomationUserList = (setAutomationUserList, setAutomationUserListLoading, params = {}, hasAll) => {
  // eslint-disable-next-line no-unused-expressions
  setAutomationUserListLoading && setAutomationUserListLoading(true);
  Common.request({
    success: (data) => {

      let userList = data?.result;
      if (hasAll) {
        userList = [{ id: 'all', name: 'انتخاب همه' }, ...userList];
      }
      // eslint-disable-next-line no-unused-expressions
      setAutomationUserListLoading && setAutomationUserListLoading(false);
      setAutomationUserList(userList);
    },
  }).addParams(params).automationUserList();

};
export default GetAutomationUserList;

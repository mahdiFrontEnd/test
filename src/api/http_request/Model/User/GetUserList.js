import {toast} from "react-toastify";
import User from "./User";
import {isError, isLoading} from "../../../../store/loading/LoadingSlice";
import {getTotalCount, getUsers} from "../../../../store/apps/user/UserSlice";

const GetUserList = (dispatch,skip, take,filterId,search) => {


    const params = {skip, take}
    if (filterId) params.filter = `["roles.id","=",${filterId}]`
    if (search) params.search = search

    dispatch(isLoading('isDataList'));
    dispatch(getUsers([]));


    User.request({
        success: (result) => {
            dispatch(isLoading(''));
            const value = result.result.data;
            const totalCountValue = result.result.totalCount;
            dispatch(getUsers(value));
            dispatch(getTotalCount(totalCountValue));

        },
        error: ({error}) => {
            dispatch(isLoading(''));
            dispatch(isError(error.data.message));
            toast.error(error.data.message);

        }
    }).addParams(params).userList()

}
export default GetUserList
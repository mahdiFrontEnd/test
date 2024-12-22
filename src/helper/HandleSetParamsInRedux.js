import {getAgainHandler} from "../store/loading/LoadingSlice";

export const HandleSetParamsInRedux = (dispatch,getFilter,searchParams)=>{
    const params = {};
// eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of searchParams?.entries()) {
        params[key] = value;
    }
    if (Object.keys(params)?.length > 0) {
        dispatch(getFilter({...params}));
    } else {
        dispatch(getFilter({}));
        dispatch(getAgainHandler());
    }
}
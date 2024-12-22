import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Automation from '../http_request/Model/automation/Automation';
import { isError, isLoading } from '../../store/loading/LoadingSlice';
// eslint-disable-next-line import/no-cycle

export const getDataTable2 = (dataRoute, params, dispatch, getData, getError) => {
  const newParams = { ...params };
  if (!newParams.take) {
    newParams.take = 10;
  }
  Automation.request({
    beforeSend: () => {
      // eslint-disable-next-line no-unused-expressions
      dispatch && dispatch(isLoading('isDataTable'));

    },
    success: ({ result }) => {
      // eslint-disable-next-line no-unused-expressions
      getData && getData(result);
      if (result?.config?.unseen) {
        Cookies.set('unseen', JSON.stringify(result?.config?.unseen), {
          expires: 700,
          secure: true,
          sameSite: 'strict',
        });
      }
    },
    error: (error) => {
      // eslint-disable-next-line no-unused-expressions
      getError && getError(error);
      // eslint-disable-next-line no-unused-expressions
      dispatch && dispatch(isLoading(''));
      // eslint-disable-next-line no-unused-expressions
      dispatch && dispatch(isError(error?.response?.data?.message));
      toast.error(error?.data?.message);

    },
    final: () => {
      // eslint-disable-next-line no-unused-expressions
      dispatch && dispatch(isLoading(''));
    },
  })
    .addParams(newParams)
    .getAutomationTable(dataRoute);
};

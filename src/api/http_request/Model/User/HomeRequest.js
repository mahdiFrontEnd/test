import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import User from './User';

import { getCommerceCount, getNotifCount, getPermissions } from '../../../../store/loading/LoadingSlice';
import { handleAttendance } from '../../../../store/attendance/Attendance';

export const getHomeData = (dispatch, useInterval, handleData, handleError) => {

  let countError = 0;
  const callGetHomeData = () => {

    User.request({
      success: ({ result }) => {

        result.calendar.map((item) => (
          toast.info(`زمان تسک (${item})`, {

            autoClose: false,

          })
        ));
        dispatch(getNotifCount(result.unseen));
        dispatch(getCommerceCount(result.unseen.commerce_count));
        dispatch(handleAttendance(result.attendance));
        Cookies.set('unseen', JSON.stringify(result.unseen), {
          expires: 700,
          secure: true,
          sameSite: 'strict',
        });
        dispatch(getPermissions(result.permissions));
        // Cookies.set('permissions', JSON.stringify(result.permissions), {
        //   expires: 700,
        //   secure: true,
        //   sameSite: 'strict',
        // });
        localStorage.setItem('permissions', JSON.stringify(result.permissions));


        // eslint-disable-next-line no-unused-expressions
        handleData && handleData(result);
      },
      error: (error) => {

        // eslint-disable-next-line no-unused-expressions
        handleError && handleError(error.response);

        if (error.response?.status !== 502) {
          toast.error(error.response.data.message);
        }

      },
      failed: () => {
        ++countError;
      },
      // eslint-disable-next-line consistent-return
      error500: () => {
        ++countError;

      },
      error502: async () => {


        ++countError;
      },
      // eslint-disable-next-line consistent-return
      final: async () => {
        if (countError > 1) {
          return clearInterval(interval);
        }
      },
    }).home();
  };
  callGetHomeData();

  const interval =
    useInterval &&
    setInterval(() => {
      callGetHomeData();
    }, 60000);

  return () => clearInterval(interval);
};


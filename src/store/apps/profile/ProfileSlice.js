import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {

  loginUser: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
};

export const ProfileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {

    getLoginUser: (state, action) => {
      state.loginUser = action.payload;
    },

  },
});

export const { getLoginUser } = ProfileSlice.actions;


export default ProfileSlice.reducer;


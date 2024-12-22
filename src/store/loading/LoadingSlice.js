import Cookies from 'js-cookie';

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    loader: '',
    error: '',
     notifCount: Cookies.get('unseen') || 0,
    commerce_count: Cookies.get('unseen')?.commerce_count || 0,
    permissions: localStorage.getItem('permissions') ,
    statusCode: '',
    getAgain: true,
};
// Cookies.get('permissions')
export const UserSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        isLoading: (state, action) => {
            state.loader = action.payload;
        },
        isError: (state, action) => {
            state.error = action.payload;
        },
        whatIsStatusCode: (state, action) => {
            state.statusCode = action.payload;
        },

        getNotifCount: (state, action) => {
            state.notifCount = action.payload;
        },
        getCommerceCount: (state, action) => {
            state.commerce_count = action.payload;
        },
        getPermissions: (state, action) => {
            state.permissions = action.payload;
        },
        getAgainHandler: (state) => {
             state.getAgain = !state.getAgain;
        },
    },
});

export const {
    getAgainHandler,
    isLoading,
    isError,
     getNotifCount,
    getCommerceCount,
    getPermissions,
    whatIsStatusCode,
} = UserSlice.actions;

export default UserSlice.reducer;

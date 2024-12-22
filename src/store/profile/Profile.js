import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    profile: {},

};

export const ProfileRedux = createSlice({
    name: 'dataRows',
    initialState,
    reducers: {
        handleProfile: (state, action) => {
            state.profile = action.payload;
        },
    },
});

export const {handleProfile} = ProfileRedux.actions;

export default ProfileRedux.reducer;


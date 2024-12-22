import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    attendance: {},

};

export const AttendanceRedux = createSlice({
    name: 'dataRows',
    initialState,
    reducers: {
        handleAttendance: (state, action) => {
            state.attendance = action.payload;
        },
    },
});

export const {handleAttendance} = AttendanceRedux.actions;

export default AttendanceRedux.reducer;


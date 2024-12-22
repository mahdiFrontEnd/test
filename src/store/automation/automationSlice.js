import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  automationAddress: "",
  correspondenceStatus: "pending",

};

export const automationSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setAutomationAddress: (state, action) => {
      state.automationAddress = action.payload;
    },
    setCorrespondenceStatus: (state, action) => {
      state.correspondenceStatus = action.payload;
    },

  },
});

export const { setAutomationAddress , setCorrespondenceStatus} = automationSlice.actions;

export default automationSlice.reducer;

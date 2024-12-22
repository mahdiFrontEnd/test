import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showSidebar: false,
};

export const CustomizerSlice = createSlice({
  name: 'customizer',
  initialState,
  reducers: {
    ToggleShowSidebar: (state,action) => {
      state.showSidebar =  action.payload;
    },
  },
});

export const {
  ToggleShowSidebar,
} = CustomizerSlice.actions;

export default CustomizerSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import moment from 'jalali-moment';

const initialState = {
  selectedDay: moment().locale('fa').format('D'),
  selectedYear: moment().locale('fa').format('YYYY'),
  selectedMonth: moment().locale('fa').format('M'),
  calendarModalOpen: false,
  activeKey: '',
  calendarDateData: [],

};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDay: (state, action) => {
      state.selectedDay = action.payload;
    },
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
    setCalendarModalOpen: (state, action) => {
      state.calendarModalOpen = action.payload;
    },
    setActiveKey: (state, action) => {
      state.activeKey = action.payload;
    },
    setCalendarDateData: (state, action) => {
      state.calendarDateData = action.payload;
    },

  },
});

export const {
  setSelectedDay,setActiveKey,
  setSelectedYear,
  setSelectedMonth,
  setCalendarModalOpen,
  setCalendarDateData,
} = calendarSlice.actions;

export default calendarSlice.reducer;

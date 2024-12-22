import { createSlice } from '@reduxjs/toolkit';
import { tablePaginate } from '../../helper/jsons/tablePaginate';

const initialState = {
  dataRows: [],
  totalCount: '',
  fullTableData: null,
  config: {},
  filter: tablePaginate,
  showSearchBox: false,
};

export const TableRedux = createSlice({
  name: 'dataRows',
  initialState,
  reducers: {
    getDataRows: (state, action) => {
      state.dataRows = action.payload;
    },

    getTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    getFullTableData: (state, action) => {
      state.fullTableData = action.payload;
    },
    getConfig: (state, action) => {
      state.config = action.payload;
    },
    getFilter: (state, action) => {

      state.filter = { ...action.payload };
    },

    showSearchBoxHandler: (state) => {
      state.showSearchBox = !state.showSearchBox;
    },
  },
});

export const {
  getDataRows,
  getFilter,
  getFullTableData, getTotalCount,
  getConfig,
  showSearchBoxHandler,
} = TableRedux.actions;

export default TableRedux.reducer;


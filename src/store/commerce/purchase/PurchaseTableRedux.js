import {createSlice} from '@reduxjs/toolkit';
import {tablePaginate} from "../../../helper/jsons/tablePaginate";

const initialState = {
    dataRows: [],
    totalCount: '',
    filter: tablePaginate,
    showSearchBox: false,
};

export const PurchaseTableRedux = createSlice({
    name: 'dataRows',
    initialState,
    reducers: {
        getDataRows: (state, action) => {
            state.dataRows = action.payload;
        },

        getTotalCount: (state, action) => {
            state.totalCount = action.payload;
        },
        getFilter: (state, action) => {


            state.filter = {...action.payload};
        },

        showSearchBoxHandler: (state) => {
            state.showSearchBox = !state.showSearchBox;
        },
    },
});

export const {
    getDataRows,
    getFilter,
    getTotalCount,
    showSearchBoxHandler,
} = PurchaseTableRedux.actions;

export default PurchaseTableRedux.reducer;


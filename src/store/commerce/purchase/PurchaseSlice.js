import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    dataRows: [],
    dataColumns: [],
    dataDetail: '',
    totalCount: '',
    fileUploader: '',
};

export const PurchaseSlice = createSlice({
    name: 'dataRows',
    initialState,
    reducers: {
        getDataRows: (state, action) => {
            state.dataRows = action.payload;
        },
        getDataColumns: (state, action) => {
            state.dataColumns = action.payload;
        },
        getDataDetail: (state, action) => {
            state.dataDetail = action.payload;
        },
        getTotalCount: (state, action) => {
            state.totalCount = action.payload;
        },
        getFileUploader: (state, action) => {
            state.fileUploader = action.payload;
        },
        Deleted: (state, action) => {
            const index = state.dataRows.findIndex((data) => data.id === action.payload);
            state.dataRows.splice(index, 1);
            state.totalCount -= 1;
        },
        UpdatePurchase: {
            reducer: (state, action) => {
                state.dataDetail = {...state.dataDetail, [action.payload.field]: action.payload.value};
            },
            prepare: (id, field, value) => {
                return {
                    payload: {id, field, value},
                };
            },
        },
    },
});

export const {
    getDataRows,
    getDataColumns,
    getDataDetail,
    getTotalCount,
    getFileUploader,
    Deleted,
    UpdatePurchase,
} = PurchaseSlice.actions;

export default PurchaseSlice.reducer;


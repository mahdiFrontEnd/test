import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  InventoryRequestData: {
    section_id: null,
    delivery_type_id: null,
    to_warehouse_location_id: null,
    warehouse_location_id: null,
    customer_id: null,
    section_name: '',
    items: [],
  },
  editedDataRow:{},
  cost_center_code: Cookies.get('user') ? JSON.parse(Cookies.get('user')).cost_center_code : null,

};

export const InventoryRequestRedux = createSlice({
  name: 'InventoryRequestData',
  initialState,
  reducers: {
    setInventoryRequestData: (state, action) => {
      state.InventoryRequestData = action.payload;
    },
    setCost_center_code: (state, action) => {
      state.cost_center_code = action.payload;
    },
    setEditedDataRow: (state, action) => {
      state.editedDataRow = action.payload;
    },
    resetState: (state) => {
      state.InventoryRequestData = initialState.InventoryRequestData;
    }
  },
});

export const { setInventoryRequestData,setEditedDataRow,setCost_center_code,resetState } = InventoryRequestRedux.actions;

export default InventoryRequestRedux.reducer;

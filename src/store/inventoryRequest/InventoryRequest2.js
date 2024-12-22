import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  section: null,
  deliveryType: null,
  supplier: null,
  toWarehouseLocation: null,
  fromWarehouseLocation: null,
  customer: null,
  items: [],
  editedDataRow: {},
  editeBeforeDataRow: {},
  costCenterCode: Cookies.get('user') ? JSON.parse(Cookies.get('user')).cost_center_code : null,
};

export const InventoryRequestRedux = createSlice({
  name: 'InventoryRequestData',
  initialState,
  reducers: {
    setSection: (state, action) => {
      state.section = action.payload;
    },
    setSupplier: (state, action) => {
      state.supplier = action.payload;
    },
    setDeliveryType: (state, action) => {
      state.deliveryType = action.payload;
    },
    setToWarehouseLocation: (state, action) => {
      state.toWarehouseLocation = action.payload;
    },

    setFromWarehouseLocation: (state, action) => {
      state.fromWarehouseLocation = action.payload;
    },

    setCustomer: (state, action) => {
      state.customer = action.payload;
    },

    setItems: (state, action) => {
      state.items = action.payload;
    },

    setCostCenterCode: (state, action) => {
      state.costCenterCode = action.payload;
    },
    setEditedDataRow: (state, action) => {
      state.editedDataRow = action.payload;
    },
    setEditeBeforeDataRow: (state, action) => {
      state.editeBeforeDataRow = action.payload;
    },
    resetState: (state) => {
      state.InventoryRequestData = initialState.topFormData;
    },
  },
});

export const {
  setSection,
  setDeliveryType,
  setToWarehouseLocation,setSupplier,
  setFromWarehouseLocation,
  setCustomer,
  setCostCenterCode,
  setEditedDataRow,setEditeBeforeDataRow,
  resetState,setItems,
} = InventoryRequestRedux.actions;

export default InventoryRequestRedux.reducer;

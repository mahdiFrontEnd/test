import { configureStore } from '@reduxjs/toolkit';
import ProfileReducer from './apps/profile/ProfileSlice';
import LoadingReducer from './loading/LoadingSlice';
import PurchasesReducer from './commerce/purchase/PurchaseSlice';
import PurchaseReducer from './commerce/purchase/PurchaseTableRedux';
import TableReducer from './TableRedux/TableRedux';
import automationAddressReducer from './automation/automationSlice';
import calendarReducer from './calendar/calendarSlice';
import ProfileReducerState from './profile/Profile';
import ItemsReducer from './commerce/purchase/ItemSlice';
import CustomizerReducer from './customizer/CustomizerSlice';
import InventoryRequestReducer from './inventoryRequest/InventoryRequest';
import InventoryRequestReducer2 from './inventoryRequest/InventoryRequest2';
import AttendanceReducerState from './attendance/Attendance';

export const store = configureStore({
  reducer: {
    profilesReducer: ProfileReducer,
    loadingReducer: LoadingReducer,
    purchasesReducer: PurchasesReducer,
    PurchaseTableRedux: PurchaseReducer,
    TableRedux: TableReducer,
    automationAddressRedux: automationAddressReducer,
    calendarRedux: calendarReducer,
    InventoryRequestRedux: InventoryRequestReducer,
    InventoryRequestRedux2: InventoryRequestReducer2,
    ProfileRedux: ProfileReducerState,
    AttendanceRedux: AttendanceReducerState,
    itemsReducer: ItemsReducer,
    customizer: CustomizerReducer,

  },
});

export default store;

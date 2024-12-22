import { Navigate } from 'react-router-dom';
import CleaningPage from '../pages/hse/Cleaning/CleaningPage';
import Dashboard from '../pages/dashboards/Dashboard';
// import WarehousesLocation from '../pages/Warehouses/warehousesLocation/WarehousesLocation';
// import WarehousesType from '../pages/Warehouses/warehousesType/WarehousesType';
// import PlaceConsumption from '../pages/Warehouses/PlaceConsumption/PlaceConsumption';
// import Warehouses from '../pages/Warehouses/warehouses/Warehouses';
// import InventoryRequestList from '../pages/Warehouses/inventoryRequest/InventoryRequestList';
// import InventorySingle from '../pages/Warehouses/inventoryRequest/single2/InventorySingle';
// import InventoryRequestSingle from '../pages/Warehouses/inventoryRequest/single/InventoryRequestSingle';
import CreateUpdateCleaning from '../pages/hse/Cleaning/CreateUpdateCleaning/CreateUpdateCleaning';
import WorkDetails from '../pages/workDetails/WorkDetails';
import ChangePass from '../pages/changePass/ChangePass';
import Profile from '../pages/profile/Profile';
import UserManagementPage from '../pages/user/UserManagementPage';
import RoleManagementPage from '../pages/role/RoleManagementPage';
import SectionManagementPage from '../pages/section/SectionManagementPage';
import CustomerManagementPage from '../pages/customer/CustomerManagementPage';
import CompanyManagementPage from '../pages/automation/company/CompanyManagementPage';
import CorrespondencePage from '../pages/automation/correspondence/CorrespondencePage';
import PaymentPage from '../pages/automation/payment/PaymentPage';
import MessagePage from '../pages/automation/message/MessagePage';
import RegulationsPage from '../pages/automation/Regulations/RegulationsPage';
import CorrespondenceDetail from '../pages/automation/correspondence/CorrespondenceDetail';
import PaymentDetail from '../pages/automation/payment/PaymentDetail';
import ReportPage from '../pages/automation/report/ReportPage';
import ReportDetail from '../pages/automation/report/ReportDetail';
import RequestPage from '../pages/automation/request/RequestPage';
import RequestDetail from '../pages/automation/request/RequestDetail';
import DraftPage from '../pages/automation/draft/DraftPage';
import DraftDetail from '../pages/automation/draft/DraftDetail';
import ReceivedLetterPage from '../pages/automation/receivedLetter/ReceivedLetterPage';
import ReceivedLetterDetail from '../pages/automation/receivedLetter/ReceivedLetterDetail';
import SentLetterPage from '../pages/automation/sentLetter/SentLetterPage';
import SentLetterDetail from '../pages/automation/sentLetter/SentLetterDetail';
import Purchase from '../pages/commerce/Purchase';
import PurchaseReportPage from '../pages/commerce/PurchaseReportPage';
import PurchaseDetail from '../pages/commerce/PurchaseDetail';
import Map from '../pages/commerce/Map';
import Error from '../pages/not-found/Error';
import Login from '../pages/auth/Login';
import FullLayout from '../layouts/FullLayout';
import LoginLayout from '../layouts/LoginLayout';
import RecoverPwd from '../pages/auth/RecoverPwd';
import BlackBoard from '../pages/calendar/BlackBoard';
import AttendancePage from '../pages/automation/attendance/AttendancePage';
import CategoryManagementPage from '../pages/storehouse/category/CategoryManagementPage';
import BrandsPage from '../pages/storehouse/brand/BrandsPage';
import AttributePage from '../pages/storehouse/attribute/AttributePage';
import TypesPage from '../pages/storehouse/Types/TypesPage';
import UpdateCreateProduct from '../pages/storehouse/product/UpdateCreateProduct';
import ProductManagementPage from '../pages/storehouse/product/ProductManagementPage';
import PlaceManagementPage from '../pages/storehouse/place/PlaceManagementPage';
import AttributeCategoriesManagementPage
  from '../pages/storehouse/AttributeCategories/AttributeCategoriesManagementPage';
import ProductRequestPage from '../pages/automation/productRequest/ProductRequestPage';
import ReferPage from '../pages/automation/refer/ReferPage';


/*****Auth access******/
const ThemeRoutes = [{
  path: '/', element: <FullLayout />, children: [
    { path: '/', name: 'Home', element: <Navigate to="/home" /> },
    { path: '/home', name: 'Dashboard', exact: true, element: <Dashboard />, },
    // { path: '/warehouses/location', name: 'warehouses', element: <WarehousesLocation /> },
    // { path: '/warehouses/type', name: 'warehouses', element: <WarehousesType />, },
    // { path: '/warehouses/PlaceConsumption', name: 'PlaceConsumption', element: <PlaceConsumption />, },
    // { path: '/warehouses', name: 'warehouses', element: <Warehouses /> },
    // { path: '/warehouses/inventory', name: 'Inventory', element: <InventoryRequestList /> },
    // { path: '/warehouses/inventoryRequest', name: 'inventoryRequest', element: <InventoryRequestList linkAddress="inventoryRequest" title="درخواست کالا از انبار" address="inventory_request" />, },
    // { path: '/warehouses/inventoryRequest/create', name: 'inventoryRequest', element: <InventorySingle pageType="create" linkAddress="inventoryRequest" title="درخواست کالا از انبار" address="inventory_request" />, },
    // { path: '/warehouses/inventoryRequest/edit/:id', name: 'inventoryRequest', element: <InventorySingle pageType="create" linkAddress="inventoryRequest" title="درخواست کالا از انبار" address="inventory_request" />, },
    // { path: '/warehouses/inventoryRequest/show/:id', name: 'inventoryRequest', element: <InventorySingle pageType="show" linkAddress="inventoryRequest" title="درخواست کالا از انبار" address="inventory_request" />, },
    // { path: '/warehouses/inventoryBuyRequest', name: 'inventoryBuyRequest', element: <InventoryRequestList linkAddress="inventoryBuyRequest" title="درخواست خرید کالا " address="inventory_buy_request" />, },
    // { path: '/warehouses/inventoryBuyRequest/show/:id', name: 'inventoryBuyRequest', element: <InventoryRequestSingle pageType="show" linkAddress="inventoryBuyRequest" title="درخواست خرید کالا " address="inventory_buy_request" />, },
    // { path: '/warehouses/inventoryBuyRequest/edit/:id', name: 'inventoryBuyRequest', element: <InventoryRequestSingle pageType="edit" linkAddress="inventoryBuyRequest" title="درخواست خرید کالا " address="inventory_buy_request" />, },
    // { path: '/warehouses/inventoryBuyRequest/create', name: 'inventoryBuyRequest', element: <InventoryRequestSingle pageType="create" linkAddress="inventoryBuyRequest" title="درخواست خرید کالا " address="inventory_buy_request" />, },
    // { path: '/warehouses/inventoryRemittance',name: 'inventoryRemittance',element: <InventoryRequestList linkAddress="inventoryRemittance" title="حواله انبار" address="inventory_remittance" />, },
    // { path: '/warehouses/inventoryRemittance/show/:id', name: 'inventoryRemittance', element: <InventoryRequestSingle pageType="show" linkAddress="inventoryRemittance" title="حواله انبار" address="inventory_remittance" />, },
    // { path: '/warehouses/inventoryRemittance/edit/:id', name: 'inventoryRemittance', element: <InventoryRequestSingle pageType="edit" linkAddress="inventoryRemittance" title="حواله انبار" address="inventory_remittance" />, },
    // { path: '/warehouses/inventoryRemittance/create', name: 'inventoryRemittance', element: <InventoryRequestSingle pageType="create" linkAddress="inventoryRemittance" title="حواله انبار" address="inventory_remittance" />, },
    // { path: '/warehouses/inventoryReceipt', name: 'inventoryReceipt', element: <InventoryRequestList linkAddress="inventoryReceipt" title="رسید انبار" address="inventory_receipt" />,},
    // { path: '/warehouses/inventoryReceipt/show/:id', name: 'inventoryReceipt', element: <InventoryRequestSingle pageType="show" linkAddress="inventoryReceipt" title="رسید انبار" address="inventory_receipt" />, },
    // { path: '/warehouses/inventoryReceipt/edit/:id', name: 'inventoryReceipt', element: <InventoryRequestSingle pageType="edit" linkAddress="inventoryReceipt" title="رسید انبار" address="inventory_receipt" />, },
    // { path: '/warehouses/inventoryReceipt/create', name: 'inventoryReceipt', element: <InventoryRequestSingle pageType="create" linkAddress="inventoryReceipt" title="رسید انبار" address="inventory_receipt" />, },
    // { path: '/warehouses/inventoryTemporaryReceipt', name: 'inventoryTemporaryReceipt', element: <InventoryRequestList linkAddress="inventoryTemporaryReceipt" title="رسید موقت انبار" address="inventory_temporary_receipt" />, },
    // { path: '/warehouses/inventoryTemporaryReceipt/show/:id', name: 'inventoryTemporaryReceipt', element: <InventoryRequestSingle pageType="show" linkAddress="inventoryTemporaryReceipt" title="رسید موقت انبار" address="inventory_temporary_receipt" />, },
    // { path: '/warehouses/inventoryTemporaryReceipt/edit/:id', name: 'inventoryTemporaryReceipt', element: <InventoryRequestSingle pageType="edit" linkAddress="inventoryTemporaryReceipt" title="رسید موقت انبار" address="inventory_temporary_receipt" />, },
    // { path: '/warehouses/inventoryTemporaryReceipt/create', name: 'inventoryTemporaryReceipt', element: <InventoryRequestSingle pageType="create" linkAddress="inventoryTemporaryReceipt" title="رسید موقت انبار" address="inventory_temporary_receipt" />, },
    { path: '/hse/cleaning', name: 'Cleaning', exact: true, element: <CleaningPage />, },
    { path: '/hse/cleaning/create', name: 'createCleaning', exact: true, element: <CreateUpdateCleaning />, },
    { path: '/profile', name: 'profile', exact: true, element: <Profile /> },
    { path: '/WorkDetails', name: 'WorkDetails', exact: true, element: <WorkDetails />, },
    { path: '/profile/ChangePwd', name: 'ChangePwd', exact: true, element: <ChangePass /> },

    { path: '/usersManagement/users', name: 'users', exact: true, element: <UserManagementPage />, }, {
    path: '/usersManagement/roles', name: 'roles', exact: true, element: <RoleManagementPage />, }, {}, {
    path: '/usersManagement/section', name: 'section', exact: true, element: <SectionManagementPage />, }, {
    path: '/products/categories', name: 'categories', exact: true, element: <CategoryManagementPage />, }, {
    path: '/storehouse/place', name: 'place', exact: true, element: <PlaceManagementPage />, },
    { path: '/products/list', name: 'products', exact: true, element: <ProductManagementPage /> },
    { path: '/products/edit/:id', name: 'UpdateCreateProduct', exact: true, element: <UpdateCreateProduct /> },
    { path: '/products/create', name: 'UpdateCreateProduct', exact: true, element: <UpdateCreateProduct /> },
    {
      path: '/products/single', name: 'UpdateCreateProduct', exact: true, element: <UpdateCreateProduct />,
    }, { path: '/products/Types', name: 'products', exact: true, element: <TypesPage /> },
    { path: '/products/brands', name: 'brands', exact: true, element: <BrandsPage /> }
    , {
      path: '/products/attribute', name: 'products', exact: true, element: <AttributePage />,
    },  {
    path: '/products/attribute/categories', name: 'products', exact: true, element: <AttributeCategoriesManagementPage />, },

    {
      path: '/customers', name: 'customers', exact: true, element: <CustomerManagementPage />,
    }, // {path: '/about', name: 'about', exact: true, element: <About/>},
    {
      path: '/companies', name: 'companies', exact: true, element: <CompanyManagementPage />,
    },


    { path: '/automation/messages', name: 'messages', exact: true, element: <MessagePage /> },
    { path: '/automation/refers', name: 'refers', exact: true, element: <ReferPage /> },
    { path: '/automation/product_request', name: 'messages', exact: true, element: <ProductRequestPage /> },
    { path: '/automation/regulations', name: 'RegulationsPage', exact: true, element: <RegulationsPage /> },


    {
      path: '/automation/correspondence', name: 'correspondence', exact: true, element: <CorrespondencePage />,
    },
    {
      path: '/automation/attendance', name: 'attendance', exact: true, element: <AttendancePage />,
    }, {
      path: '/automation/correspondence/correspondence_detail/:id',
      name: 'correspondenceDetail',
      exact: true,
      element: <CorrespondenceDetail />,
    }, { path: '/automation/payment', name: 'payment', exact: true, element: <PaymentPage /> }, {
      path: '/automation/payment/payment_detail/:id', name: 'payment', exact: true, element: <PaymentDetail />,
    }, {
      path: '/automation/report', name: 'report', exact: true, element: <ReportPage />,
    }, {
      path: '/automation/report/report_detail/:id', name: 'reportDetail', exact: true, element: <ReportDetail />,
    },

    { path: '/automation/request', name: 'request', exact: true, element: <RequestPage /> },

    { path: '/automation/request/request_detail/:id', name: 'requestDetail', exact: true, element: <RequestDetail /> },


    { path: '/automation/draft', name: 'request', exact: true, element: <DraftPage /> },

    { path: '/automation/draft/draft_detail/:id', name: 'draftDetail', exact: true, element: <DraftDetail /> },


    {
      path: '/automation/received_letter', name: 'receivedLetter', exact: true, element: <ReceivedLetterPage />,
    }, {
      path: '/automation/received_letter/received_letter_detail/:id',
      name: 'receivedLetterDetail',
      exact: true,
      element: <ReceivedLetterDetail />,
    }, {
      path: '/automation/sent_letter', name: 'sentLetter', exact: true, element: <SentLetterPage />,
    }, {
      path: '/automation/sent_letter/sent_letter_detail/:id',
      name: 'sentLetterDetail',
      exact: true,
      element: <SentLetterDetail />,
    }, {
      path: '/commerce/purchase', name: 'purchaseList', exact: true, element: <Purchase />,
    }, {
      path: '/commerce/purchase/report', name: 'purchaseReportList', exact: true, element: <PurchaseReportPage />,
    }, {
      path: '/commerce/purchase_detail/:id', name: 'purchaseDetail', exact: true, element: <PurchaseDetail />,
    }, {
      path: '/commerce/map', name: 'map', exact: true, element: <Map />,
    }, {
      path: '/BlackBoard', name: 'BlackBoard', exact: true, element: <BlackBoard />,
    },

    { path: '*', element: <Error /> }],
}, {
  path: '/',
  element: <LoginLayout />,
  children: [{ path: '/login', element: <Login /> }, { path: '/recover-password', element: <RecoverPwd /> }],
}, { path: '/error/:status', element: <Error /> }];

export default ThemeRoutes;

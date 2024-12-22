import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { FaBoxes, FaCircle } from 'react-icons/fa';
import { IoInformationOutline, IoPeopleOutline, IoPeopleSharp } from 'react-icons/io5';
import {
  RiHomeSmile2Fill,
  RiHomeSmile2Line,
  RiMailSettingsFill,
  RiMailSettingsLine,
  RiShip2Fill,
  RiShip2Line,
  RiUserSettingsFill,
  RiUserSettingsLine,
} from 'react-icons/ri';
import { PiBuildingsFill, PiBuildingsLight, PiWarehouseDuotone, PiWarehouseFill } from 'react-icons/pi';
import { LiaBoxesSolid } from 'react-icons/lia';
import { Badge } from 'antd';
import { hasPermission } from '../../permission/module';
import { ToggleShowSidebar } from '../../store/customizer/CustomizerSlice';

const SidebarJson = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [iconSize] = useState(19);
  const [SidebarData, setSidebarData] = useState([]);
  const innerIcon = <FaCircle size={5} />;
  const { pathname } = location;

  const getItem = ({ children, href, icon, show, title, inbox }) => {
    if (show) {
      return {
        key: href,
        icon,
        children,
        // className:"d-flex align-items-center",
        label: (
          <div className="d-flex justify-content-between align-items-center">
            {children ? title : <Link to={href} onClick={() => dispatch(ToggleShowSidebar(false))}>{title}</Link>}
            {inbox ? <Badge
              count={inbox}
              color="#ff8f00"
            /> : ''}
          </div>
        ),
      };
    }
    return null;
  };

  const notifCount = useSelector((state) => state.loadingReducer.notifCount);

  useEffect(() => {
    setSidebarData([
      getItem({
        title: 'خانه ',
        href: '/home',
        icon: pathname === '/home' ? <RiHomeSmile2Fill size={20} /> : <RiHomeSmile2Line size={iconSize} />,

        key: 'home',
        show: true,
      }),
      ////////////////////////////////////////////
      getItem({
        title: 'اداری',
        key: 'Official',
        href: '/Official',
        icon: pathname.search('/automation') !== -1 ? <RiMailSettingsFill size={iconSize} /> :
          <RiMailSettingsLine size={iconSize} />,

        inbox:
          notifCount?.automation_correspondence_count +
          notifCount?.automation_sent_letter_count +
          notifCount?.automation_received_letter_count +
          notifCount?.automation_payment_count +
          notifCount?.automation_request_count +
          notifCount?.automation_report_count,

        show:
          hasPermission('automation_correspondence', ['list', 'self_list', 'show']) ||
          hasPermission('automation_sent_letter', ['list', 'self_list', 'show']) ||
          hasPermission('automation_received_letter', ['list', 'self_list', 'show']) ||
          hasPermission('automation_payment', ['list', 'self_list', 'show']) ||
          hasPermission('automation_report', ['list', 'self_list', 'show']) ||
          hasPermission('automation_draft', ['list', 'self_list', 'show']) ||
          hasPermission('automation_request', ['list', 'self_list', 'show']) ||
          hasPermission('ware', ['list', 'self_list', 'show']),
        children: [
          getItem({
            title: 'مکاتبات داخلی',
            href: '/automation/correspondence?status=pending',
            key: 'sub8',
            icon: innerIcon,

            show: hasPermission('automation_correspondence', ['list', 'self_list', 'show']),

            inbox: notifCount?.automation_correspondence_count,
          }),
          ////////////////////////////////////////////
          getItem({
            title: 'نامه های ارسالی',
            href: '/automation/sent_letter',
            key: 'sub9',
            icon: innerIcon,

            show: hasPermission('automation_sent_letter', ['list', 'self_list', 'show']),
            inbox: notifCount?.automation_sent_letter_count,
          }),
          ////////////////////////////////////////////
          getItem({
            title: 'نامه های دریافتی',
            href: '/automation/received_letter',
            key: 'sub10',
            icon: innerIcon,

            show: hasPermission('automation_received_letter', ['list', 'self_list', 'show']),
            inbox: notifCount?.automation_received_letter_count,
          }),
          ////////////////////////////////////////////
          getItem({
            title: 'اعلامیه پرداخت',
            href: '/automation/payment',
            key: 'sub11',
            icon: innerIcon,

            show: hasPermission('automation_payment', ['list', 'self_list', 'show']),

            inbox: notifCount?.automation_payment_count,
          }),
          ////////////////////////////////////////////
          getItem({
            title: 'درخواست',
            href: '/automation/request',
            key: 'sub12',
            icon: innerIcon,

            show: hasPermission('automation_request', ['list', 'self_list', 'show']),
            inbox: notifCount?.automation_request_count,
          }),
          ////////////////////////////////////////////
          getItem({
            title: 'پیش نویس نامه',
            href: '/automation/draft',
            key: 'sub14',
            icon: innerIcon,

            show: hasPermission('automation_draft', ['list', 'self_list', 'show']),
          }),
          ////////////////////////////////////////////
          getItem({
            title: 'گزارش دهی',
            href: '/automation/report',
            key: 'sub13',
            icon: innerIcon,

            show: hasPermission('automation_report', ['list', 'self_list', 'show']),
            inbox: notifCount?.automation_report_count,
          }),
          // ////////////////////////////////////////////
          // getItem({
          //   title: 'پیام ها',
          //   href: '/automation/messages',
          //   key: 'sub1',
          //   icon: innerIcon,
          //   show: true,
          // }),
          ////////////////////////////////////////////
          getItem({
            title: 'درخواست کالا',
            href: '/automation/product_request',
            key: 'sub1',
            inbox: notifCount?.automation_ware_count,
            icon: innerIcon,
            show: hasPermission('ware', ['list', 'self_list', 'show']),
          }),
          ////////////////////////////////////////////
          ////////////////////////////////////////////
          getItem({
            title: 'آیین نامه ها',
            href: '/automation/regulations',
            key: 'sub16',
            icon: innerIcon,
            inbox: notifCount?.regulations_count,
            show: hasPermission('regulations', ['list']),
          }),
          ////////////////////////////////////////////
          ////////////////////////////////////////////
          getItem({
            title: 'ورود و خروج ها',
            href: '/automation/attendance',
            key: 'sub17',
            icon: innerIcon,
            // inbox: notifCount?.regulations_count,
            show: hasPermission('regulations', ['list']),
          }),
          ////////////////////////////////////////////
        ],
      }),
      /////////////////////////////
      getItem({
        title: 'مدیریت انبارها',
        key: 'storehouse',
        href: '/storehouse',

        icon: pathname.search('/storehouse') !== -1 ? <PiWarehouseFill size={iconSize} /> :
          <PiWarehouseDuotone size={iconSize} />,
        inbox:
          notifCount?.inventory_request_count +
          notifCount?.inventory_buy_request_count +
          notifCount?.inventory_receipt_count +
          notifCount?.inventory_temporary_receipt_count +
          notifCount?.inventory_remittance_count,

        show: false,
        // hasPermission('inventory', ['list', 'self_list', 'show']) ||
        // hasPermission('inventory_request', ['list', 'self_list', 'show']) ||
        // hasPermission('inventory_buy_request', ['list', 'self_list', 'show']) ||
        // hasPermission('inventory_receipt', ['list', 'self_list', 'show']) ||
        // hasPermission('inventory_temporary_receipt', ['list', 'self_list', 'show']) ||
        // hasPermission('inventory_remittance', ['list', 'self_list', 'show']) ||
        // hasPermission('warehouse_location', ['list', 'self_list', 'show']) ||
        // hasPermission('warehouse_type', ['list', 'self_list', 'show']) ||
        // hasPermission('warehouse', ['list', 'self_list', 'show']) ||
        // hasPermission('place_consumption', ['list', 'self_list', 'show']),

        children: [
          getItem({
            title: 'انبار ها',
            href: '/storehouse/place',
            key: 'storehouse',
            icon: innerIcon,

            show: true,
            // show: hasPermission('inventory', ['list', 'self_list', 'show']),
          }),

          getItem({
            title: 'درخواست کالا ',
            href: '/storehouse/inventoryRequest',
            key: 'inventoryRequest',
            icon: innerIcon,
            inbox: notifCount?.inventory_request_count,
            show: hasPermission('inventory_request', ['list', 'self_list', 'show']),

          }),
          getItem({
            title: 'درخواست خرید کالا ',
            href: '/storehouse/inventoryBuyRequest',
            key: 'inventoryBuyRequest',
            icon: innerIcon,
            inbox: notifCount?.inventory_buy_request_count,
            show: hasPermission('inventory_buy_request', ['list', 'self_list', 'show']),

          }),
          getItem({
            title: 'رسید',
            href: '/storehouse/inventoryReceipt',
            key: 'inventoryReceipt',
            icon: innerIcon,
            inbox: notifCount?.inventory_receipt_count,
            show: hasPermission('inventory_receipt', ['list', 'self_list', 'show']),
          }),
          getItem({
            title: 'رسید موقت انبار',
            href: '/storehouse/inventoryTemporaryReceipt',
            key: 'inventoryTemporaryReceipt',
            icon: innerIcon,
            inbox: notifCount?.inventory_temporary_receipt_count,
            show: hasPermission('inventory_temporary_receipt', ['list', 'self_list', 'show']),
          }),
          getItem({
            title: 'حواله',
            href: '/storehouse/inventoryRemittance',
            key: 'inventoryRemittance',
            icon: innerIcon,
            inbox: notifCount?.inventory_remittance_count,
            show: hasPermission('inventory_remittance', ['list', 'self_list', 'show']),
          }),

          getItem({
            title: 'اطلاعات پایه',
            href: '/storehouse/info',
            key: 'information',
            show: true,
            // hasPermission('warehouse_location', ['list', 'self_list', 'show']) ||
            // hasPermission('warehouse_type', ['list', 'self_list', 'show']) ||
            // hasPermission('warehouse', ['list', 'self_list', 'show']) ||
            // hasPermission('place_consumption', ['list', 'self_list', 'show']),
            icon: <IoInformationOutline size={20} />,

            children: [
              // getItem({
              //   title: 'انبارها ',
              //   href: '/storehouse/place',
              //   key: 'location',
              //   icon: innerIcon,
              //   show:true,
              //     // hasPermission('warehouse_location', ['list', 'self_list', 'show']),
              // }),
              getItem({
                title: 'انواع انبار ',
                href: '/storehouse/type',
                key: 'type',
                icon: innerIcon,
                show: true,
                // hasPermission('warehouse_type', ['list', 'self_list', 'show']),
              }),
              // getItem({
              //   title: 'انبارها',
              //   href: '/storehouse/place',
              //   key: 'place',
              //   icon: innerIcon,
              //   show:true,
              //   // hasPermission('warehouse', ['list', 'self_list', 'show']),
              // }),
              getItem({
                title: 'موارد مصرف ',
                href: '/storehouse/PlaceConsumption',
                key: 'PlaceConsumption',
                icon: innerIcon,
                show: true,
                // hasPermission('place_consumption', ['list', 'self_list', 'show']),
              }),
            ],
          }),
        ],
      }),
      ////////////////////////////////////////////
      getItem({
        title: 'مدیریت کالا',
        key: 'products',
        href: '/products',

        icon: pathname.search('/products') !== -1 ? <FaBoxes size={iconSize} /> :
          <LiaBoxesSolid size={iconSize + 3} />,
        show: true,
        // show:
        //   hasPermission('product', ['list', 'self_list', 'show']) ||
        //   hasPermission('brand', ['list', 'self_list', 'show']),

        children: [
          getItem({
            title: 'محصولات',
            href: '/products/list',
            key: 'products-list',
            icon: innerIcon,

            show: true,
            // show: hasPermission('product', ['list', 'self_list', 'show']),
          }),
          getItem({
            title: 'دسته بندی محصولات',
            href: '/products/categories',
            key: 'products-categories',
            icon: innerIcon,
            show: true,
            // show: hasPermission('category', ['list', 'self_list', 'show']),
          }),
          getItem({
            title: 'برند ها',
            href: '/products/brands',
            key: 'products-brands',
            icon: innerIcon,
            show: true,
            // show: hasPermission('category', ['list', 'self_list', 'show']),
          }),
          getItem({
            title: 'انواع محصول',
            href: '/products/Types',
            key: 'products-Types',
            icon: innerIcon,
            show: true,
            // show: hasPermission('product_type', ['list', 'self_list', 'show']),
          }),
          getItem({
            title: 'ویژگی ها',
            href: '/products/attribute',
            key: 'products-attribute',
            icon: innerIcon,

            show: true,
            // show: hasPermission('product_attribute', ['list', 'self_list', 'show']),
          }),
          getItem({
            title: 'دسته بندی ویژگی ها',
            href: '/products/attribute/categories',
            key: 'products-attribute-categories',
            icon: innerIcon,

            show: true,
            // show: hasPermission('product_attribute', ['list', 'self_list', 'show']),
          }),
        ],
      }),
      ////////////////////////////////////////////
      getItem({
        title: 'بازرگانی',
        key: 'commerce',
        href: '/commerce',

        icon: pathname.search('/commerce') !== -1 ? <RiShip2Fill size={iconSize} /> :
          <RiShip2Line size={iconSize} />,

        show: hasPermission('commerce_purchase', ['list', 'self_list', 'show']),

        children: [
          getItem({
            title: 'لیست خرید',
            href: '/commerce/purchase',
            key: 'purchase',
            icon: innerIcon,

            show: hasPermission('commerce_purchase', ['list', 'self_list', 'show']),
          }),
          getItem({
            title: 'گزارشات',
            href: '/commerce/purchase/report',
            key: 'purchase-report',
            icon: innerIcon,

            show: true,
          }),
          getItem({
            title: 'نقشه',
            href: '/commerce/map',
            key: 'map',
            icon: innerIcon,

            show: true,
          }),
        ],
      }),
      ///////////////////////
      // getItem({
      //   title: 'ایمنی، بهداشت، محیط',
      //   key: 'hse',
      //   href: '/hse',
      //   icon: <MdHealthAndSafety size={iconSize} />,
      //            icon: pathname.search('/hse') !== -1 ? <MdHealthAndSafety  size={iconSize} /> :
      //           <MdOutlineHealthAndSafety  size={iconSize} />,
      //   show: hasPermission('automation_correspondence', ['list', 'self_list', 'show']),
      //
      //   children: [
      //     getItem({
      //       title: 'نظافت',
      //       href: '/hse/cleaning',
      //       key: 'sub15',
      //       icon: innerIcon,
      //
      //       show: hasPermission('automation_correspondence', ['list', 'self_list', 'show']),
      //
      //       inbox: notifCount?.automation_correspondence_count,
      //     }),
      //     ////////////////////////////////////////////
      //   ],
      // }),
      ////////////////////////////////////////////
      getItem({
        title: 'شرکت ها',
        href: '/companies',
        key: 'sub6',

        icon: pathname.search('/companies') !== -1 ? <PiBuildingsFill size={iconSize} /> :
          <PiBuildingsLight size={iconSize} />,
        show: hasPermission('automation_company', ['list', 'self_list', 'show']),
      }),
      ////////////////////////////////////////////
      getItem({
        title: 'مشتریان',
        href: '/customers',
        key: 'sub7',

        icon: pathname.search('/customers') !== -1 ? <IoPeopleSharp size={iconSize} /> :
          <IoPeopleOutline size={iconSize} />,
        show: hasPermission('customer', ['list', 'self_list', 'show']),
      }),
      ////////////////////////////////////////////
      getItem({
        title: 'مدیریت کاربران',
        key: 'usersManagement',
        href: '/usersManagement',

        icon: pathname.search('/usersManagement') !== -1 ? <RiUserSettingsFill size={iconSize} /> :
          <RiUserSettingsLine size={iconSize} />,
        show:
          hasPermission('user', ['list', 'self_list', 'show']) ||
          hasPermission('role', ['list', 'self_list', 'show']),

        children: [
          getItem({
            title: 'کاربران',
            href: '/usersManagement/users',
            key: 'users',
            icon: innerIcon,

            show: hasPermission('user', ['list', 'self_list', 'show']),
          }),
          getItem({
            title: 'نقش ها',
            href: '/usersManagement/roles',
            key: 'roles',
            icon: innerIcon,

            show: hasPermission('role', ['list', 'self_list', 'show']),
          }),
          // getItem({
          //   title: 'بخش ها',
          //   href: '/usersManagement/section',
          //   key: 'section',
          //   icon: innerIcon,
          //
          //   show: hasPermission('section', ['list', 'self_list', 'show']),
          // }),
        ],
      }),
      ////////////////////////////////////////////
    ]);
  }, [notifCount, pathname]);
  return [SidebarData];
};

export default SidebarJson;

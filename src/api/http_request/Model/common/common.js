import Cookies from 'js-cookie';
import HttpClient from '../../HttpClient';
import { apiBase } from '../../url';

class Common extends HttpClient {
  constructor(Callback) {
    // const url = process.env.API_URL;

    super(Callback, {
      baseURL: apiBase,
      headers: {},
      Callback,
    });
    this.setHeader('Content-Type', 'application/json');
    this.setHeader('Accept', 'application/json');
    this.setBearerAuth(`Bearer  ${Cookies.get('token')}`);
  }

  static request(Callback) {
    return new Common(Callback);
  }

  productList() {
    return this.get(`common/product`);
  }


  customerList() {
    return this.get(`common/customer`);
  }

  sectionListCommon() {
    return this.get(`common/section`);
  }

  unitsListCommon() {
    return this.get(`common/units`);
  }


  positionJobList() {
    return this.get(`common/job_position`);
  }

  productAttributeType() {
    return this.get(`common/product_attribute_type`);
  }

  attributeList() {
    return this.get(`common/attribute`);
  }

  companyList() {
    return this.get(`common/automation_company`);
  }


  packageList() {
    return this.get(`common/package_type`);
  }

  automationUserList() {
    return this.get(`common/automation_user`);
  }

  automationTypeList() {
    return this.get(`common/automation_type`);
  }

  productTypeList() {
    return this.get(`common/product_type`);
  }

  cityList() {
    return this.get(`common/city`);
  }

  measurementList() {
    return this.get(`common/measurement`);
  }

  purchasePositionList() {
    return this.get(`common/purchase_position`);
  }

  customerGroup() {
    return this.get(`common/customer_group`);
  }

  warehouseType() {
    return this.get(`common/warehouse_type`);
  }

  inventoryDeliveryTypeList() {
    return this.get(`common/inventory_delivery_type`);
  }

  warehouseLocation() {
    return this.get(`common/warehouse_location`);
  }

  productSku() {
    return this.get(`common/product_sku`);
  }


  batchNumber() {
    return this.get(`common/batch_number`);
  }

  inventoryPlaceConsumption() {
    return this.get(`common/inventory_place_consumption`);
  }

  warehouses() {
    return this.get(`common/warehouse`);
  }

  inventoryStatus() {
    return this.get(`common/inventory_status`);
  }
}

export default Common;

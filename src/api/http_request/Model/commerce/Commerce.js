import Cookies from 'js-cookie';
import HttpClient from '../../HttpClient';
import { apiBase } from '../../url';

class Commerce extends HttpClient {

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
    return new Commerce(Callback);
  }


  pinned(id, data) {
    return this.put(`commerce_purchase/pinned/${id}`, data);
  }

  mapList() {
    return this.get(`commerce_purchase/map/list`);
  }

  supplier() {
    return this.get(`common/supplier`);
  }

  dateName() {
    return this.get(`common/purchase_date_name`);
  }


  purchasePosition() {
    return this.get(`common/purchase_position`);
  }


  purchaseBanks() {
    return this.get(`common/banks`);
  }


  PurchaseList() {
    return this.get(`commerce_purchase/list`);
  }


  purchaseStatus() {
    return this.get(`common/purchase_status`);
  }

  changePurchaseStatus(id, data) {
    return this.put(`commerce_purchase/status/${id}`, data);
  }


  purchaseAdd(data) {
    return this.post(`commerce_purchase`, data);
  }


  purchaseReport() {
    return this.get(`commerce_purchase/report/list`);
  }


  purchaseReportType() {
    return this.get(`common/purchase_report_type`);
  }


  purchaseReportAdd(value) {
    return this.post(`commerce_purchase/report`, value);
  }


  commerceProducts(value, dataId) {
    return this.put(`commerce_purchase/products/${dataId}`, value);
  }


  purchaseDetail(dataId) {
    return this.get(`commerce_purchase/${dataId}`);
  }

  purchaseDetailUpdate(dataId, data) {
    return this.put(`commerce_purchase/${dataId}`, data);
  }


}

export default Commerce;

import Cookies from 'js-cookie';
import HttpClient from '../../HttpClient';
import { apiBase } from '../../url';

class Inventory extends HttpClient {

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
    return new Inventory(Callback);
  }


  getInventoryRequest(id, address) {
    return this.get(`${address}/${id}`);
  }

  inventoryReport(data) {
    return this.post(`inventory/report`, data);
  }


  getInventoryRequestComments(id, address) {
    return this.get(`${address}/${id}/comment/list`);
  }


  inventoryRequest(data, method, id, address) {
    return this[method](`${address}/${id || ''}`, data);

  }


  statusApi(id, data, address) {
    return this.put(`${address}/approve/${id}`, data);
  }


}

export default Inventory;

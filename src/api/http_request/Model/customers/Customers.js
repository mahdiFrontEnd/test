import Cookies from 'js-cookie';
import HttpClient from '../../HttpClient';
import { apiBase } from '../../url';

class Customers extends HttpClient {

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
    return new Customers(Callback);
  }


  customerList() {
    return this.get(`customer/list`);

  }

  customerDelete(id) {
    return this.delete(`customer/${id}`);

  }

  customerUpdate(data, id) {
    return this.put(`customer/${id}`, data);

  }

  customerAdd(data) {
    return this.post(`customer`, data);

  }


  customerAddEdit(data, method, id) {
    return this[method](`customer/${id || ''}`, data);

  }

}

export default Customers;

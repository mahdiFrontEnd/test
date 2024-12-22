import Cookies from 'js-cookie';
import HttpClient from '../../HttpClient';
import { apiBase } from '../../url';

class Storehouse extends HttpClient {

  constructor(Callback) {

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
    return new Storehouse(Callback);
  }


  updateCreatePlace(data, id) {
    return this.post(`storehouse/place/${id ? 'update' : 'store'}/${id || ''}`, data);

  }

  storehouseList() {
    return this.get(`storehouse/place/list`);
  }

}

export default Storehouse;

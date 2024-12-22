import Cookies from 'js-cookie';
import HttpClient from '../../HttpClient';
import { apiBase } from '../../url';

class DashboardReq extends HttpClient {

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
    return new DashboardReq(Callback);
  }


  // single (data){return  this.upload(`/user/support/message/${  data.unit_id  }/comment/list`, data)}
  Dashboard() {
    return this.get(`dashboard`);
  }
}


export default DashboardReq;


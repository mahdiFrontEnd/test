import Cookies from 'js-cookie';
import HttpClient from '../../HttpClient';
import { apiBase } from '../../url';

class Companies extends HttpClient {

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
    return new Companies(Callback);
  }


  companies() {
    return this.get(`common/automation_company`);

  }


  deleteCompanies(id) {
    return this.delete(`automation_company/${id}`);

  }

  createCompanies(data) {
    return this.post(`automation_company`, data);

  }

  updateCreateCompanies(data, method, id) {
    return this[method](`automation_company/${id || ''}`, data);

  }


}

export default Companies;

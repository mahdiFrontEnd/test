import Cookies from 'js-cookie';
import HttpClient from '../../HttpClient';
import { apiBase } from '../../url';

class Permissions extends HttpClient {

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
    return new Permissions(Callback);
  }

  permission() {
    return this.get('common/permission');
  }

  permissionList() {
    return this.get('role/list');
  }


  permissionDelete(id) {
    return this.delete(`role/${id}`);
  }

  permissionAdd(data) {
    return this.post(`role`, data);
  }


  roleUpdate(roleId, role) {
    return this.put(`role/${roleId}`, role);
  }

  updateCreateRoles(data, method, id) {
    return this[method](`role/${id || ''}`, data);

  }


}

export default Permissions;

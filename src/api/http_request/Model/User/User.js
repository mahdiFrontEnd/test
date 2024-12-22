import Cookies from 'js-cookie';
import HttpClient from '../../HttpClient';
import { apiBase } from '../../url';

class User extends HttpClient {

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
    return new User(Callback);
  }

  home() {
    return this.get('home');
  }

  role() {
    return this.get('common/role');
  }

  roleList() {
    return this.get('role/list');
  }

  sectionList() {
    return this.get('section/list');
  }

  automationUser() {
    return this.get('common/automation_user');
  }

  userList() {
    return this.get(`user/list`);
  }

  user(userValue, userId) {
    return this.put(`user/${userId}`, userValue);
  }

  getUser(userValue, userId) {
    return this.put(`user/${userId}`, userValue);
  }

  createUser(userValue) {
    return this.post(`user`, userValue);
  }

  deleteUser(userId) {
    return this.delete(`user/${userId}`);
  }

  // estimateLeave() {
  //   return this.get(`user/estimate_leave`);
  // }


  changePassword(data) {
    return this.put(`user/profile/change_password`, data);
  }


  profileGet() {
    return this.get(`user/profile`);
  }


  profileUpdate(data) {
    return this.put(`user/profile/update`, data);
  }


  updateCreateUser(data, method, id) {
    return this[method](`user/${id || ''}`, data);

  }


  updateCreateSection(data, method, id) {
    return this[method](`section/${id || ''}`, data);

  }


  getTodo(date) {
    return this.post(`calendar/list`,date);
  }



  replyTodo(date) {
    return this.post(`calendar/reply`,date);
  }

  seenTodo(date) {
    return this.post(`calendar/seen`,date);
  }



  updateCreateTodo(values, route) {
    return this.post(`calendar/${route}`, values);

  }

  // editTodo(data) {
  //   return this.post(`calendar/update`, data);
  // }
  //
  //
  // addTodo(data) {
  //   return this.post(`calendar/add`, data);
  // }

  deleteTodo(data) {
    return this.post(`calendar/remove`, data);
  }



}

export default User;

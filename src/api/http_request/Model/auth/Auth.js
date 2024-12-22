import Cookies from 'js-cookie';
import HttpClient from '../../HttpClient';
import { apiBase } from '../../url';

class Auth extends HttpClient {

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
    return new Auth(Callback);
  }


  logout() {
    return this.post('logout');
  }

  captcha() {
    return this.post('captcha');
  }

  preLogin(data) {
    return this.post('pre-login', data);
  }

  login(data) {
    return this.post('login', data);
  }


  sendOtp(user) {
    return this.post('send_otp', user);
  }


  verifyOTP(user) {
    return this.post('verify_otp', user);
  }


  resetPass(user) {
    return this.post('reset_password', user);
  }

}

export default Auth;

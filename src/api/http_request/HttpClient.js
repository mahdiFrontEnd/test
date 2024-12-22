import * as axios from 'axios';
import { toast } from 'react-toastify';
import { instance } from '../api';
import { deleteAllCookies } from '../../helper/deleteAllCookies';

class HttpClient {
  constructor(callback, options = {}) {
    this.Callback = callback;
    this.Params = options.params || '';
    this.BaseURL = options.baseURL || '';
    this.Headers = options.headers || {};
  }


  // eslint-disable-next-line consistent-return
  async FetchJSON(endpoint, options = {}) {
    // eslint-disable-next-line no-unused-expressions
    this.Callback.beforeSend !== undefined && this.Callback.beforeSend();

    try {
      instance();
      return await axios({
        url: this.BaseURL + endpoint + this.Params,
        headers: this.Headers,
        method: options.method,
        data: options.body,
      });
    } catch (error) {
      if (error.response) {
        this.handleResponse(false, error);
      } else {
        toast.error('خطای سرور ...');
      }
    }
  }

  setBearerAuth(token) {
    this.Headers.Authorization = `${token}`;
    return this;
  }

  setHeader(key, value) {
    this.Headers[key] = value;
    return this;
  }

  addParam(key, value) {
    const sign = this.Params ? '&' : '?';
    this.Params += `${sign + key}=${value}`;
    return this;
  }

  addParams(paramsObg) {

    let sign = this.Params ? '&' : '?';
    Object.entries(paramsObg).forEach(([key, value]) => {
      sign = this.Params ? '&' : '?';
      this.Params += `${sign + key}=${value}`;
    });
    return this;
  }

  appendParams(params) {
    this.Params = params;
    return this;
  }

  setBaseUrl(url) {
    this.BaseURL = url;
    return this;
  }

  setLocale(lang = 'fa') {
    this.Locale = lang;
    return this;
  }

  setUserAgent(req) {
    let real_ip = '';
    let forwarded_id = '';
    let ar_real_ip = '';
    if (req.headers['x-forwarded-for']) {
      // eslint-disable-next-line prefer-destructuring
      forwarded_id = req.headers['x-forwarded-for'].split(',')[0];
    } else if (req.headers['x-real-ip']) {
      real_ip = req.headers['x-real-ip'];
    } else if (req.headers['ar-real-ip']) {
      ar_real_ip = req.headers['ar-real-ip'];
    } else {
      real_ip = req.connection.remoteAddress;
    }
    this.setHeader('x-forwarded-for', forwarded_id);
    this.setHeader('x-real-ip', real_ip);
    this.setHeader('ar-real-ip', ar_real_ip);
    this.setHeader('user-agent', req.headers['user-agent']);
    return this;
  }

  rawHttpRequest(endpoint, options = {}) {
    return this.FetchJSON(endpoint, {
      parseResponse: false,
      ...options,
    }).then((data) => {
      // eslint-disable-next-line no-unused-expressions
      data !== undefined && this.handleResponse(data?.data?.success, data?.data);
    });
  }

  get(endpoint, options = {}) {
    options.method = 'GET';
    return this.rawHttpRequest(endpoint, options);
  }

  post(endpoint, body, options = {}) {
    options.method = 'POST';
    options.body = JSON.stringify(body);

    return this.rawHttpRequest(endpoint, options);
  }

  upload(endpoint, body, options = {}) {
    const formData = new FormData();
    Object.entries(body).forEach(([key, value]) =>  formData.append(key, value));
    options.method = 'POST';
    console.log(formData.values());
    options.body = formData;
    this.setHeader('Content-Type', 'multipart/form-data');
    return this.rawHttpRequest(endpoint, options);
  }




  update(endpoint, body, options = {}) {
    options.method = 'PATCH';
    options.body = JSON.stringify(body);
    return this.rawHttpRequest(endpoint, options);
  }

  put(endpoint, body, options = {}) {
    options.method = 'PUT';
    options.body = JSON.stringify(body);

    return this.rawHttpRequest(endpoint, options);
  }

  delete(endpoint, options = {}) {
    options.method = 'DELETE';
    return this.rawHttpRequest(endpoint, options);
  }

  handleResponse(status, data) {
    if (status) {
      // eslint-disable-next-line no-unused-expressions
      this.Callback.success !== undefined && this.Callback.success(data);
    } else if (data?.message !== 'Network Error') {


      if (data.response?.status === 500 && this.Callback.error500 !== undefined) {
        this.Callback.error500(data);
      } else if (this.Callback.error !== undefined && data?.response?.status !== 502 && data?.response?.status !== 500 && data?.response?.status !== 401) {
        this.Callback.error(data);
      }
      if (data?.response?.status) {
        switch (data.response.status) {
          case 404:
            toast.error(data.response?.data?.message);
            break;

          case 401:
            if (this.Callback.unAuth !== undefined) {
              this.Callback.unAuth(data.response);
            } else {
              deleteAllCookies();
              // Cookies.remove('token')
              if (typeof window !== 'undefined') {
                // ?referer=${encodeURIComponent(window.location.href)}
                window.location.href = `/login`;
              }
            }

            break;
          case 422:


            break;
          case 500:
            toast.error('خطای سرور ...');
            break;
          case 502:
            if (this.Callback.error502 !== undefined) {
              this.Callback.error502(data);
            } else {
              toast.error('خطای سرور ...');
              if (
                typeof window !== 'undefined' &&
                !['/recover-password', '/login'].includes(window.location.pathname)
              ) {
                // window.location.href = `/`;
              }
            }

            break;
          default:
            break;
        }
      }
    } else if (this.Callback.failed !== undefined) {
      this.Callback.failed(data);
    } else {
      // deleteAllCookies();
      // Cookies.remove('token')
      if (typeof window !== 'undefined') {
        // ?referer=${encodeURIComponent(window.location.href)}
        // window.location.href = `/login`;
      }
      toast.error('از اتصال خود به شبکه و خاموش بودن VPN خود اطمینان حاصل نمایید ');
    }

    // eslint-disable-next-line no-unused-expressions
    this.Callback.final !== undefined && this.Callback.final();
  }
}

export default HttpClient;

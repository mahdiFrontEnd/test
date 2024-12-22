import Cookies from 'js-cookie';
import HttpClient from '../../HttpClient';
import { apiBase } from '../../url';

class Automation extends HttpClient {

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
    return new Automation(Callback);
  }


  // single (data){return  this.upload(`/user/support/message/${  data.unit_id  }/comment/list`, data)}
  commentList(requestAddress, id) {
    return this.get(`${requestAddress}/${id}/comment/list`);
  }


  pin(requestAddress, id) {
    return this.get(`${requestAddress}/${id}/comment/list`);
  }

  Regulations() {
    return this.get(`regulations/list`);
  }

  RegulationsSeen(id) {
    return this.get(`regulations/list?seen=${id}`);
  }

  createRegulations(data) {
    return this.post(`regulations`, data);
  }


  deleteRegulations(id) {
    return this.delete(`regulations/${id}`);
  }


  referList(requestAddress, id) {
    return this.get(`${requestAddress}/${id}/refer/list`);
  }


  getReport() {
    return this.post(`automation_request/report`);
  }


  changeCorrespondenceStatus(id, data) {
    return this.post(`automation_correspondence/${id}/change_status`, data);
  }

  automationDetail(requestAddress, id) {
    return this.get(`${requestAddress}/${id}`);
  }


  changeStatus(requestAddress, id, data) {
    return this.put(`${requestAddress}/status/${id}`, data);
  }

  getAutomationTable(requestAddress) {
    return this.get(`${requestAddress}/list`);
  }

  addAutomation(requestAddress, data) {
    return this.post(`${requestAddress}`, data);
  }

  // automationSentLetterStatus(id) {
  //   return this.post(`automation_sent_letter/reply/${id}`,{success:true});
  // }

  deleteAutomation(requestAddress, id) {
    return this.delete(`${requestAddress}/${id}`);
  }

  handleDelete(requestAddress, id,data) {
    return this.post(`${requestAddress}/${id}`,data);
  }


  handleFavorite(id, method) {
    return this[method](`automation_favorite/${id}`);
  }

  addPayment(data) {
    return this.post(`automation_payment`, data);
  }

  addPrePrint(id, data) {
    return this.post(`automation_payment/pre_print/add/${id}`, data);
  }

  listPrePrint(id) {
    return this.post(`automation_payment/pre_print/list/${id}`);
  }

  approvePrePrint(id) {
    return this.post(`automation_payment/pre_print/approve/${id}`);
  }


  payAutomationPayment(id, data) {
    return this.put(`automation_payment/pay/${id}`, data);
  }


  Refer(routeData, dataId, data) {
    return this.put(`${routeData}/refer/${dataId}`, data);
  }


  statusApi(routeData, dataId, type) {
    return this.put(`${routeData}/${type}/${dataId}`);
  }


  reply(routeData, dataId, data) {
    return this.put(`${routeData}/reply/${dataId}`, data);
  }

  like(data) {
    return this.post('like', data);
  }

  editComment(routeData, commentId, data) {
    return this.post(`${routeData}/${commentId}/comment/edit`, data);
  }

  editRefer(routeData, referId, data) {
    return this.post(`${routeData}/${referId}/refer/edit`, data);
  }

  edit(routeData, dataId, data) {
    return this.post(`${routeData}/edit/${dataId}`, data);
  }

  seeAll(routeData) {
    return this.get(`${routeData}/list?read_all=1&take=10`);
  }


  DeletePhoto() {
    return this.delete(`uploader`);
  }


  uploaderPhoto(photo) {
    return this.upload(`uploader`, photo);
  }


  getList(photo) {
    return this.get(`uploader`, photo);
  }


  getMessage(type) {
    return this.get(`${type === 'alert' ? 'commerce_purchase/notification_' : `${type}/`}list`);
  }

  home() {
    return this.get(`home`);
  }


}

export default Automation;

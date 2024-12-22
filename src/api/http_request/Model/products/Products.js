import Cookies from 'js-cookie';
import HttpClient from '../../HttpClient';
import { apiBase } from '../../url';

class Products extends HttpClient {

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
    return new Products(Callback);
  }


  attribute() {
    return this.get(`product_attribute/list`);

  }


  productList() {
    return this.get(`product/list`);

  }

  productTypes() {
    return this.get(`storehouse/type/list`);

  }


  createEditProductTypes(data, method, id) {
    return this[method](`storehouse/type/${id ? 'update' : 'store'}/${id || ''}`, data);

  }



  createEditProductBrands(data,  id) {
    return this.upload(`storehouse/brand/${id ? 'update' : 'store'}/${id || ''}`, data);

  }

  categoryList() {
    return this.get(`storehouse/category/list`);
  }

  categoriesAttributeList() {
    return this.get(`storehouse/attribute_category/list`);
  }

  brandList() {
    return this.get(`storehouse/brand/list`);
  }

  unitList() {
    return this.get(`storehouse/unit/list`);
  }

  createProductRequest(values) {
    return this.post(`ware`,values);
  }

  changeStatusRequestProduct(data,id) {
    return this.post(`ware/status/${id}`,data);
  }

  categoryListPaginate() {
    return this.get(`category/list?skip=0&take=100`);
  }


  categoryDelete(categoryId) {
    return this.delete(`category/${categoryId}`);
  }


  categoryUpdate(data, categoryId) {
    return this.put(`category/${categoryId}`, data);
  }

  categoryCreate(categoryValue) {
    return this.post(`category`, categoryValue);
  }

  updateProduct(productId, productValue) {
    return this.put(`product/${productId}`, productValue);
  }

  createProduct(product) {
    return this.post(`product`, product);
  }


  deleteProduct(productId) {
    return this.delete(`product/${productId}`);
  }

  getProduct(productId) {
    return this.get(`product/${productId}`);
  }

  updateCreateProduct(data,  id) {
    return this.upload(`storehouse/product/${id ? 'update' : 'store'}/${id || ''}`, data);

  }

  updateCreateCategory(data,  id) {

    return this.upload(`storehouse/category/${id ? 'update' : 'store'}/${id || ''}`, data);

  }

  updateCreateAttributeCategory(data,  id) {
    return this.post(`storehouse/attribute_category/${id ? 'update' : 'store'}/${id || ''}`, data);

  }

  updateCreateAttribute(data, id) {
    return this.post(`storehouse/attribute/${id ? 'update' : 'store'}/${id || ''}`, data);

  }


  updateCreateWarehouseLocation(data, method, id) {
    return this[method](`warehouse_location/${id || ''}`, data);

  }

  updateCreateWarehouse(data, method, id) {
    return this[method](`warehouse/${id || ''}`, data);

  }


  updateCreateWarehouseType(data, method, id) {
    return this[method](`warehouse_type/${id || ''}`, data);

  }

  updateCreatePlaceConsumption(data, method, id) {
    return this[method](`place_consumption/${id || ''}`, data);

  }

  productAttribute(data, method, id) {
    return this[method](`product_attribute/${id || ''}`, data);

  }

  skuList() {
    return this.get(`sku/list`);

  }


  skuCreate(data) {
    return this.post(`sku`, data);

  }

  skuDelete(id) {
    return this.delete(`sku/${id}`);

  }


}

export default Products;

import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Button, Tooltip } from 'reactstrap';
import { BsInfoCircleFill } from 'react-icons/bs';
import SelectFilter from '../../select/SelectFilter';
import MultiDatePicker from '../../datePicker/MultiDatePicker';
import { shippingMethod } from '../../../helper/jsons/shippingMethod';
import DebouncingInput from '../../MicroComponents/DebouncingInput';
import Companies from '../../../api/http_request/Model/companies/Companies';
import Commerce from '../../../api/http_request/Model/commerce/Commerce';
// import GetPurchaseList from "../../../api/http_request/Model/commerce/GetPurchaseList";
import GetSupplierList from '../../../api/http_request/Model/commerce/supplier';
import Common from '../../../api/http_request/Model/common/common';

const FilterCommerce = ({ handleSearch, searchInfo, sideFilter }) => {
  const [productList, setProductList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [dateNameList, setDateNameList] = useState([]);
  const [positionList, setPositionList] = useState([]);
  const [companiesList, setCompaniesList] = useState([]);
  const [searchTooltip, setSearchTooltip] = useState('');
  const [tooltipOpen, setTooltipOpen] = useState(false);


  useEffect(() => {
    setSearchTooltip(searchInfo);
  }, [searchInfo]);
  useEffect(() => {


    Companies.request({
      beforeSend: () => {

      }, error: () => {
      }, success: async (data) => {
        setCompaniesList(data?.result);
      }, failed: () => {
      }, final: () => {
      },
    }).addParam('is_commerce', 1).companies();


    Common.request({
      beforeSend: () => {

      }, error: () => {
      }, success: async (data) => {
        setProductList(data?.result);
      }, failed: () => {
      }, final: () => {
      },
    }).productList();


    Commerce.request({
      beforeSend: () => {

      }, error: () => {
      }, success: async (data) => {
        setPositionList(data?.result);
      }, failed: () => {
      }, final: () => {
      },
    }).purchasePosition();


    // Common.request({
    //     beforeSend: () => {
    //
    //     }, error: () => {
    //     }, success: async (data) => {
    //         setSupplierList(data?.result);
    //     }, failed: () => {
    //     }, final: () => {
    //     }
    // }).supplier()
    GetSupplierList(setSupplierList);

    Commerce.request({
      beforeSend: () => {

      }, error: () => {
      }, success: async (data) => {
        setDateNameList(data?.result);
      }, failed: () => {
      }, final: () => {
      },
    }).dateName();


  }, []);

  const initialValues = {};


  const onSubmit = (values) => {

    Object.keys(values).forEach((key) => {
      if (values[key] === '' || values[key] === null) {
        delete values[key];
      }
    });

    handleSearch(values);
  };

  const toggleTooltipOpen = () => {
    setTooltipOpen(!tooltipOpen);
  };
  return (<Formik initialValues={initialValues} onSubmit={onSubmit}>
    {() => (


      <Form>
        <div className="">
          <div className="row  w-100">
            <div className={`${!sideFilter && 'col-sm-6 col-md-3'} px-1  my-2 `}>
              <div className="position-relative">

                <Field
                  name="search"
                >{({ form }) => (<><DebouncingInput
                    id="search" className="form-control" delay={sideFilter ? 1000 : 0}
                    onChange={(e) => {
                      form.setFieldValue('search', e);


                      // eslint-disable-next-line no-unused-expressions
                      sideFilter && form.submitForm();
                    }}
                    placeholder=" جستجو..." />
                    <Tooltip placement="bottom" isOpen={tooltipOpen} target="searchTooltip"
                             toggle={toggleTooltipOpen}>{searchTooltip}</Tooltip>
                    <span id="searchTooltip" style={{ position: 'absolute', left: '10px', top: '10px' }}>

                                      <BsInfoCircleFill size={22} /></span>
                  </>
                )}


                </Field>
              </div>
            </div>
            <div className={`${!sideFilter && 'col-6 col-md-3'} px-1  my-2 `}>


              <Field name="positions">
                {({ form }) => (<SelectFilter
                    id="positions"
                    name="positions"
                    title=" موقعیت محموله"
                    data={positionList?.map((item) => ({
                      value: item.value, label: item.name,
                    }))}
                    onChange={(e) => {
                      if (e.length) {
                        const newArr = e?.map((el) => el.value);
                        form.setFieldValue('positions', JSON.stringify(newArr));
                      } else {
                        form.setFieldValue('positions', null);
                      }
                      // eslint-disable-next-line no-unused-expressions
                      sideFilter && form.submitForm();
                    }}
                    isMulti
                  />


                )}
              </Field>

            </div>
            <div className={`${!sideFilter && 'col-6 col-md-3'} px-1  my-2 `}>


              <Field name="positions">
                {({ form }) => (<DebouncingInput
                    id="register_number" className="form-control" delay={sideFilter ? 1000 : 0}
                    onChange={(e) => {
                      form.setFieldValue('register_number', e);


                      // eslint-disable-next-line no-unused-expressions
                      sideFilter && form.submitForm();
                    }}
                    placeholder=" شماره سفارش" />


                  // <Input
                  //
                  //
                  //     onChange={(e) => {
                  //
                  //         form.setFieldValue('register_number', e.target.value)
                  //
                  //         // eslint-disable-next-line no-unused-expressions
                  //         sideFilter && form.submitForm()
                  //     }}
                  //     isMulti
                  // />


                )}
              </Field>

            </div>
            <div className={`${!sideFilter && 'col-6    col-md-3'} px-1  my-2 `}>


              <Field name="positions">
                {({ form }) => (<SelectFilter
                    id="companies"
                    name="companies"
                    title="کشتیرانی ها"
                    data={companiesList?.map((item) => ({
                      value: item.id, label: item.name,
                    }))}
                    onChange={(e) => {

                      if (e.length) {

                        const newArr = e?.map((el) => el.value);
                        form.setFieldValue('companies', JSON.stringify(newArr));
                      } else {
                        form.setFieldValue('companies', null);
                      }
// eslint-disable-next-line no-unused-expressions
                      sideFilter && form.submitForm();

                    }}
                    isMulti
                  />


                )}
              </Field>
            </div>
            <div className={`${!sideFilter && 'col-sm-6  col-md-3'} px-1  my-2 `}>

              <Field name="suppliers">
                {({ form }) => (<SelectFilter
                  id="suppliers"
                  name="suppliers"
                  title=" تامین کننده"
                  data={supplierList?.map((item) => ({
                    value: item.id, label: item.name,
                  }))}
                  onChange={(e) => {
                    if (e.length) {
                      const newArr = e?.map((el) => el.value);
                      form.setFieldValue('suppliers', JSON.stringify(newArr));
                    } else {
                      form.setFieldValue('suppliers', null);
                    }
                    // eslint-disable-next-line no-unused-expressions
                    sideFilter && form.submitForm();
                  }}
                  isMulti
                />)}
              </Field>

            </div>
            <div className={`${!sideFilter && 'col-sm-6  col-md-3'} px-1  my-2 `}>

              <Field name="products">
                {({ form }) => (<SelectFilter
                    id="products"
                    name="products"
                    title="محصول"
                    data={productList?.map((item) => ({
                      value: item.id, label: item.name,
                    }))}
                    onChange={(e) => {


                      if (e.length) {
                        const newArr = e?.map((el) => el.value);
                        form.setFieldValue('products', JSON.stringify(newArr));
                      } else {
                        form.setFieldValue('products', null);
                      }

// eslint-disable-next-line no-unused-expressions
                      sideFilter && form.submitForm();
                    }}
                    isMulti
                  />

                )}
              </Field>
            </div>
            <div className={`${!sideFilter && 'col-sm-6  col-md-3'} px-1  my-2 `}>

              <Field name="date_name">
                {({ form }) => (<SelectFilter
                    id="date_name"
                    name="date_names"
                    title="نام تاریخ"
                    data={dateNameList?.map((item) => ({
                      value: item.value, label: item.name,
                    }))}
                    onChange={(e) => {
                      if (e.length) {
                        const newArr = e?.map((el) => el.value);
                        form.setFieldValue('date_names', JSON.stringify(newArr));
                      } else {
                        form.setFieldValue('date_names', null);
                      }
                      // eslint-disable-next-line no-unused-expressions
                      sideFilter && form.submitForm();
                    }}
                    isMulti
                  />

                )}
              </Field>

            </div>
            <div className={`${!sideFilter && 'col-sm-6  col-md-3'} px-1  my-2 `}>


              <Field name="date_name">
                {({ form }) => (<MultiDatePicker
                    onChange={(e) => {
                      if (e[0]) {
                        form.setFieldValue('from_date', e[0]?.unix);
                      } else {
                        form.setFieldValue('from_date', null);

                      }
                      if (e[1]) {
                        form.setFieldValue('end_date', e[1]?.unix);
                      } else {
                        form.setFieldValue('end_date', null);

                      }// eslint-disable-next-line no-unused-expressions
                      sideFilter && form.submitForm();
                    }}

                    isMulti
                    placeholder="تاریخ"
                    currentDate
                  />

                )}
              </Field>

            </div>
            <div className={`${!sideFilter && 'col-sm-6  col-md-3'} px-1  my-2 `}>
              <div className="d-flex align-items-center gap-2">


                <div className="flex-1">
                  <Field name="shipping_method">
                    {({ form }) => (<SelectFilter
                        id="shipping_methods"
                        name="shipping_methods"
                        title="نوع سفر"
                        data={shippingMethod?.map((item) => ({
                          value: item.value, label: item.name,
                        }))}
                        onChange={(e) => {


                          if (e.length) {
                            const newArr = e?.map((el) => el.value);
                            form.setFieldValue('shipping_methods', JSON.stringify(newArr));
                          } else {
                            form.setFieldValue('shipping_methods', null);
                          }

// eslint-disable-next-line no-unused-expressions
                          sideFilter && form.submitForm();
                        }}

                        isMulti
                      />

                    )}


                  </Field>
                </div>
                {!sideFilter && <Button className="btn  " color="primary" type="submit">
                  ثبت
                </Button>}
              </div>
            </div>

          </div>
        </div>

      </Form>

    )}
  </Formik>);
};

export default FilterCommerce;
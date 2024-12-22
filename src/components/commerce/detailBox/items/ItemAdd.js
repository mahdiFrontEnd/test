import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';

import {Button, Col, Form, FormGroup, Input, Label, ModalBody, ModalFooter, ModalHeader, Row,} from 'reactstrap';

import {itemsUpdateApi} from '../../../../api/commerce/item';
import SelectFilter from '../../../select/SelectFilter';
import {addItems} from '../../../../store/commerce/purchase/ItemSlice';
import Loading from '../../../../layouts/loader/Loading';
import CurrencyInputComponent from "../../../MicroComponents/CurrencyInputComponent";
import CloseModalBtn from "../../../MicroComponents/CloseModalBtn";
import {currencyTypeList} from "../../../../helper/jsons/currencyTypeList";

const ItemAdd = ({dataId, toggle, productList}) => {
// const ItemAdd = ({dataId, toggle, productList, measurementList}) => {
    const dispatch = useDispatch();

    const [isAddLoading, setIsAddLoading] = useState(false);
    const [reloadCompKey, setReloadCompKey] = useState(0);

    const [values, setValues] = React.useState({
        id: '',
        name: '',
        product_id: '',
        quantity: '',
        measurement: '',
        price: '',
        currency: '',
        total: '',
        measurement_name: '',
        currency_name: '',
    });

    useEffect(() => {
        setValues({...values, total: (Number(values.price) * Number(values.quantity)).toFixed(2)});
    }, [values.price, values.quantity]);

    const handleSubmit = (e) => {
        setIsAddLoading(true);
        e.preventDefault();

        const itemValue = {
            type: 1,
            name: values.name,
            product_id: values.product_id,
            quantity: values.quantity,
            measurement: values.measurement,
            price: values.price,
            currency: values.currency,
            total: String(values.total),
            fee: values.fee,
        };


        itemsUpdateApi(itemValue, dataId, setIsAddLoading,
            null, () => {

                dispatch(addItems(values.id, values.name, values.product_id, values.quantity, values.price, values.total, values.measurement, values.currency, values.measurement_name, values.currency_name,),);
                setReloadCompKey((key) => key + 1);
                toggle();


            }, (res) => {
                toast.error(res.message || res.errors);

            });


        // itemsUpdateApi(itemValue, dataId, (isOk, data) => {
        //     if (isOk) {
        //         dispatch(addItems(values.id, values.name, values.product_id, values.quantity, values.price, values.total, values.measurement, values.currency, values.measurement_name, values.currency_name,),);
        //         setReloadCompKey((key) => key + 1);
        //         toggle();
        //     } else {
        //         const error = data.errors;
        //         toast.error(data.message || error);
        //     }
        //     setIsAddLoading(false);
        // });
    };

    return (<Form onSubmit={handleSubmit}>
        {isAddLoading && <Loading isFullLoading/>}
        <ModalHeader toggle={toggle} close={<CloseModalBtn toggle={toggle}/>}>محصول جدید ایجاد کنید</ModalHeader>
        <ModalBody
            // style={{minHeight:'424px'}}
        >
            <Row className="mb-3">
                <Col>
                    <FormGroup className="required">
                        <Label className="control-label">نام محصول</Label>
                        <SelectFilter
                            title="نام محصول"
                            data={productList?.map((product) => ({
                                value: product.id, label: product.name,
                            }))}
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    id: productList?.find((item) => item.name === e.label).id,
                                    name: e.label,
                                    product_id: e.value,
                                });
                            }}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={6}>
                    <FormGroup className="required">
                        <Label className="control-label">مقدار</Label>
                        <Input
                            type="number"
                            min="1"
                            max="1000000000"
                            step="1"
                            name="quantity"
                            id="quantity"
                            onChange={(e) => {
                                setValues({...values, quantity: Number(e.target.value)});
                                // setValues({ ...values, total: Number(values.quantity) * Number(values.price) });
                            }}
                            required
                        />
                    </FormGroup>
                </Col>
                {/*<Col xs={6}>*/}
                {/*    <FormGroup className="required">*/}
                {/*        <Label className="control-label">واحد اندازه گیری </Label>*/}
                {/*        <SelectFilter*/}
                {/*            title="واحد اندازه گیری"*/}
                {/*            data={measurementList?.map((measure) => ({*/}
                {/*                value: measure.value, label: measure.name,*/}
                {/*            }))}*/}
                {/*            onChange={(e) => {*/}
                {/*                setValues({*/}
                {/*                    ...values, measurement: e.value, measurement_name: e.label,*/}
                {/*                });*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </FormGroup>*/}
                {/*</Col>*/}

                <Col xs={6}>
                    <FormGroup className="mb-4 required">
                        <Label for="price" className="control-label fw-bold">
                            مبلغ
                        </Label>
                        <CurrencyInputComponent key={reloadCompKey} suffix=''
                                                onChange={(value) => {
                                                    setValues({...values, price: value});
                                                }}
                        />


                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup className="mb-4 required">
                        <Label for="price" className="control-label fw-bold">
                            واحد ارزی
                        </Label>
                        <SelectFilter
                            title="واحد ارزی"
                            data={currencyTypeList}
                            onChange={(e) => {
                                setValues({
                                    ...values, currency: e.value, currency_name: e.label,


                                });
                            }}
                        />
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup className="mb-4  ">
                        <Label for="fee" className="control-label fw-bold">
                            تعداد در بسته
                        </Label>
                        <Input key={reloadCompKey}
                               onChange={(e) => {
                                   setValues({...values, fee: e.target.value});
                               }}
                        />


                    </FormGroup>
                </Col>
            </Row>
        </ModalBody>
        <ModalFooter>
            {/*<div className="ms-auto text-primary">*/}
            {/*<span>قیمت نهایی : </span>*/}
            {/*<span>{values.total}</span>*/}
            {/*<span className="me-1">*/}
            {/*{values.currency === 'euro' && 'یورو'}*/}
            {/*        {values.currency === 'dollar' && 'دلار'}*/}
            {/*        {values.currency === 'dirham' && 'درهم'}*/}
            {/*</span>*/}
            {/*  </div>*/}
            <div className="d-flex w-100 justify-content-end">
                <Button
                    color="primary"
                    type="submit"
                    disabled={!values.quantity || !values.product_id ||   !values.price || !values.currency || values.quantity === 0}
                    // disabled={!values.quantity || !values.product_id || !values.measurement || !values.price || !values.currency || values.quantity === 0}
                >
                    ثبت
                </Button></div>
        </ModalFooter>
    </Form>);};

export default ItemAdd;

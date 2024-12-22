import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import Switch from 'react-bootstrap-switch';
import 'react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.min.css';

import {Field, Form, Formik} from 'formik';
import {Button, FormGroup, Label, ModalBody, ModalHeader} from 'reactstrap';

import {automationUser} from '../../../api/common';
import Loading from '../../../layouts/loader/Loading';
import CurrencyInputComponent from "../../MicroComponents/CurrencyInputComponent";
import CloseModalBtn from "../../MicroComponents/CloseModalBtn";
import Automation from "../../../api/http_request/Model/automation/Automation";

const switchBtn = {
    position: 'absolute', left: '1rem', top: '9px',
};

const ReferBox = ({routeData, id, toggle, isCashier, setReferList}) => {
    const [priceCurrency, setPriceCurrency] = useState('');
    const [automationUserList,setAutomationUserList  ] = useState([]);
    const [referIds, setReferIds] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isAddLoading, setIsAddLoading] = useState(false);
    const [reloadCompKey, setReloadCompKey] = useState(0);
    const [errorText, setErrorText] = useState('');
    const [switchText, setSwitchText] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        automationUser('', switchText ? isCashier === 'true' : isCashier === 'false', ({result}) => {
             setAutomationUserList(result);

            setIsLoading(false);
        });
    }, [switchText]);

    const handleSelect = (elm) => {
        setReferIds(elm.map((e) => e.value));
    };

    const initialValues = {
        body: '', price: '', refer: [],
    };

    const onSubmit = (fields, {resetForm}) => {
        setIsAddLoading(true);
        const value = {...fields, price: priceCurrency, refer: referIds || []};


        Automation.request({
            success: (data) => {
                resetForm({values: ''});
                setPriceCurrency('');
                setReferIds();
                setReloadCompKey((key) => key + 1);
                setErrorText('');
                toggle();
                if (setReferList) {
                    setReferList(data.result);
                }
            }, error: (error) => {
                setErrorText(error.data.errors);
            }
        }).Refer(routeData, id, value)


        // referApi(routeData, id, value, (isOk, data) => {
        //     if (isOk) {
        //         resetForm({values: ''});
        //         setPriceCurrency('');
        //         setReferIds();
        //         setReloadCompKey((key) => key + 1);
        //         setErrorText('');
        //         toggle();
        //         if (setReferList) {
        //             setReferList(data.result);
        //         }
        //     } else {
        //         const error = data.errors;
        //         setErrorText(error);
        //     }
        //     setIsAddLoading(false);
        // });
    };

    return (<>
        <ModalHeader toggle={toggle} close={<CloseModalBtn toggle={toggle}/>}>میخواهید به چه کسانی ارجاع دهید
            ؟</ModalHeader>
        <ModalBody className="p-3 pb-4">
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {() => (<Form>
                    <div
                        style={{
                            minHeight: '350px',
                        }}
                    >
                        {isAddLoading && <Loading isFullLoading/>}
                        {routeData === 'automation_payment' && (<div style={switchBtn}>
                            <Switch
                                onText="تنخواه"
                                offText="همه"
                                defaultValue={switchText}
                                onChange={(e) => {
                                    setSwitchText(e.state.value);
                                }}
                            />
                        </div>)}
                        <FormGroup className="required mb-3">
                            <Label for="body" className="control-label fw-bold">
                                <span>ارجاع به</span>
                            </Label>
                            {!isLoading ? (<Select
                                key={reloadCompKey}
                                onChange={(e) => handleSelect(e)}
                                options={automationUserList && automationUserList?.map((user) => ({
                                    value: user.id, label: user.name,
                                }))}
                                closeMenuOnSelect={false}
                                isMulti
                                className={`p-0 w-100 m-0 ${errorText.refer ? 'form-control is-invalid' : ''}`}
                            />) : (<Loading isText/>)}
                            <div className="invalid-feedback">{errorText.refer}</div>
                        </FormGroup>

                        {routeData === 'automation_payment' && (<FormGroup className="mb-4">
                            <Label for="price" className="fw-bold">
                                مبلغ
                                <small className="text-primary me-4">
                                    در صورت تغییر مبلغ اینجا وارد کنید :
                                </small>
                            </Label>

                            {/*<CurrencyInput transformRawValue={(e) => convertPersianNumberToEng(e)}*/}
                            {/*  id="price"*/}
                            {/*  name="price"*/}
                            {/*  decimalsLimit={3}*/}
                            {/*  onValueChange={(value) => setPriceCurrency(value)}*/}
                            {/*  className="form-control"*/}
                            {/*  key={reloadCompKey}*/}
                            {/*  suffix="  ریال "*/}
                            {/*/>*/}


                            <CurrencyInputComponent
                                onChange={(value) => setPriceCurrency(value)}
                            />


                        </FormGroup>)}

                        <FormGroup className="mb-4">
                            <Label for="body" className="fw-bold">
                                متن
                            </Label>
                            <Field
                                className="form-control"
                                name="body"
                                type="text"
                                component="textarea"
                                rows="8"
                                id="body"
                            />
                        </FormGroup>
                    </div>
                    <div className="d-flex mt-4">
                        <Button color="info" className="w-100 ms-3" type="submit">
                            ارسال
                        </Button>
                        <Button color="gray" className="w-100" onClick={toggle.bind(null)}>
                            انصراف
                        </Button>
                    </div>
                </Form>)}
            </Formik>
        </ModalBody>
    </>);
};

export default ReferBox;

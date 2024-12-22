import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';

import {Button, Card, CardTitle, FormGroup, Input, Label} from 'reactstrap';

import SelectFilter from '../../select/SelectFilter';
import Loading from '../../../layouts/loader/Loading';
import Uploader from '../../automation/modalBox/Uploader';
import CurrencyInputComponent from "../../MicroComponents/CurrencyInputComponent";
import Automation from "../../../api/http_request/Model/automation/Automation";
import GetPurchaseList from "../../../api/http_request/Model/commerce/GetPurchaseList";
import Commerce from "../../../api/http_request/Model/commerce/Commerce";

const StatusBox = ({
                       routeData,
                       dataValue,
                       toggle,
                       skip,
                       take,
                       setStatusList,
                       setCertificationList,
                   }) => {
    const dispatch = useDispatch();
    const [purchaseStatusList, setPurchaseStatusList] = useState([]);
    const [statusId, setStatusId] = useState('');
    const [statusBody, setStatusBody] = useState('');
    const [priceCurrency, setPriceCurrency] = useState('');
    const [errorText, setErrorText] = useState('');
    const [fileName, setFileName] = useState([]);
    const [errorTextFile, setErrorTextFile] = useState('');
    const [isAddLoading, setIsAddLoading] = useState(false);
    const [reloadCompKey, setReloadCompKey] = useState(0);

    useEffect(() => {


        Commerce.request({
            success: ({result}) => {
                setPurchaseStatusList(result);

            },
            error: (error) => {
                toast.error(error);
            }
        }).purchaseStatus()

        // getPurchaseStatus((isOk, data) => {
        //     if (isOk) {
        //     }
        // });
    }, []);

    const handleStatus = () => {
        setIsAddLoading(true);

        const value = {
            status_id: statusId,
            body: statusBody,
            price: Number(priceCurrency),
            attachments: fileName || [],
        };


        Automation.request({
            success: ({result}) => {
                if (setCertificationList && setStatusList) {
                    setStatusList(result.result.last_statuses);
                    setCertificationList(result.result.certifications);
                } else {
                    // dispatch(fetchPurchaseData(skip, take));
                    GetPurchaseList(dispatch, skip, take)
                }
                toggle();

                setStatusBody('');
                setPriceCurrency('');
                setReloadCompKey((key) => key + 1);
                setErrorText('');
            },
            error: (error) => {
                
                toast.error(error);
                // setErrorText(error.data.errors || '');
            }
        }).changeStatus(routeData, dataValue.id, value)


        // statusApi(routeData, dataValue.id, value, (isOk, data) => {
        //     if (isOk) {
        //         if (setCertificationList && setStatusList) {
        //             setStatusList(data.result.last_statuses);
        //             setCertificationList(data.result.certifications);
        //         } else {
        //             dispatch(fetchPurchaseData(skip, take));
        //         }
        //         toggle();
        //
        //         setStatusBody('');
        //         setPriceCurrency('');
        //         setReloadCompKey((key) => key + 1);
        //         setErrorText('');
        //     } else {
        //         if (data.status === 500) {
        //             toast.error(data.data.message);
        //         }
        //         toast.error(data);
        //         setErrorText(data.data.errors || '');
        //     }
        //     setIsAddLoading(false);
        // });
    };


    return (
        <Card className="mb-0  p-4">
            {isAddLoading && <Loading isFullLoading/>}
            <CardTitle tag="h4" className="mb-4 text-center">
                وضعیت مورد نظر شما چیست ؟
            </CardTitle>
            <FormGroup className="required">
                <Label
                    for="statusId"
                    className={`control-label ${errorText.status_id ? ' is-invalid' : ''}`}
                >
                    وضعیت
                </Label>
                <SelectFilter
                    title="انتخاب کنید"
                    data={purchaseStatusList?.map((item) => ({
                        value: item.value,
                        label: item?.name,
                    }))}
                    onChange={(e) => setStatusId(e.value)}
                    errorText={errorText}
                />
                <div className="invalid-feedback">{errorText.status_id}</div>
            </FormGroup>
            <FormGroup>
                <Label for="body" className="control-label">
                    توضیحات
                </Label>
                <Input
                    name="body"
                    type="text"
                    className={`form-control${
                        errorText.body ? ' is-invalid' : ''
                    }`}
                    id="body"
                    onChange={e => setStatusBody(e.target.value)}
                    onValueChange={(value) => setStatusBody(value)}
                />
                <div className="invalid-feedback">{errorText.body}</div>
            </FormGroup>
            {statusId !== 5 && (
                <FormGroup className="required">
                    <Label className={`control-label ${errorText.price ? ' is-invalid ' : ''}`}>
                        مبلغ حواله
                    </Label>
                    {/*<CurrencyInput transformRawValue={(e) => convertPersianNumberToEng(e)}*/}
                    {/*  id="price"*/}
                    {/*  name="price"*/}
                    {/*  decimalsLimit={3}*/}
                    {/*  onValueChange={(value) => setPriceCurrency(value)}*/}
                    {/*  className={`form-control ${errorText.price ? ' is-invalid ' : ''}`}*/}
                    {/*  key={reloadCompKey}*/}
                    {/*  suffix="  ریال "*/}
                    {/*/>*/}


                    <CurrencyInputComponent key={reloadCompKey}
                                            onChange={(value) => setPriceCurrency(value)}
                                            className={`form-control ${errorText.price ? ' is-invalid ' : ''}`}/>


                    <div className="invalid-feedback">{errorText.price}</div>
                </FormGroup>
            )}
            {statusId !== 1 && statusId !== 0 && (
                <FormGroup className="required">
                    <Uploader
                        fileName={fileName}
                        setFileName={setFileName}
                        errorTextFile={errorTextFile}
                        reloadCompKey={reloadCompKey}
                        setIsAddLoading={setIsAddLoading}
                        setErrorTextFile={setErrorTextFile}
                        routeName="purchase"
                    />
                </FormGroup>
            )}

            <div className="d-flex mb-3">
                <Button color="success" className="w-100 ms-1" onClick={() => handleStatus()}>
                    ثبت
                </Button>

                <Button color="warning" className="w-100" onClick={toggle.bind(null)}>
                    انصراف
                </Button>
            </div>
        </Card>
    );
};

export default StatusBox;

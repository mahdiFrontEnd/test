import {Button, Form, Modal, Select} from 'antd';
import React, {useEffect, useState} from 'react';
// import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {FormGroup, Input, Label} from "reactstrap";
import SelectFilter from "../../select/SelectFilter";
import CurrencyInputComponent from "../../MicroComponents/CurrencyInputComponent";
import Uploader from "../../automation/modalBox/Uploader";
import {statusApi} from "../../../api/commerce/status";
// import {fetchPurchaseData} from "../../../store/commerce/purchase/PurchaseSlice";
import Automation from "../../../api/http_request/Model/automation/Automation";
import Commerce from "../../../api/http_request/Model/commerce/Commerce";
import CKEditorComponent from '../../MicroComponents/ckEditor/CKEditorComponent';

const { TextArea } = Input;


const StatusModal = ({
                         routeData,
                         dataValue,
                         toggle,
                         // skip,
                         // take,
                         setStatusList,
                         setCertificationList,
                     }) => {

    // const dispatch = useDispatch();

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [purchaseStatusList, setPurchaseStatusList] = useState([]);
    const [statusId, setStatusId] = useState('');
    const [statusBody, setStatusBody] = useState('');
    const [priceCurrency, setPriceCurrency] = useState('');
    const [errorText, setErrorText] = useState('');
    const [fileName, setFileName] = useState([]);
    const [errorTextFile, setErrorTextFile] = useState('');
    const [isAddLoading, setIsAddLoading] = useState(false);
    const [reloadCompKey, setReloadCompKey] = useState(0);


    const handleStatus = () => {
        setIsAddLoading(true);

        const value = {
            status_id: statusId,
            body: statusBody,
            price: Number(priceCurrency),
            attachments: fileName || [],
        };

        statusApi(routeData, dataValue.id, value, (isOk, data) => {
            if (isOk) {
                if (setCertificationList && setStatusList) {
                    setStatusList(data.result.last_statuses);
                    setCertificationList(data.result.certifications);
                } else {
                    // dispatch(fetchPurchaseData(skip, take));
                }
                toggle();

                setStatusBody('');
                setPriceCurrency('');
                setReloadCompKey((key) => key + 1);
                setErrorText('');
            } else {
                if (data.status === 500) {
                    toast.error(data.data.message);
                }
                toast.error(data);
                setErrorText(data.data.errors || '');
            }
            setIsAddLoading(false);
        });
    };
    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };


    const onFinish = (values) => {
        setLoading(true);
        Automation.request({
            beforeSend: () => {
            }, success: (res) => {
                handleCancel()
                form.resetFields()
                toast.success(res.message);
            }, error: () => {
                // setErrorText(error.errors);

            }, final: () => {
                setLoading(false);
            }
        }).reply('automation_company', values)
    };
    const onFinishFailed = () => {
    };

    const handleChange = () => {
    };


    useEffect(() => {
        if (purchaseStatusList.length === 0 && open) {
            setLoading(true);
            Commerce.request({
                success: ({result}) => {
                    setPurchaseStatusList(result.map((company) => ({
                        value: company.value.toString(),
                        label: company?.name,
                    })));

                },
                error: (error) => {
                    toast.error(error);
                }
            }).purchaseStatus()
        }
    }, [open]);
    return (
        <>
            <div onClick={(e) => {
                e.stopPropagation();
            }}>
                <Button className='defBtn orangeBtn' onClick={showModal}>
                    وضعیت
                </Button>
                <Modal
                    open={open}
                    title="انتخاب وضعیت مورد نظر"
                    onOk={handleStatus}
                    onCancel={handleCancel}
                    footer={[
                        <Button isAddLoading={isAddLoading} onClick={handleCancel} key="button">
                            انصراف
                        </Button>,
                        <Button type="primary" onClick={handleStatus} key="submit" loading={loading}>
                            ثبت
                        </Button>,


                    ]}
                >
                    <div className="mb-0  p-4">
                        <Form
                            name="basic"
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >

                            <Form.Item
                                label="وضعیت "
                                name="status_id"
                                rules={[{
                                    required: true, message: 'لطفا وضعیت را انتخاب کنید!',
                                },]}
                            >
                                <Select

                                    onChange={handleChange}
                                    options={purchaseStatusList}
                                />


                            </Form.Item>

                            <Form.Item
                                label="توضیحات"
                                name="body"

                            >
                                <TextArea autoSize={{ minRows: 3, maxRows: 10 }}   />
                                <CKEditorComponent getData={(e)=>form.setFieldValue('body',e)}/>


                            </Form.Item>
                            <Form.Item
                                label="توضیحات"
                                name="body"

                            >
                                <CurrencyInputComponent key={reloadCompKey}
                                                        onChange={(value) => setPriceCurrency(value)}
                                                        className={`form-control ${errorText.price ? ' is-invalid ' : ''}`}/>
                            </Form.Item>
                        </Form>


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
                                    label: item.name,
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
                                </Label> <CurrencyInputComponent key={reloadCompKey}
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
                    </div>
                </Modal>
            </div>
        </>
    );
};
export default StatusModal;
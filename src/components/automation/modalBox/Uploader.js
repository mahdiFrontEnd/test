/* eslint-disable consistent-return */
import React, {useRef} from 'react';
import {toast} from 'react-toastify';
import {Button, FormGroup, Input, Label} from 'reactstrap';
import {uploadPhotoApi} from '../../../api/uploader';
import Automation from "../../../api/http_request/Model/automation/Automation";

const Uploader = ({
                      required,
                      requiredError,
                      fileName,
                      setFileName,
                      errorTextFile,
                      setIsAddLoading,
                      setErrorTextFile,
                      reloadCompKey,
                      routeName,
                      title,
                      rowStyle,
                  }) => {
    const inputRef = useRef();

    const handleDelete = (name) => {
        setIsAddLoading(true);


        const params = {
            page: routeName || 'automation',
            name


        }
        Automation.request({
            beforeSend: () => {

            }, success: () => {
                setFileName((current) => current.filter((item) => item !== name));
            }, final: () => {
                setIsAddLoading(false);
            }
        }).addParams(params).DeletePhoto()


        // DeletePhotoApi(routeName || 'automation', name, (isOk, data) => {
        //     if (isOk) {
        //         if (data.success) {
        //             setFileName((current) => current.filter((item) => item !== name));
        //         }
        //     }
        //     setIsAddLoading(false);
        // });
    };

    //uploader
    const handleFileUploader = (e) => {
        setIsAddLoading(true);

        if (e.target.files && e.target.files.length > 0) {
            // const reader = new FileReader();
            //
            // reader.readAsDataURL(e.target.files[0]);
            // const formData = new FormData();
            // formData.append('file', e.target.files[0]);
            uploadPhotoApi(routeName || 'automation', {file:e.target.files}, (isOk, data) => {
                setIsAddLoading(false);

                if (!isOk) return setErrorTextFile(data.message);
                toast.success('فایل شما آپلود شد');
                setFileName([...fileName, data.result.image_name]);
                setErrorTextFile('');
            });
        }
    };

    //end uploader

    return (
        <FormGroup className={`${required} ${required ? 'required' : ''}`}>
            {!rowStyle ? (
                <Label className={`fw-bold ${required ? 'control-label' : ''}`} for="file">
                    <div className="d-flex align-items-center">
                        <p className='mb-0'> ارسال فایل</p>
                        {title && (
                            <p className='mb-0'>
                                <p className='mb-0'> - </p> {title}
                            </p>
                        )}
                        <p style={{fontSize: '12px'}} className="mb-0 text-info me-2 ms-2">

                            مطمئن شوید فایلتان کمتر از 6 مگابایت باشد

                        </p>
                    </div>
                </Label>
            ) : (
                <span>
                    <small style={{fontSize: '12px'}} className="text-info">
                    مطمئن شوید فایلتان کمتر از 6 مگابایت باشد
                </small>
               </span>
            )}
            <Input
                ref={inputRef}
                key={reloadCompKey}
                type="file"
                id="file"
                onChange={handleFileUploader}
                style={{color: fileName ? '#f78e20' : ''}}
                className={`form-control${errorTextFile || requiredError ? ' is-invalid' : ''}`}
            />


            <div className="invalid-feedback">{requiredError}</div>
            <div className="invalid-feedback">{errorTextFile}</div>
            <div className="d-flex flex-wrap m-2 text-end" dir="ltr">
                {fileName?.length > 0 &&
                    fileName?.map((m, i, row) => (
                        <span key={m} className="text-success d-flex align-items-center">
              <span> {m} </span>
              <Button
                  close
                  size="sm"
                  color="none"
                  style={{marginLeft: '10px', width: '0', height: '0'}}
                  onClick={() => handleDelete(m)}
              />
                            {i + 1 !== row.length && <span className="m-2 text-gray">,</span>}
            </span>
                    ))}
            </div>
        </FormGroup>
    );
};

export default Uploader;

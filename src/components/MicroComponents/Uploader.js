import React, { useEffect, useState } from 'react';
import { Spin, Upload } from 'antd';
import { toast } from 'react-toastify';
import { uploadFileApi } from '../../api/http_request/Model/UploadFileApi';
import { baseURL } from '../../api/http_request/url';

const Uploader = ({
                    onChangeImage,
                    defaultFile = [],
                    count = 10,
                    listType = 'picture-card',
                    name = 'automation',
                    accept = '.pdf , .gif , .jpg , .png , .rar , .zip , .dwg , .doc , .docx , .xls , .xlsx , .csv , .txt , .pptx , .pptm , .ppt',
                  }) => {
  const [fileList, setFileList] = useState(defaultFile || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (defaultFile.length && count > 1) {

      setFileList([...fileList, ...defaultFile]);
    }
  }, []);

  const customRequest = (e) => {
    setLoading(true);
    uploadFileApi(name, { file: e.file }, (res) => {

      res.result.url = res.result.url.search('http') >= 0 ? res.result.url : `${baseURL}/${res.result.url}`;
      setFileList([...fileList, res.result]);
      setLoading(false);

    }, (error) => {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    });
  };

  useEffect(() => {
    const imagesName = [];
    fileList.map((item) => (imagesName.push(item.image_name)));
    // eslint-disable-next-line no-unused-expressions
    onChangeImage && onChangeImage(imagesName);

  }, [fileList]);
  const onChange = (x) => {
    if (x.file.status === 'removed') {
      setFileList(x.fileList);
    }
  };
  return (<div style={{ minHeight: '102px' }}>
    <Upload listType={listType} accept={accept}

            customRequest={customRequest}
            fileList={fileList}
            onChange={onChange}>
      {loading ? <Spin /> : fileList?.length < count && '+ آپلود'}

    </Upload>
  </div>);
};
export default Uploader;
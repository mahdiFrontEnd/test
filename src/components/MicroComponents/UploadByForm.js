import React, { useEffect, useState } from 'react';
import { Flex, Upload } from 'antd';
import { baseURL } from '../../api/http_request/url';


const UploadByForm = ({
                        onChangeImage, rowData,defFiles,
                        count = 8,
                        accept = '.gif , .jpg , .png',
                      }) => {
  const [fileList, setFileList] = useState([]);


  const handleChange = (info) => {
    // Set custom tooltip (title) for each file
    const updatedFileList = info.fileList.map(file => ({
      ...file,
      response: file.name,
    }));
    setFileList(updatedFileList);
  };


  useEffect(() => {
    const files = [];
    for (let i = 0; i < fileList?.length; i++) {
      files[`attachments[${i}]`] = fileList[i].originFileObj;
    }
    onChangeImage(files);
  }, [fileList]);


  useEffect(() => {
    if(rowData?.attachments[0]?.path.length > 0){
       const files = rowData?.attachments[0]?.path.map((item)=>(
        {url:`${baseURL}/${item.indexArray?.small}`}
      ))

      setFileList(files)




    }else if(defFiles){
      setFileList(defFiles)
    }
  }, [rowData]);


  const beforeUpload = () => {

    return false;
  };

  return (
    <Flex gap="middle" wrap>
      <Upload maxCount={count} multiple accept={accept}
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={beforeUpload}

      >
        {fileList?.length >= count ? null : '+ آپلود'}
      </Upload>

    </Flex>
  );
};
export default UploadByForm;


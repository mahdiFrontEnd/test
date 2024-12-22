import React, { useEffect, useState } from 'react';
import { Spin, Upload } from 'antd';
import { toast } from 'react-toastify';
import ImgCrop from 'antd-img-crop';
import { uploadFileApi } from '../../api/http_request/Model/UploadFileApi';
import { baseURL } from '../../api/http_request/url';

const UploadCrop = ({
                    onChangeImage,rotationSlider=true,aspect=1,cropShape="round",modalTitle="انتخاب تصویر",
                    defaultFile = [],
                    count = 10,
                    listType = 'picture-card',
                    name = 'automation',
                    accept = '.jpg , .png ',
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
    <ImgCrop modalTitle={modalTitle} cropShape={cropShape} rotationSlider={rotationSlider} aspect={aspect}><Upload listType={listType} accept={accept}

            customRequest={customRequest}
            fileList={fileList}
            onChange={onChange}>
      {loading ? <Spin /> : fileList?.length < count && '+ آپلود'}

    </Upload></ImgCrop>
  </div>);
};
export default UploadCrop;








// import { useState } from "react";
// import ImgCrop from "antd-img-crop";
// import { Upload } from "antd";
//
// const getSrcFromFile = (file) => {
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file.originFileObj);
//     reader.onload = () => resolve(reader.result);
//   });
// };
//
// const App = () => {
//   const [fileList, setFileList] = useState([
//     {
//       uid: "-1",
//       url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//     },
//   ]);
//
//   const onChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };
//
//   const onPreview = async (file) => {
//     const src = file.url || (await getSrcFromFile(file));
//     const imgWindow = window.open(src);
//
//     if (imgWindow) {
//       const image = new Image();
//       image.src = src;
//       imgWindow.document.write(image.outerHTML);
//     } else {
//       window.location.href = src;
//     }
//   };
//
//   return (
//     <ImgCrop rotationSlider>
//       <Upload
//         action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
//         listType="picture-card"
//         fileList={fileList}
//         onChange={onChange}
//         onPreview={onPreview}
//       >
//         {fileList.length < 5 && '+ Upload'}
//       </Upload>
//     </ImgCrop>
//   );
// };
//
// export default App;

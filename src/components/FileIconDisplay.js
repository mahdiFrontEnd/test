// src/FileIconDisplay.js
import React from 'react';
import { Tooltip } from 'antd';


const FileIconDisplay = ({ fileAddress }) => {
  const fileName = fileAddress?.split('/').pop();
  const fileType = fileName?.split('.').pop().toLowerCase();
  const fileShowName = fileName.replace(/(\d+)(\.\w+)$/, '$2');


  const getFileType = () => {

    switch (fileType) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'tiff':
        return 'image';
      case 'pdf':
        return 'pdf';
      case 'doc':
      case 'docx':
        return 'word';
      case 'xls':
      case 'xlsx':
        return 'excel';
      case 'ppt':
      case 'pptx':
        return 'powerpoint';
      case 'txt':
      case 'md':
        return 'text';
      case 'zip':
      case '7z':
      case 'tar':
      case 'gz':
        return 'archive';
      case 'rar':
        return 'rar';
      case 'mp4':
      case 'mkv':
      case 'avi':
      case 'mov':
      case 'wmv':
        return 'video';
      case 'mp3':
      case 'wav':
      case 'ogg':
        return 'audio';
      default:
        return 'default';
    }
  };

  const renderIcon = () => {
    const fileValue = getFileType();
    switch (fileValue) {
      case 'image':
        return 'image.png';
      case 'pdf':
        return 'pdf.png';
      case 'word':
        return 'word.png';
      case 'excel':
        return 'excel.png';
      case 'powerpoint':
        return 'powerpoint.png';
      case 'text':
        return 'text.png';
      case 'archive':
        return 'zip.png';
      case 'rar':
        return 'rar.png';
      case 'video':
        return 'mp4.png';
      case 'audio':
        return 'mp3.png';
      default:
        return 'image.png';
    }
  };


  return (<Tooltip title={fileName}>
    <div className="d-flex gap-2 align-items-center w-fit-content ">
      <img width="35px" src={`/filelogo/${renderIcon()}`} alt={fileName} />
      <div className="text-gray text-truncate " style={{ fontSize: '12px', width: '130px' }}>
        {fileShowName}</div>
    </div>
  </Tooltip>);
};

export default FileIconDisplay;


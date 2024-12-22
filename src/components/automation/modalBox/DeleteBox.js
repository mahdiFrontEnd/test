import React, { useState } from 'react';
import { Button, Card, CardTitle } from 'reactstrap';
import { toast } from 'react-toastify';
import Loading from '../../../layouts/loader/Loading';
import Automation from '../../../api/http_request/Model/automation/Automation';

const DeleteBox = ({ onClick, toggle, dataId, handleOut, loading, routeData }) => {
  const [isAddLoading, setIsAddLoading] = useState(false);

  const handleDelete = () => {
    if (handleOut) {
      handleOut();
    } else {
      setIsAddLoading(true);

      Automation.request({
        success: (result) => {
          toggle();
          onClick();
          toast.success(result.message);
        },
        error: (error) => {
          toggle();
          toast.error(error.message);
        },
        final: () => {
          setIsAddLoading(false);
        },
      }).deleteAutomation(routeData, dataId);

    }
  };

  return (
    <Card className="mb-0 text-center p-4">
      {isAddLoading && <Loading isFullLoading />}
      <CardTitle tag="h4" className="mb-4">
        آیا برای حذف اطمینان دارید؟
      </CardTitle>
      <div className="d-flex">
        <Button
          disabled={loading}
          color="danger"
          className="w-100 ms-1"
          onClick={() => handleDelete()}
        >
          بله
        </Button>
        <Button color="gray" className="w-100" onClick={toggle}>
          خیر
        </Button>
      </div>
    </Card>
  );
};

export default DeleteBox;

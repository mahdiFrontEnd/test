import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ComponentCard from '../../../components/ComponentCard';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import AutomationAddModal from '../../../components/automation/AutomationFunctionButtons/AutomationAddModal';
import SearchInputTopTable from '../../../components/MicroComponents/table/SearchInputTopTable';
import AutomationColumn from '../../../components/automation/AutomationColumn';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import TitleBox from '../../../components/TitleBox';
import SeeAllButton from '../../../components/automation/AutomationFunctionButtons/SeeAllButton';
import UseSetParams from '../../../helper/UseSetParams';
import { setCorrespondenceStatus } from '../../../store/automation/automationSlice';


const CorrespondencePage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [handleSetParams, handleDeleteParams] = UseSetParams();

  const correspondenceStatus = useSelector((state) => state.automationAddressRedux.correspondenceStatus);
  const navigate = useNavigate();
  const [columns] = AutomationColumn('correspondence', ['module_name', 'subjectSelect', 'price', 'detail', 'computing', 'company', 'status']);

  const handleClick = (e) => {
    handleDeleteParams({ 'status': e.target.value });
    dispatch(setCorrespondenceStatus(e.target.value));
  };


  useEffect(() => {
    handleSetParams([{ 'status': correspondenceStatus }]);
  }, [correspondenceStatus]);


  useEffect(() => {
    let params = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [k, v] of searchParams.entries()) {
      params = { ...params, [k]: v };
    }

    if (params.status) {
      dispatch(setCorrespondenceStatus(params.status));

    } else {

      dispatch(setCorrespondenceStatus('pending'));
      setSearchParams({ ...params , status: "pending" })
    }


  }, [searchParams]);


  return (<>


    <TitleBox title="مکاتبات داخلی">
      <SearchInputTopTable showSeen />
      <AutomationAddModal address="automation_correspondence" title="اضافه کردن مکاتبات"
                          showList={['inputSubject', 'selectSubject', 'to', 'cc', 'company_id', 'body', 'attachments']} />
      <SeeAllButton address="correspondence" />
      <DeleteFilterTable onClick={() => handleDeleteParams({ status: correspondenceStatus })} />
    </TitleBox>


    <CheckPermissionPage module="automation_correspondence">
      <ComponentCard>


        <div className="d-flex justify-content-end mb-3">
          {/*<h4*/}
          {/*  className="mainTitle">{correspondenceStatus === 'pending' ? 'مکاتبات باز' : 'مکاتبات بسته / پایان یافته'}</h4>*/}

          {/*<Button className="defBtn greenBtn"*/}
          {/*        onClick={handleClick}>{correspondenceStatus === 'pending' ? 'مکاتبات بسته / پایان یافته' : 'مکاتبات باز'}</Button>*/}


          <Radio.Group value={correspondenceStatus} buttonStyle="solid" onChange={handleClick}>
            <Radio.Button value="pending">مکاتبات باز</Radio.Button>
            <Radio.Button value="complete">مکاتبات آرشیو</Radio.Button>

          </Radio.Group>


        </div>
        <CreatorTable columns={columns} listAddress="automation_correspondence"

                      handleRowClassName={() => {
                        if (correspondenceStatus === 'complete') {
                          return 'red20';
                        }
                        return '';
                      }}


                      onDoubleClickRowHandler={(row) => navigate(`/automation/correspondence/correspondence_detail/${row?.id}`)} />
      </ComponentCard>
    </CheckPermissionPage>
  </>);
};

export default CorrespondencePage;

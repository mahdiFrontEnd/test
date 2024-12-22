import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Badge, Button, ConfigProvider, Radio, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { LuPlus } from 'react-icons/lu';
import { hasPermission } from '../../../permission/module';
import ComponentCard from '../../../components/ComponentCard';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import UseSetParams from '../../../helper/UseSetParams';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import InventoryRequestColumn from './InventoryRequestColumn';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import TitleBox from '../../../components/TitleBox';

const InventoryRequestList = ({ title, address, linkAddress }) => {
  const [titleValue, setTitle] = useState('');
  const [addressValue, setAddress] = useState('');
  const [linkAddressValue, setLinkAddress] = useState('');
  const navigate = useNavigate();
  const config = useSelector((state) => state.TableRedux.config);
  useEffect(() => {
    setTitle(title);
    setAddress(address);
    setLinkAddress(linkAddress);
  }, [title, address, linkAddress]);

  const [searchParams] = useSearchParams();
  const [defParams, setDefParams] = useState();
  const [columns] = InventoryRequestColumn(defParams, address);
  const [, handleDeleteParams] = UseSetParams();

  useEffect(() => {
    let params = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [k, v] of searchParams.entries()) {
      params = { ...params, [k]: v };
    }
    setDefParams({ status: params.status });
  }, [searchParams]);





  return (
    <>


      <TitleBox title={titleValue}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: 'blue',
            },
          }}
        >
          <Radio.Group
            buttonCheckedBg="red"
            value={defParams?.status || 'cartable'}
            buttonStyle="solid"
            onChange={(e) => {
              if (e.target.value !== 'cartable') {
                setDefParams({ status: e.target.value });
              }
              navigate(
                `/warehouses/${linkAddressValue}${
                  e.target.value !== 'cartable' ? `?status=${e.target.value}` : ''
                }`,
              );
            }}
          >
            <Radio.Button value="cartable">
              <div className="d-flex gap-2 align-items-center">
                {config?.unseen && (
                  <>
                    {config?.unseen[`${address}_cartabl_count`] > 0 && (
                      <Tooltip title="دیده نشده ها">
                        <Badge
                          count={config?.unseen[`${address}_cartabl_count`]}
                          color="#0000ff"
                        />
                      </Tooltip>
                    )}
                  </>
                )}
                <span>کارتابل</span>
              </div>
            </Radio.Button>
            <Radio.Button value="in_progress">
              <div className="d-flex gap-2 align-items-center">
                {config?.unseen && (
                  <>
                    {config?.unseen[`${address}_progress_count`] > 0 && (
                      <Tooltip title="دیده نشده ها">
                        <Badge
                          count={config?.unseen[`${address}_progress_count`]}
                          color="#0000ff"
                        />
                      </Tooltip>
                    )}
                  </>
                )}
                <span>در دست اقدام</span>
              </div>
            </Radio.Button>
            <Radio.Button value="completed">
              <div className="d-flex gap-2 align-items-center">
                {config?.unseen && (
                  <>
                    {config?.unseen[`${address}_archive_count`] > 0 && (
                      <Tooltip title="دیده نشده ها">
                        <Badge
                          count={config?.unseen[`${address}_archive_count`]}
                          color="#0000ff"
                        />
                      </Tooltip>
                    )}
                  </>
                )}
                <span>آرشیو</span>
              </div>
            </Radio.Button>
          </Radio.Group>
        </ConfigProvider>
        {hasPermission(addressValue, ['create']) && (
          <>
            {addressValue === 'inventory_remittance' ? (
              <Link to={`/warehouses/${linkAddressValue}/create?type=sell`}>
                <Button className="defBtn orangeBtn">فروش</Button>
              </Link>
            ) : addressValue === 'inventory_receipt' ? (
              <Link to={`/warehouses/${linkAddressValue}/create?type=purchase`}>
                <Button className="defBtn orangeBtn">بازگانی</Button>
              </Link>
            ) : (
              <Link
                to={`/warehouses/${linkAddressValue}/create${
                  address === 'inventory_temporary_receipt' ? '?type=temporary_receipt' : ''
                }`}
              >
                <IconBtn
                  TooltipText="ایجاد"
                  btnClass="greenIconBtn"
                  icon={<LuPlus size={22} />}
                />
              </Link>
            )}
          </>
        )}
        <DeleteFilterTable onClick={() => handleDeleteParams(defParams)} />
      </TitleBox>


      <CheckPermissionPage module={addressValue}>
        <ComponentCard>
          <CreatorTable
            columns={columns}
            listAddress={addressValue}
            childrenColumnName="childs"
            expandable={{ childrenColumnName: 'childs' }}
            onDoubleClickRowHandler={(row) =>
              navigate(`/warehouses/${linkAddressValue}/show/${row?.id}`)
            }
          />
        </ComponentCard>
      </CheckPermissionPage>
    </>
  );
};

export default InventoryRequestList;

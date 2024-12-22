import React, { useRef,useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import ComponentCard from '../../../../components/ComponentCard';
import { hasPermission } from '../../../../permission/module';
import DeleteBox from '../../../../components/automation/AutomationFunctionButtons/DeleteBox';
import IconBtn from '../../../../components/MicroComponents/button/IconBtn';
import PrintButton from '../../../../components/automation/detailbox/PrintButton';
import Loading from '../../../../layouts/loader/Loading';
import InventoryRequestPrint from './InventoryRequestPrint';
import { ComponentToPrint } from '../../../../components/ComponentToPrint';

const TopBox = ({ pageType, id, linkAddress, title, data, typeList, address }) => {
  const componentRefRefer = useRef();
  const onBeforeGetContentResolve = useRef(null);
  const [printLoading, setPrintLoading] = useState(false);
  const handleOnBeforeGetContent = useCallback(() => {
    setPrintLoading(true);

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setPrintLoading(false);
        resolve();
      }, 2000);
    });
  }, [setPrintLoading]);

  return (
    <ComponentCard>
      {printLoading && <Loading isFullLoading />}
      <div className="d-flex justify-content-between">
        <h4>{title}</h4>
        {pageType !== 'create' && (
          <div className="d-flex gap-1">

            {['inventory_receipt', 'inventory_remittance'].includes(address) && (
              <>
                {data?.request && (
                  <Link target="_blank"
                    className="defBtn blueBtn"
                    to={`/warehouses/inventoryRequest/show/${data?.request}`}
                  >
                    درخواست کالا
                  </Link>
                )}
                {data?.buy_request &&
                  <Link target="_blank"
                    className="defBtn blueBtn"
                    to={`/warehouses/inventoryBuyRequest/show/${data?.buy_request}`}
                  >
                    درخواست خرید کالا
                  </Link>
                }
              </>
            )}

            {hasPermission(address, ['delete']) && (
              <DeleteBox inDetail address={address} rowData={{ id }} />
            )}
            {hasPermission(address, ['show']) && pageType !== 'show' && (
              <Link to={`/warehouses/${linkAddress}/show/${id}`}>
                <IconBtn TooltipText="نمایش" btnClass="blueIconBtn" icon={<MdOutlineRemoveRedEye size={22} />} />
              </Link>
            )}
            {hasPermission(address, ['show']) && pageType !== 'edit' && data.can_edit && (
              <Link to={`/warehouses/${linkAddress}/edit/${id}`}>
                <IconBtn
                  TooltipText="ویرایش"
                  btnClass="orangeIconBtn"
                  icon={<FiEdit size={22} />}
                />
              </Link>
            )}

            {hasPermission(address, ['show']) && pageType !== 'edit' && (
              <PrintButton
                content={componentRefRefer}
                onBeforeGetContent={handleOnBeforeGetContent}
              />
            )}
          </div>
        )}
      </div>
      <ComponentToPrint ref={componentRefRefer}>
        <InventoryRequestPrint data={data} typeList={typeList} title={title} address={address} />
      </ComponentToPrint>
    </ComponentCard>
  );
};

export default TopBox;

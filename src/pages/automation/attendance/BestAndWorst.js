import React from 'react';
import { Collapse } from 'antd';
import { useSelector } from 'react-redux';
import { LuArrowDownUp } from 'react-icons/lu';
import ShowRankItem from './ShowRankItem';
import ComponentCard from '../../../components/ComponentCard';


const BestAndWorst = () => {
  const fullTableData = useSelector((state) => state.TableRedux.fullTableData);

  const items = [
    {
      key: '1',
      label: <div className="d-flex gap-1 align-items-center"><LuArrowDownUp /><span>کمترین ها و بیشترین ها</span>
      </div>,
      children: <div className="row">

        <ShowRankItem unit="دقیقه" data={fullTableData?.rank?.max_tajil} title="بیشترین تعجیل"  ziroTimeText="بدون تعجیل" time="tajil_time" />
        <ShowRankItem unit="دقیقه" data={fullTableData?.rank?.max_takhir} title="بیشترین تاخیر"  ziroTimeText="بدون تاخیر" time="takhir_time" />
        <ShowRankItem unit="دقیقه" data={fullTableData?.rank?.min_tajil} title="کمترین تعجیل"  ziroTimeText="بدون تعجیل" time="tajil_time" />
        <ShowRankItem unit="دقیقه" data={fullTableData?.rank?.min_takhir} title="کمترین تاخیر"  ziroTimeText="بدون تاخیر" time="takhir_time" />
        <ShowRankItem unit="بار" data={fullTableData?.rank?.unallowable} title="خروج غیر مجاز" ziroTimeText="بدون خروج غیر مجاز" time="status_count" />


      </div>,
    },

  ];


  return (<>

      {fullTableData?.rank ? <ComponentCard CardBodyClass="p-2">
        <Collapse items={items} headerBg="red" ghost />
      </ComponentCard> : ""
      }</>

  );
};

export default BestAndWorst;
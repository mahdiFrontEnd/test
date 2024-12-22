import React from 'react';

const ShowRankItem = ({ data, title, time, ziroTimeText, unit }) => {

    return (
      <div className="col-md-6 col-lg-4 mb-5">
        <h4 className="title orangeText mb-3">
          {title}
        </h4>
        {data?.map((item) => (
            <div className="d-flex justify-content-between align-items-center mb-2" key={item.person_id}>

              <span>{`${item?.user?.first_name} ${item?.user?.last_name}`} </span>
              {(!item[time] || item[time] === '0') ? <span style={{ fontSize: '11px' }}>{ziroTimeText}</span> :
                <span>{item[time]} {unit}</span>}</div>
          ),
        )

        }
      </div>
    );
  }
;

export default ShowRankItem;
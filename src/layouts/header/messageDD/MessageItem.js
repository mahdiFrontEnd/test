import { Link } from 'react-router-dom';

import { Badge, ListGroupItem } from 'reactstrap';
import { BsArrowDownRightSquareFill, BsChatRightDotsFill } from 'react-icons/bs';
import { imageOnError, imageOnLoad } from '../../../functions';

function MessageItem({ msg, type }) {

  const firstUrl = window.location.pathname + window.location.search;

  return (<ListGroupItem
    action
    key={msg.id}
  > <Link  onClick={() => {
    if (`/${msg.module}/${msg.module}_detail/${msg.module_id}?activeTab=${msg.type === 'comment' ? 2 : 3}` === firstUrl) {

      window.location.reload();
    }


  }} className="text-decoration-none"
          to={type === 'alert' ? `/commerce/purchase_detail/${msg.id}` : `/automation/${msg.module}/${msg.module}_detail/${msg.module_id}?activeTab=${msg.type === 'comment' ? 2 : 3}`}>
    <div className="d-flex align-items-center gap-3 py-2">
      {type !== 'alert' && <>
        {msg.image_of_created_by ? (<img
          alt="user"
          className="rounded-circle flex-shrink-0"
          src={msg?.image_of_created_by}
          width={50}
          height={50}
          onLoad={imageOnLoad}
          onError={imageOnError}
        />) : (<div className="image-name">{msg?.created_by?.charAt(0)}</div>)}</>}

      <div className="col-9 text-end">
        <h5 className="mb-0 fw-bold d-flex align-items-center justify-content-between">
          <span className="text-start fs-6 mb-2">{msg.subject}</span>
          <span className="d-none">
              {msg.type === 'comment' && <span className="text-primary"><BsChatRightDotsFill size={22} /></span>}
            {msg.type === 'new-message' && (<Badge color="secondary" pill style={{ fontSize: '10px' }}>
              جدید
            </Badge>)}
            {msg.type === 'refer' && (
              <span className="text-info"><BsArrowDownRightSquareFill size={22} /></span>

            )}
            </span>
        </h5>
        {
          msg.like
            ?
            <div className="d-flex align-items-center gap-2 mb-2">
              <span style={{fontSize:"11px"}}  className="text-gray  ">{msg.created_by}</span>
              <img width={26} src={`/filelogo/${msg.like}.png`} alt="" />

            </div>

            :

            <span
              className={`${type !== 'alert' ? 'text-muted' : 'fw-bold text-black'} text-truncate d-block `}>{msg.body.replace(/(<([^>]+)>)/ig, '')}</span>
        }


        <small className="text-muted">{msg.created_at}</small>
      </div>
    </div>
  </Link>
  </ListGroupItem>);
}

export default MessageItem;

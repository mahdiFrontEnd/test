import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ListGroup } from 'reactstrap';
import MessageItem from './MessageItem';
import Loading from '../../loader/Loading';
import EndMsg from './EndMsg';
import Automation from '../../../api/http_request/Model/automation/Automation';

function MessageDD({ type, activeKey, getAgainStatus }) {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, sethasMore] = useState(true);
  const [skip, setSkip] = useState(5);


  useEffect(() => {

    if (activeKey[0] === type) {
      const params = { skip: 0, take: 5 };
      if (type === 'message') {
        params.read = 2;
      }
      setLoading(true);


      Automation.request({
        success: (result) => {

          setLoading(false);
          setItems(result.result.data);
        },
      }).addParams(params).getMessage(type);

    }
  }, [activeKey, getAgainStatus]);

  const fetchMessages = async () => {
    const toRef = setTimeout(() => {


      Automation.request({
        success: (result) => {
          const value = result.result.data;
          setItems([...items, ...value]);
          if (value.length === 0 || value.length < 5) {
            sethasMore(false);
          }
        },
      }).addParams({ skip, take: 5 }).getMessage(type);

      setSkip(skip + 5);
      clearTimeout(toRef);
    }, 1500);
  };

  return (<div style={{minWidth:"260px"}} >
    <InfiniteScroll
      dataLength={items.length} //This is important field to render the next data
      next={fetchMessages}
      hasMore={hasMore}
      loader={items.length > 0 && <Loading isSpinner />}
      endMessage={<EndMsg />}
      height={300}
    >
      {loading && items.length === 0 ? (<Loading isMassageList type={type} />) : (
        <ListGroup flush className="px-0 pr-0 pe-0">
          {items.map((item) => {
            return <MessageItem key={item.id} msg={item} type={type} />;
          })}
        </ListGroup>)}
      {!loading && items.length === 0 && (<div className="p-3 text-center w-100 h4 ">موردی یافت نشد.</div>)}
    </InfiniteScroll>
  </div>);
}

export default MessageDD;

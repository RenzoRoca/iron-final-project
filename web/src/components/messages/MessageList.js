import { useState, useEffect } from 'react';
import MessageItem from './MessageItem';

import MessageService from '../../services/messages-service';
import { Fragment } from 'react';
import MessagesFilter from './MessagesFilter';

function MessagesList({ minSearchChars }) {

  const [state, setState] = useState({
    Messages: [],
    loading: false
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    // componentDidMount

    async function fetchMessages() {
      console.log('Fetching Messages...');
      
      setState(state => ({
        ...state,
        loading: true
      }))
      const Messages = await MessageService.list(search);
      console.log(Messages);
      
      if (!isUnmounted) {
        setState({
          Messages: Messages,
          loading: false
        })
      }
    }

    let isUnmounted = false;

    if (search.length >= minSearchChars || search.length === 0) {
      fetchMessages();
    }

    return () => {
      // componentWillUnmount
      isUnmounted =  true;
    }
  }, [search, minSearchChars]); // tiene como dependencia el buscador, para que siempre que cambie de valor se ejecute

  const handleSearch = search => setSearch(search);
  
  const { Messages, loading } = state;

  return (
    <Fragment>
      <MessagesFilter className="mb-3" onSearch={handleSearch} loading={loading} />
      <div className="row row-cols-4">
        {Messages.map(ad => (
          <div key={ad.id} className="col mb-4"><MessageItem ad={ad} /></div>
        ))}
      </div>
    </Fragment>
    
  )
}

MessagesList.defaultProps = {
  minSearchChars: 4
}

export default MessagesList;

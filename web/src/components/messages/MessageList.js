import { useState, useEffect } from 'react';
import MessageItem from './MessageItem';

import MessageService from '../../services/messages-service';
import { Fragment } from 'react';
import MessageBox from './MessageBox';


function MessagesList({ minSearchChars }) {

  /*
  const [state, setState] = useState({
    Messages: [],
    loading: false
  });
  const [search, setSearch] = useState('');
  */

  /*
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
  }, [search, minSearchChars]);
  */
  //const handleSearch = search => setSearch(search);
  
  //const { Messages, loading } = state;

  /*
  return (
    <Fragment>
      <MessagesFilter className="mb-3" onSearch={handleSearch} loading={loading} />
      <div className="row row-cols-4">
        {Messages.map(ad => (
          <div key={ad.id} className="col mb-4"><MessageItem ad={ad} /></div>
        ))}
      </div>
    </Fragment>)
  */
  
  return (
    <Fragment>
      <div class="chat-container">
        <img src="/w3images/bandmember.jpg" alt="Avatar" />
        <p>Hello. How are you today?</p>
        <span class="time-right">11:00</span>
      </div>

      <div class="chat-container darker">
        <img src="/w3images/avatar_g2.jpg" alt="Avatar" class="right" />
        <p>Hey! I'm fine. Thanks for asking!</p>
        <span class="time-left">11:01</span>
      </div>

      <div class="chat-container">
        <img src="/w3images/bandmember.jpg" alt="Avatar" />
        <p>Sweet! So, what do you wanna do today?</p>
        <span class="time-right">11:02</span>
      </div>

      <div class="chat-container darker">
        <img src="/w3images/avatar_g2.jpg" alt="Avatar" class="right" />
        <p>Nah, I dunno. Play soccer.. or learn more coding perhaps?</p>
        <span class="time-left">11:05</span>
      </div>
      <MessageBox />
    </Fragment>)    

}

MessagesList.defaultProps = {
  minSearchChars: 4
}

export default MessagesList;

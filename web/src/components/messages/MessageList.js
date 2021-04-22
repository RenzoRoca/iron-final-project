import React, { useState, useEffect, useContext } from 'react';
import MessageItem from './MessageItem';
import MessageService from '../../services/messages-service';
import { Fragment } from 'react';
import MessageBox from './MessageBox';
import firebase from '../../services/notification-service';
import moment from 'moment';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../contexts/AuthStore';

const db = firebase.firestore();


function MessagesList({ minSearchChars }) {

  const { t } = useTranslation();
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {

    console.log('fire db => ', db);

    if (db) {
      const unsubscribe = db
        .collection('messages')
        .orderBy('creationDate')
        .limit(100)
        .onSnapshot(querySnapshot => {
          // Get all documents from collection - with IDs
          const data = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log('all the data');
          console.log(data);
          // Update state
          setMessages(data);
        })

      // Detach listener
      return unsubscribe;
    }
  }, [db]);

  const handleOnChange = e => {
    setNewMessage(e.target.value);
  }

  const handleOnSubmit = e => {
    e.preventDefault();
    
    if (db) {
      db.collection('messages').add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        author: user.id
        //mention: user.id, // será el autor del ad
        //photoUrl: user.profileImage
      })
    }
    
    setNewMessage(e.target.value);
  }

  return (
    <>
      {messages.map(message => 
        <div key={message.id} className="chat-container">
        <img src="/w3images/bandmember.jpg" alt="Avatar" />
        <p>{message.text}</p>
        <span className="time-right">{moment({}).seconds(message.creationDate.seconds).format('H:mm:ss')}</span>
      </div>
      )}
      <div className="row row-cols-1">      
      <div className="col">
        <form onSubmit={handleOnSubmit}>
          
          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-tag fa-fw"></i></span>
            <input 
              type="text" 
              value={newMessage} 
              onChange={handleOnChange}
              placeholder={t('MessageBox.text')}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={!newMessage}>
            <span>Send message</span>
          </button>          
        </form>
      </div>
    </div>
    </>)

}

MessagesList.defaultProps = {
  minSearchChars: 4
}

export default MessagesList;

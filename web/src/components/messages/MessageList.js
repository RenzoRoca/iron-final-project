import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
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

  const { userId, adId } = useParams();

  const handleProceed = (e) => {
    history.push(`/messages/${userId}/${adId}`);
  };

  const { t } = useTranslation();
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (db) {

      const messageRef = db.collection('messages');

      const unsubscribe = messageRef
        .where('author', '==', userId)
        .where('mention', '==', adId)
        .orderBy('creationDate')
        .limit(100)
        .onSnapshot(querySnapshot => {
          
          const data = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }));

          console.log('userId: ');
          console.log(userId);
          console.log('adId: ');
          console.log(adId);
          

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
        creationDate: firebase.firestore.FieldValue.serverTimestamp(),
        author: userId,
        mention: adId,
        photoUrl: user.profileImage
      })
    }
    
    setNewMessage(e.target.value);
  }

  const handleHourMessage = ((message = null) => {
    if(message.creationDate){
      return moment({}).seconds(message.creationDate.seconds).format('H:mm:ss');
    }
    return '00:00:00';
  });

  return (
    <>
      {messages.map(message => 
        <div key={message.id} className="chat-container">
        <img src={message.photoUrl} alt="Avatar" />
        <p>{message.text}</p>
        <span className="time-right">{ handleHourMessage(message) }</span>
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

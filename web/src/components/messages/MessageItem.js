import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom';


function MessageItem({ message: { id, text, author, creationDate, mention, read } }) {
  const { user } = useContext(AuthContext);

  return (
    <div className={`card shadow-sm ${user?.id === author?.id ? 'border-info rounded' : 'border-0 rounded-0'}`}>
        <div className="card-body">
            <span className="fw-lighter">{text}</span>
            <span className="fw-lighter">{author}</span>
        </div>
    </div>
  )
}

export default MessageItem;

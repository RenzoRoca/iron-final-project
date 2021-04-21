import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom';

function UserItem({ user: { name, email, type, category, followers, profileImage } }) {
  const { user } = useContext(AuthContext);
  return (
    <div className={`card shadow-sm`}>
      <img src={profileImage} className="card-img-top" alt={name} />
      <div className="card-body">
        <span className="fw-lighter" style={{ color: '#d1410c', fontSize: '18px' }}>{followers}</span>
        <span className="fw-lighter" style={{ color: '#d1410c', fontSize: '12px' }}>{category}</span>
        <span className="fw-lighter" style={{ color: '#d1410c', fontSize: '12px' }}>{email}</span>
        <Link className="stretched-link link-unstyled"><h5 className="card-title mt-2">{name}</h5></Link>
      </div>
    </div>
  )
}

export default UserItem;
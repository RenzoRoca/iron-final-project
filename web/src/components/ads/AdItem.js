import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom';


function AdItem({ ad: { id, title, image, description, author } }) {
  const { user } = useContext(AuthContext);

  return (
    <div className={`card shadow-sm ${user?.id === author?.id ? 'border-info rounded' : 'border-0 rounded-0'}`}>
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">        
        <span className="fw-lighter">{description}</span>
        <br/>
        <Link to={`/new-message/${id}`}><span >Responder a {author.name}</span></Link>
        <Link className="stretched-link link-unstyled" to={`/ads/${id}`}><h5 className="card-title mt-2">{title}</h5></Link>
      </div>
    </div>
  )
}

export default AdItem;

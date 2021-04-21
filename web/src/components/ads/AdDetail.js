import { useState, useEffect, Fragment, useContext } from 'react';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthStore';
import moment from 'moment';

import adsService from '../../services/ads-services';

function AdDetail() {

  const params = useParams();
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [ad, setAd] = useState();

  /*
  Equivalencias entre componente funcional y de clase:

  - useEffect == componentDidMount
  - la función que devuelve useEffect == componentWillUnmount
  */
  useEffect(() => {
    // componentDidMount

    async function fetchAd() {
      const { id } = params;
      console.info(`Feting ad ${id}...`)
      const ad = await adsService.get(id)
      if (!isUnmounted) {
        // La promesa de 'adsService.get' puede tardar mucho en resolverse y el usuario podría
        // decidir cambiar de ruta, debemos asegurarnos de que actualizamos el estado solo si el componente
        // sigue vivo.
        setAd(ad);
      }
    }

    let isUnmounted = false;
    fetchAd();

    return () => {
      // componentWillUnmount
      console.info(`Unmounting component...`);
      isUnmounted = true;
    }
  }, [history, params]);
  // ^^ El segundo argumento representa el array de dependencias ([]), 
  // solo se volverá a ejecutar la función de useEffect cuando cambie el valor de una de sus dependecias 
  // (si está vacío solo se ejecutará una vez)


  const handleDeleteAd = async () => {
    await adsService.remove(ad.id);
    history.push('/ads');
  }

  if (!ad) {
    return null;
  }

  const { id, image, title, description, open, applied, results, author } = ad;
  return (
    <Fragment>
      <div className="row row-cols-1 mb-4">
        <div className="col text-center">
          <img src={image} alt={title} className="img-fluid" />
        </div>
        <div className="col">
          <h1 className="mt-4 mb-2">{title}</h1>
          <div className="d-flex flex-row mb-2">
            <span className="badge rounded-pill bg-danger me-2 p-2"><i className="fa fa-clock-o me-1"></i>{open}</span>
          </div>
          <div className="text-muted fst-italic fw-light mb-2">By {author}</div>
          {description.split('\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>
        {applied && (
          <div className="col">
            {applied.map(apply => <span key={apply}>{<span className="badge rounded-pill bg-secondary me-2">{apply}</span>}</span>)}
          </div>
        )}
      </div>
      {user?.id === author.id && (
        <div className="col my-3 text-center">
          <div className="alert alert-secondary" role="alert">
            <h4 className="fw-light mb-2">Admin Area</h4>
            <div className="btn-group" role="group">
              <Link className="btn btn-secondary" to={`/ads/${ad.id}/edit`}>Update</Link>
              <button type="button" className="btn btn-danger" onClick={handleDeleteAd}>Delete</button>
            </div>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col">
          <Link to="/ads" className="fw-lighter"><i className="fa fa-angle-left"></i> Back to Ads</Link>
        </div>
      </div>
    </Fragment>
  );
}

export default AdDetail;

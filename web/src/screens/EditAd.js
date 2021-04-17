import moment from 'moment';
import { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router';
import AdForm from '../components/ads/AdForm';
import { AuthContext } from '../contexts/AuthStore';

import adsService from '../services/ads-services';

function EditAd() {

  const params = useParams();
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [ad, setAd] = useState();

  useEffect(() => {
    async function fetchAd() {
      const { id } = params;
      const ad = await adsService.get(id);
      if (!isUnmounted) {
        if (user?.id !== ad.author.id) {
          history.push('/403')
        } else {
          // Prepare model for AdForm          
          setAd(ad);
        }
      }
    }

    let isUnmounted = false;
    fetchAd();
    return () => {
      isUnmounted = true;
    }
  }, [params, history, user]);
  
  if (!ad) {
    return null;
  }

  return (
    <AdForm ad={ad} />
  )
}

export default EditAd;

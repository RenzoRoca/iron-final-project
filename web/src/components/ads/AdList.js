import { useState, useEffect } from 'react';
import AdItem from './AdItem';

import AdsService from '../../services/ads-services';
import { Fragment } from 'react';
import AdsFilter from './AdsFilter';

function AdsList({ minSearchChars }) {

  const [state, setState] = useState({
    Ads: [],
    loading: false
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    // componentDidMount

    async function fetchAds() {
      console.log('Fetching Ads...');
      setState(state => ({
        ...state,
        loading: true
      }))
      const Ads = await AdsService.list(search);
      if (!isUnmounted) {
        setState({
          Ads: Ads,
          loading: false
        })
      }
    }

    let isUnmounted = false;

    if (search.length >= minSearchChars || search.length === 0) {
      fetchAds();
    }

    return () => {
      // componentWillUnmount
      isUnmounted =  true;
    }
  }, [search, minSearchChars]); // tiene como dependencia el buscador, para que siempre que cambie de valor se ejecute

  const handleSearch = search => setSearch(search);
  
  const { Ads, loading } = state;

  return (
    <Fragment>
      <AdsFilter className="mb-3" onSearch={handleSearch} loading={loading} />
      <div className="row row-cols-4">
        {Ads.map(event => (
          <div key={event.id} className="col mb-4"><AdItem event={event} /></div>
        ))}
      </div>
    </Fragment>
    
  )
}

AdsList.defaultProps = {
  minSearchChars: 4
}

export default AdsList;

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import AdItem from './AdItem';
import AdsService from '../../services/ads-services';
import { Fragment } from 'react';
import AdsFilter from './AdsFilter';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';


const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

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
      console.log(Ads);

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
      isUnmounted = true;
    }
  }, [search, minSearchChars]); // tiene como dependencia el buscador, para que siempre que cambie de valor se ejecute

  const handleSearch = search => setSearch(search);

  const { Ads, loading } = state;

  return (
    <Fragment>
      <AdsFilter className="mb-3" onSearch={handleSearch} loading={loading} />
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={Ads}
        footer={
          <div>
            <b>últimos</b> anuncios publicados
      </div>
        }
        renderItem={item => (
          <AdItem ad={item} />
        )}
      />
    </Fragment>
  );

}

export default AdsList;
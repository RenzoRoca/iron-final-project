import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import AdItem from './AdItem';
import AdsService from '../../services/ads-services';
import { Fragment } from 'react';
import AdsFilter from './AdsFilter';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

/*
function AdsList({ minSearchChars }) {  

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
      isUnmounted =  true;
    }
  }, [search, minSearchChars]); // tiene como dependencia el buscador, para que siempre que cambie de valor se ejecute

  const handleSearch = search => setSearch(search);
  
  const { Ads, loading } = state;

  return (
    <Fragment>
      <AdsFilter className="mb-3" onSearch={handleSearch} loading={loading} />
      <div className="row row-cols-4">
        {Ads.map(ad => (
          <div key={ad.id} className="col mb-4"><AdItem ad={ad} /></div>
        ))}
      </div>
    </Fragment>
    
  )
}
AdsList.defaultProps = {
  minSearchChars: 4
}
export default AdsList;
*/

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

/*
<List.Item
key={item.title}
actions={[
  <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
  <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
  <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
]}
extra={
  <img
    width={272}
    alt="logo"
    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
  />
}
>
<List.Item.Meta
  avatar={<Avatar src={item.avatar} />}
  title={<a href={item.href}>{item.title}</a>}
  description={item.description}
/>
{item.content}
</List.Item>
*/

export default AdsList;
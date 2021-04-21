import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function AdItem({ ad: { id, title, image, description, author } }) {
  const { user } = useContext(AuthContext);

  return (
    <List.Item
      key={title}
      actions={[
        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
      ]}
      extra={
        <img
          width={272}
          alt={image}
          src={image}
        />        
      }
    >
      <List.Item.Meta
        avatar={<Avatar src={author.profileImage} />}
        title={<a href={`/ads/${id}`}>{title}</a>}
        description={
          user.id !== author.id 
          ? <Link activeclassname="active" to={`/new-message/${id}`}><span >Responder a {author.name}</span></Link> 
          : <Link to={`/ads/${id}/edit`}><span >Editar <i className="fa fa-edit"></i></span></Link>
        }
      />
      {description}
    </List.Item>
  )
}

export default AdItem;

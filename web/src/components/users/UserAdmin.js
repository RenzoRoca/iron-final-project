import React, { useContext } from 'react';
import { Layout, Menu, PageHeader } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { AuthContext } from '../../contexts/AuthStore';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UserDetail from './UserDetail';

const { Header, Content, Footer, Sider } = Layout;

class UserAdmin extends React.Component {

  static contextType = AuthContext;

  constructor(props) {
    super(props);
  }

  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { user } = this.context;
    const { collapsed } = this.state;

    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible collapsed={collapsed} onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link className="stretched-link link-unstyled" to={`/users/${user.id}`}  >Perfil</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                nav 2
            </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                nav 3
            </Menu.Item>
              <Menu.Item key="4" icon={<BarChartOutlined />}>
                nav 4
            </Menu.Item>
              <Menu.Item key="5" icon={<CloudOutlined />}>
                nav 5
            </Menu.Item>
              <Menu.Item key="6" icon={<AppstoreOutlined />}>
                nav 6
            </Menu.Item>
              <Menu.Item key="7" icon={<TeamOutlined />}>
                nav 7
            </Menu.Item>
              <Menu.Item key="8" icon={<ShopOutlined />}>
                nav 8
            </Menu.Item>
            </Menu>
          </Sider>
          <Layout  >
          <PageHeader
            className="site-page-header"
            onBack={() => null}
            title="User Admin View, "
            subTitle="Admin here data"
          />            
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
              
              <Route path="/users/:id" component={UserDetail} />
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default UserAdmin;
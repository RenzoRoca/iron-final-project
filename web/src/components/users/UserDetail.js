import { useState, useEffect, Fragment, useContext } from 'react';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';

import userService from '../../services/users-service';
import { Statistic, Row, Col, Card, Image  } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

function UserDetail() {

  const params = useParams();
  const history = useHistory();
  const [user, setUser] = useState();

  /*
  Equivalencias entre componente funcional y de clase:

  - useEffect == componentDidMount
  - la función que devuelve useEffect == componentWillUnmount
  */
  useEffect(() => {
    // componentDidMount

    async function fetchUser() {
      const { id } = params;
      console.info(`Feting user ${id}...`)
      const user = await userService.get(id)
      if (!isUnmounted) {
        // La promesa de 'userService.get' puede tardar mucho en resolverse y el usuario podría
        // decidir cambiar de ruta, debemos asegurarnos de que actualizamos el estado solo si el componente
        // sigue vivo.
        setUser(user);
      }
    }

    let isUnmounted = false;
    fetchUser();

    return () => {
      // componentWillUnmount
      console.info(`Unmounting component...`);
      isUnmounted = true;
    }
  }, [history, params]);
  // ^^ El segundo argumento representa el array de dependencias ([]), 
  // solo se volverá a ejecutar la función de useEffect cuando cambie el valor de una de sus dependecias 
  // (si está vacío solo se ejecutará una vez)


  const handleDeleteUser = async () => {
    await userService.remove(user.id);
    history.push('/users');
  }

  if (!user) {
    return null;
  }

  const { id, name, email, type, category, followers, profileImage } = user;
  return (
    <Fragment>
      <div className="row row-cols-1 mb-4">
        <div className="col text-center">
          <Image src={profileImage} alt={name} />          
        </div>
        <div className="col">
          <h1 className="mt-4 mb-2">{name}</h1>
          <div className="d-flex flex-row mb-2">
            <span className="badge rounded-pill bg-danger me-2 p-2"><i className="fa fa-clock-o me-1"></i>{email}</span>
          </div>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="Followers" value={followers} />
            </Col>
            <Col span={12}>
              <Statistic title="Category" value={category} precision={2} />
            </Col>
            <Col span={12}>
              <Statistic title="Type" value={type} />
            </Col>
          </Row>
          <br/>
          <h4>Last stats</h4>
          <div className="site-statistic-demo-card">
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="This month"
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Last month"
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>
          </div>,
        </div>
      </div>
    </Fragment>
  );
}

export default UserDetail;

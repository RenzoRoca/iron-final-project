import { useContext, Fragment } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import logo from '../../images/logo-ih.svg';
import { useTranslation } from 'react-i18next';
import userService from '../../services/users-service';
import { AuthContext } from '../../contexts/AuthStore';
import Langs from '../langs/Langs';

function Navbar() {
  const { t } = useTranslation()
  const { user, isAuthenticated, onUserChange } = useContext(AuthContext);
  const history = useHistory();

  async function handleLogout() {
    await userService.logout();
    onUserChange(undefined);
    history.push('/login');
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/ads">
          {t('Navbar.title')}
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/ads">{t('Navbar.ads')}</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/users">{t('Navbar.users')}</NavLink></li>
          </ul>
          <ul className="navbar-nav d-flex">
            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/session/login">{t('Navbar.login')}</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/session/register">{t('Navbar.register')}</NavLink></li>
              </Fragment>
            )}
            {isAuthenticated() && (
              <Fragment>
                <li className="nav-item"><Link className="nav-link text-light" to="/create-ad"><i className="fa fa-plus" /></Link></li>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/profile">{user.email}</NavLink></li>
                <li className="nav-item"><button type="submit" className="btn btn-link link-unstyled text-light" onClick={handleLogout}><i className="fa fa-sign-out" ></i></button></li>
              </Fragment>
            )}
          <li className="nav-item" style={{ paddingTop: '5px'}}><Langs /></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

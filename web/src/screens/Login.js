import LoginForm from '../components/users/LoginForm';
import { Link } from 'react-router-dom';
import userService from '../services/users-service';

function Login() {
  return (
    <div className="row">
      <div className="col-12 col-sm-4 mx-auto">
        <LoginForm />
        <hr/>
        <div className="d-grid gap-2">
          <Link className="btn btn-secondary" type="button" to="/register">Register</Link>
          <a className="btn btn-danger" href={userService.socialLoginUrl}><i className="fa fa-google"></i> Login with Google</a>
        </div>
      </div>
    </div>
  );
}

export default Login;

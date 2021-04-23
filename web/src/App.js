import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/nav/Navbar';
import Footer from './components/footer/Footer';
import Ads from './screens/Ads';
import AdForm from './components/ads/AdForm';
import AdDetail from './components/ads/AdDetail';
import Login from './screens/Login';
import Register from './screens/Register';
import AuthStore from './contexts/AuthStore';
import PrivateRoute from './guards/PrivateRoute';
import Error from './screens/Error';
import EditAd from './screens/EditAd';
import AuthCallback from './screens/AuthCallback';
import Video from './components/video/Video';
import Users from './screens/Users';
import MessageBox from './components/messages/MessageBox';
import MessagesList from './components/messages/MessageList';
import 'antd/dist/antd.css';
import UserAdmin from './components/users/UserAdmin';
import firebase from './services/notification-service';
import UserDetail from './components/users/UserDetail';


function App() {
  return (
    <Router>
      <AuthStore>
        <Navbar />
        <Route path="/session" component={Video} />
        <Switch>
          <div className="container pt-5 pb-5">

            <Route exact path="/authenticate/google/cb" component={AuthCallback} />
            <Route exact path="/session/login" component={Login} />
            <Route exact path="/session/register" component={Register} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/users/:id" component={UserDetail} />

            <Route exact path="/ads" component={Ads} />
            <Route exact path="/ads" component={Ads} />
            <Route exact path="/ads/:id" component={AdDetail} />
            <PrivateRoute exact path="/create-ad" component={AdForm} />
            <PrivateRoute exact path="/ads/:id/edit" component={EditAd} />

            <Route exact path="/messages/:userId/:adId" component={MessagesList} />
            <Route exact path="/404" component={() => <Error code={404} />} />
            <Route exact path="/403" component={() => <Error code={403} />} />
            <Redirect to="/session/register" />
          </div>          
        </Switch>
        <Route exact path="/user-admin" component={UserAdmin} />
        <Footer />
      </AuthStore>
    </Router>
  );
}

export default App;

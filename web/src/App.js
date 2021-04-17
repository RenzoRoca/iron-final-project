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

function App() {
  return (
    <Router>
      <AuthStore>
        <Navbar />
        <div className="container pt-4 pb-5">
          <Switch>
            <Route exact path="/authenticate/google/cb" component={AuthCallback}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            
            <Route exact path="/ads" component={Ads} />
            <Route exact path="/ads/:id" component={AdDetail} />
            <PrivateRoute exact path="/create-ad" component={AdForm} />
            <PrivateRoute exact path="/ads/:id/edit" component={EditAd} />
            
            <Route exact path="/404" component={() => <Error code={404} />} />
            <Route exact path="/403" component={() => <Error code={403} />} />

            <Redirect to="/register" />
          </Switch>
        </div>
        <Footer/>
      </AuthStore>
    </Router>
  );
}

export default App;

import React from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage'
import ProductPage from './pages/ProductsPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';

import { Switch, Route } from 'react-router-dom'
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <Navbar brand="Merce" />
        {/* <Switch> : memproses perpindahan navigasi */}
        <Switch>
          {/* <Reoute> : menentukan alamat page */}
          <Route path="/" component={LandingPage} exact />
          <Route path="/products" component={ProductPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/signin" component={SignInPage} />
        </Switch>
      </div>
    );
  }
}

export default App;

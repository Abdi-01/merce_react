import React from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage'
import ProductPage from './pages/ProductsPage';

import { Switch, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <Navbar />
        {/* <Switch> : memproses perpindahan navigasi */}
        <Switch>
          {/* <Reoute> : menentukan alamat page */}
          <Route path="/" component={LandingPage} exact />
          <Route path="/products" component={ProductPage} />
          <Route path="/signup" component={SignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;

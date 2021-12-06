import React from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage'
import ProductPage from './pages/ProductsPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import ProductDetail from './pages/ProductDetail';
// User Pages
import ProfilePage from './pages/UserPages/ProfilePage'
import CartPage from './pages/UserPages/CartPage'
import HistoryPage from './pages/UserPages/HistoryPage'
// Admin Pages
import ProductAdmin from './pages/AdminPages/ProductAdmin'
import TransactionAdmin from './pages/AdminPages/TransactionAdmin'

import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import { loginAction, keepLogin } from './actions'
import { connect } from 'react-redux'
import VerificationPage from './pages/VerificationPage';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.reLogin()
  }

  reLogin = () => {
    let token = localStorage.getItem("shopToken")
    console.log(token)
    if (token) {
      this.props.keepLogin(token)
    }
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
          <Route path="/product-detail" component={ProductDetail} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/verification" component={VerificationPage} />
          {
            // Proteksi untuk membatasi akses page
            this.props.role == "Admin" ?
              <>
                <Route path="/products-admin" component={ProductAdmin} />
                <Route path="/transactions-admin" component={TransactionAdmin} />
              </> :
              <>
                <Route path="/profile" component={ProfilePage} />
                <Route path="/cart" component={CartPage} />
                <Route path="/history" component={HistoryPage} />
              </>
          }
        </Switch>
      </div>
    );
  }
}

const mapToProps = (globalState) => {
  return {
    role: globalState.authReducer.role
  }
}

export default connect(mapToProps, { loginAction, keepLogin })(App);

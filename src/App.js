import React from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage'
import ProductPage from './pages/ProductsPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
// User Pages
import ProfilePage from './pages/UserPages/ProfilePage'
import CartPage from './pages/UserPages/CartPage'
import HistoryPage from './pages/UserPages/HistoryPage'
// Admin Pages
import ProductAdmin from './pages/AdminPages/ProductAdmin'
import TransactionAdmin from './pages/AdminPages/TransactionAdmin'

import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import { loginAction } from './actions'
import { connect } from 'react-redux'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.keepLogin()
  }

  keepLogin = () => {
    let data = JSON.parse(localStorage.getItem("data"))
    console.log(data)
    if (data) {
      axios.get(`http://localhost:2010/users?email=${data.email}&password=${data.password}`)
        .then((res) => {
          this.props.loginAction(res.data[0])
          localStorage.setItem("data", JSON.stringify(res.data[0]))
        }).catch((err) => {
          console.log(err)
        })
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
          <Route path="/signup" component={SignUpPage} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/history" component={HistoryPage} />
          <Route path="/products-admin" component={ProductAdmin} />
          <Route path="/transactions-admin" component={TransactionAdmin} />
        </Switch>
      </div>
    );
  }
}

export default connect(null, { loginAction })(App);

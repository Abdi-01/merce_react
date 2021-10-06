import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutAction } from '../actions'

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    btnLogOut = () => {
        localStorage.removeItem("data");
        this.props.logoutAction()
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand font-weight-bold" to="/">{this.props.brand}</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">
                                Product
                            </Link>
                        </li>
                    </ul>
                    {
                        this.props.iduser != null
                            ?
                            <div className="ml-auto">
                                <div class="btn-group">
                                    <button type="button" className="btn btn-outline-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Hello, {this.props.email}
                                    </button>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" style={{ cursor: "pointer" }}>Profile</a>
                                        <a className="dropdown-item" style={{ cursor: "pointer" }}>Cart</a>
                                        <a className="dropdown-item" style={{ cursor: "pointer" }}>Transactions</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" style={{ cursor: "pointer" }} onClick={this.btnLogOut}>Logout</a>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="ml-auto">
                                <Link className="btn btn-info" to="/signin">Sign In</Link>
                                <Link className="btn btn-outline-warning" to="/signup">Sign Up</Link>
                            </div>
                    }
                </div>
            </nav>
        );
    }
}

// menampung/menerima data dari globalstorage
const mapToProps = (globalState) => {
    console.table(globalState.authReducer)
    return {
        user: globalState.authReducer,
        iduser: globalState.authReducer.id,
        email: globalState.authReducer.email,
        role: globalState.authReducer.role
    }
}

export default connect(mapToProps, { logoutAction })(Navbar);
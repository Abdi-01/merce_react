import React from 'react';
import { Link } from 'react-router-dom'
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
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
                    <div className="ml-auto">
                        <Link className="btn btn-info" to="/signin">Sign In</Link>
                        <Link className="btn btn-outline-warning" to="/signup">Sign Up</Link>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
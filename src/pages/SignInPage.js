import React from 'react';
import axios from 'axios'

class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passType: "password",
            passVisible: "Show"
        }
    }

    btnShowHide = () => {
        if (this.state.passType == "password") {
            this.setState({ passType: "text", passVisible: "Hide" })
        } else {
            this.setState({ passType: "password", passVisible: "Show" })
        }
    }

    btnSignIn = () => {
        let email = this.refs.email.value
        let password = this.refs.password.value

        if (email == "" || password == "") {
            alert(`FIll in form ❌`)
        } else {
            axios.get(`http://localhost:2010/users?email=${email}&password=${password}`)
                .then((res) => {
                    console.table(res.data)
                    // penyimpanan data pda browser
                    localStorage.setItem("data", JSON.stringify(res.data[0]))
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    render() {
        return (
            <div className="m-auto pt-4" style={{ width: "30%" }}>
                <h1 className="text-center">Sign In</h1>
                <div className="form-group py-3">
                    <label>Email</label>
                    <input type="text" className="form-control" placeholder="example@mail.com" ref="email" />
                </div>
                <div className="form-group py-3">
                    <label>Password</label>
                    <div className="input-group">
                        <input type={this.state.passType} className="form-control" ref="password" />
                        <div className="input-group-append">
                            <span className="input-group-text" style={{ cursor: "pointer" }} onClick={this.btnShowHide}>{this.state.passVisible}</span>
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-info" style={{ float: "right" }} onClick={this.btnSignIn}>Sign In</button>
            </div>
        );
    }
}

export default SignInPage;
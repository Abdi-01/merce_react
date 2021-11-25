import React from 'react';
import axios from 'axios';
import { API_URL } from '../helper';

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    btnSignUP = () => {
        let username = this.refs.username.value
        let email = this.refs.email.value
        let telp = this.refs.phone.value
        let password = this.refs.password.value
        let confPassword = this.refs.confPassword.value

        // memeriksa kekuatan password

        if (email == "" || password == "" || confPassword == "") {
            alert(`FIll in form ❌`)
        } else {
            if (password == confPassword) {
                if (email.includes("@")) {
                    // Mengirim ke API menggunakan axios.post
                    axios.post(`${API_URL}/users/register`, {
                        username,
                        email,
                        telp,
                        password
                    }).then((res) => {
                        console.log(res)

                    }).catch((err) => {
                        console.log(err)
                    })
                } else {
                    alert(`Email failed ❌`)
                }
            } else {
                alert(`Password not match ❌`)
            }
        }
    }

    render() {
        return (
            <div className="m-auto pt-4" style={{ width: "30%" }}>
                <h1 className="text-center">Sign Up</h1>
                <div className="form-group pt-3">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="example : Antoni01" ref="username" />
                </div>
                <div className="form-group pt-3">
                    <label>Email address</label>
                    <input type="text" className="form-control" placeholder="example@mail.com" ref="email" />
                </div>
                <div className="form-group pt-3">
                    <label>Phone</label>
                    <input type="text" className="form-control" placeholder="08xxxxxxxxxx" ref="phone" />
                </div>
                <div className="form-group" >
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="minimum 6 character" ref="password" />
                </div>
                <div className="form-group" >
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="minimum 6 character" ref="confPassword" />
                </div>
                <button type="button" className="btn btn-warning" style={{ float: 'right' }} onClick={this.btnSignUP}>Sign Up</button>
            </div>
        );
    }
}

export default SignUpPage;

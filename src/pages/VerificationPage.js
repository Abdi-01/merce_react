import React from 'react';
import image_verified from './undraw_verified.png';
import { Button } from 'reactstrap'
import axios from 'axios';
import { API_URL } from '../helper'
import { keepLogin } from '../actions'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class VerificationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    onBtVerification = () => {
        console.log(window.location)
        let token = window.location.pathname.split('/')[2]
        console.log("TOKEN URL", token)

        axios.patch(`${API_URL}/users/verified`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data)
            if (res.data.success) {
                this.props.keepLogin(token)
                this.setState({ redirect: true })
                alert(res.data.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <div className="container p-5">
                <div className="shadow p-5 text-center rounded">
                    <h3 style={{ fontWeight: "bold" }}>Verification Your New Account</h3>
                    <p>Silahkan klik tombol dibawah ini, untuk melakukan verifikasi akun anda melalui email yang anda gunakan</p>
                    <img src={image_verified} width="40%" />
                    <br />
                    <Button color="warning" type="button" onClick={this.onBtVerification}>Verification</Button>
                </div>
            </div>
        );
    }
}

export default connect(null, { keepLogin })(VerificationPage);
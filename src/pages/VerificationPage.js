import React from 'react';
import image_verified from './undraw_verified.png';
import { Button } from 'reactstrap'

class VerificationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onBtVerification = () => {
        console.log(window.location)
    }

    render() {
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

export default VerificationPage;
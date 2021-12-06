import React from 'react';
import image404 from './404.png'

const NotFoundPage = (props) => {

    return (
        <div className="container text-center p-5">
            <img src={image404} width="50%"/>
            <h1 style={{fontWeight:"bold",color:"#3F3D56"}}>PAGE NOT FOUND</h1>
        </div>
    )
}

export default NotFoundPage;
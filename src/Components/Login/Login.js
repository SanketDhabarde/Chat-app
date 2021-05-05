import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './Login.css';


function Login() {
    const authContext = useContext(AuthContext);

    const signin = () => {
        authContext.login();
    }
    return (
        <div className="login">
            <div className="login__container">
                <img
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/225px-WhatsApp.svg.png" alt="whatsapp logo"/>
                 <div className="login__text">
                     <h2>Sign in to WhatsApp-Clone</h2>
                 </div>
                <Link to="/rooms">
                    <Button onClick={signin}><img className="login__googleLogo" alt="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png"/>Sign in with Google</Button>
                </Link>
                 
            </div>
        </div>
    )
}

export default Login;

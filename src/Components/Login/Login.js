import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
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
                     <h1>sign in to WhatsApp</h1>
                 </div>

                 <Button onClick={signin}>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default Login;

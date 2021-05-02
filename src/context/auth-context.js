import React, {useState} from 'react';
import { auth, provider } from '../firebase';

export const AuthContext = React.createContext({
    user: null,
    login: () => {},
    logout: () => {}
});

const AuthContextProvider = props => {
    const [user, setUser] = useState(null);
    
    const loginHandler = () => {
        auth.signInWithPopup(provider)
            .then(result => setUser(result.user))
            .catch(error => console.log(error))
    }

    const logoutHandler = () => {
        auth.signOut();
        setUser(null);
    }


    return (
        <AuthContext.Provider value={{user: user, login: loginHandler,logout: logoutHandler}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
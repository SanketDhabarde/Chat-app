import React, { useContext } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Chat from './Components/Chat/Chat';
import Login from './Components/Login/Login';
import Sidebar from './Components/Sidebar/Sidebar';
import { AuthContext } from './context/auth-context'; 

function App() {
  const authContext = useContext(AuthContext);
  
  return (
    <div className="app">
      { !authContext.user ? (
        <Router>
          <Login/>
        </Router>
      ): (
        <div className="app__body">
          <Router>
              <Switch>
                  <Route path="/rooms/:roomId" exact>
                      <Sidebar/>
                      <Chat/>
                  </Route>
                  <Route path="/rooms" exact>
                    <Sidebar/>
                  </Route>
                  <Route path="/" exact>
                      <Login/>
                  </Route>
              </Switch>
          </Router>
          
        </div>
      )}  
    </div>
  );
}

export default App;

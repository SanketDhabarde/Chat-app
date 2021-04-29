import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Chat from './Components/Chat/Chat';
import Login from './Components/Login/Login';
import Sidebar from './Components/Sidebar/Sidebar';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();
  
  return (
    <div className="app">
      { !user ? (
        <Login/>
      ): (
        <div className="app__body">
          <Router>
              <Sidebar/>
              <Switch>
                  <Route path="/rooms/:roomId">
                      <Chat/>
                  </Route>
                  <Route path="/">
                      <Chat/>
                  </Route>
              </Switch>
          </Router>
          
        </div>
      )}  
    </div>
  );
}

export default App;

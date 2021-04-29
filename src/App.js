import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Chat from './Components/Chat/Chat';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  return (
    <div className="app">
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
    </div>
  );
}

export default App;

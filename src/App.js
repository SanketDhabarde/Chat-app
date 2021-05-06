import React, { useContext, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Chat from './Components/Chat/Chat';
import Login from './Components/Login/Login';
import Modal from './Components/Modal/Modal';
import Sidebar from './Components/Sidebar/Sidebar';
import { AuthContext } from './context/auth-context'; 

function App() {
  const authContext = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  
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
                  <Route path="/rooms/:roomId">
                      <Sidebar/>
                      <Chat setSelectedImage={setSelectedImage}/>
                  </Route>
                  <Route path="/rooms">
                    <Sidebar/>
                  </Route>
                  <Route path="/" exact>
                      <Login/>
                  </Route>
              </Switch>
          </Router>
          
        </div>
      )}  
      {selectedImage && <Modal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />}
    </div>
    
  );
}

export default App;

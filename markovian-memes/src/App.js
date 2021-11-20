import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom';

import Frontpage from './components/Frontpage'
import Menu from './components/Menu'
import Memelist from './components/Memelist';
import MemePage from './components/MemePage'


const App = () => {

  const [loggedIn, setLoggedin] = useState(false);
  const [savedMemes, setSavedMemes] = useState(false);

  const login = () => {
    setLoggedin(true);
  }

  return (

    <div className="App">


      <Router>
        <Menu loggedIn={loggedIn} login={login} setSavedMemes={setSavedMemes} />
        <Switch>

          <Route path="/memes/:id">
            <MemePage />
          </Route>
          <Route path="/memes">
            <Memelist />
          </Route>
          <Route path="/top10">
            <div>top10</div>
          </Route>
          <Route path="/userSettings">
            <div>user settings</div>
          </Route>
          <Route path="/">

            <Frontpage loggedIn={loggedIn} savedMemes={savedMemes} />
          </Route>


        </Switch>
      </Router>



    </div>

  );
}





export default App;

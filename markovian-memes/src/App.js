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
import Policy from './components/privacyPolicy'
import About from './components/About'
import UserMemes from './components/UserMemes'
import Top10 from './components/Top10'

const App = () => {

  const [loggedIn, setLoggedin] = useState(null);
  const [savedMemes, setSavedMemes] = useState(false);

  const login = (user) => {
    setLoggedin(user);
  }

  return (

    <div className="App">


      <Router>
        <Menu loggedIn={loggedIn} login={login} setSavedMemes={setSavedMemes} />
        <Switch>

          <Route path="/memes/:id">
            <MemePage user={loggedIn}/>
          </Route>
          <Route path="/memes">
            <Memelist />
          </Route>
          <Route path="/top10">
            <Top10 user={loggedIn}/>
          </Route>
          <Route path="/userSettings">
            <div>
              <p>Nothing here yet</p>
            </div>
          </Route>
          <Route path="/savedMemes">
            <UserMemes user={loggedIn}/>
          </Route>
          <Route path="/policy">
            <Policy/>
          </Route>
          <Route path="/about">
            <About/>
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

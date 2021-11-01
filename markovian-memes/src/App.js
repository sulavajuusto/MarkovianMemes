import './App.css';
import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import { Nav, Container}  from 'react-bootstrap'
import StarOutlineIcon from  '@material-ui/icons/StarOutline';
import ShareIcon from  '@material-ui/icons/Share';
import GetAppIcon from  '@material-ui/icons/GetApp';
import CachedIcon from  '@material-ui/icons/Cached';

const images= ["/images/Meme1.png","/images/Meme2.jpg","/images/Meme3.jpg", "/images/Meme4.jpg"];
var imageFlag = 0;

const App = () => {

  const[loggedIn, setLoggedin] = useState(false);
  const[savedMemes, setSavedMemes] = useState(false);

 const login = () => {
    setLoggedin(true);
  }

  return (
    
    <div className="App">
      
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#home" onClick={() => setSavedMemes(false)} >Markovian Memes</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#memes">Memes</Nav.Link>
      <Nav.Link href="#top10">Top10</Nav.Link>
      {loggedIn? <Nav.Link onClick={() => setSavedMemes(true)}>Saved memes</Nav.Link> : null}
      
    </Nav>
    <Nav>
      {loggedIn?
        <Nav.Link href="#userSettings">Profile</Nav.Link>
      :
        <Nav.Link onClick={login}>Login</Nav.Link>
      }
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>

 
      <header className="App-header">
       <h1>Markovian memes..</h1>
      </header>
      {(!savedMemes)?
      <div>
               <CachedIcon fontSize="large"  style={{"marginTop": "2%", "color": "white"}} /> 
      <div className="meme-container">

      <div className="image-container">
            <Image src="/images/Meme1.png" alt="" onClick={nextImage} fluid/>
            </div>
            <div className="w-100 d-flex justify-content-between"> 
            {loggedIn? <Button variant="warning"><StarOutlineIcon/></Button> : <span></span>}
              
              <span>
              <Button variant="success" ><ShareIcon/></Button>
              <Button variant="dark"><GetAppIcon/></Button>
              </span>
              
      </div>
        </div>
      </div>
      :  
          <div>
    <div className=" image-container"> 
   
    <Image style={{"width": "20%"}} className="w-20" src="/images/Meme1.png" alt="" thumbnail />
  
    <Image style={{"width": "20%"}} className="w-20" src="/images/Meme2.jpg" alt="" thumbnail />

    <Image style={{"width": "20%"}} className="w-20"src="/images/Meme3.jpg" alt="" thumbnail />
    </div>
          </div>
      }
       
        
    </div>

  );
}



function nextImage(e) {
  imageFlag += 1;
  if (imageFlag > 3) {
    imageFlag = 0;
  }
  e.target.setAttribute('src', images[imageFlag]);
}

export default App;

import './App.css';
import ReactDOM from 'react-dom';
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

function App() {
  return (
    
    <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#home">Markovian Memes</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#memes">Memes</Nav.Link>
      <Nav.Link href="#top10">Top10</Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link href="#userSettings">User settings</Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
      <header className="App-header">
       <h1>Markovian memes..</h1>
 
              <CachedIcon fontSize="large" />

      </header>

      <div className="meme-container">

      <div className="image-container">
            <Image src="/images/Meme1.png" alt="" onClick={nextImage} fluid/>
            </div>
            <div className="w-100 d-flex justify-content-between"> 
              <Button variant="warning"><StarOutlineIcon/></Button>
              <Button variant="success"><ShareIcon/></Button>
              <Button variant="dark"><GetAppIcon/></Button>
              
      </div>
        </div>
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

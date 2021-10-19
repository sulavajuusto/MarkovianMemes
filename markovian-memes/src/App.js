import './App.css';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'
import { Nav, Container}  from 'react-bootstrap'
import DeleteIcon from  '@material-ui/icons/Delete';

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
      </header>
      <div className="image-container">
            <Image src="/images/Meme1.png" alt="" fluid/>
            <div> 
              <DeleteIcon/>
              <DeleteIcon/>
              <DeleteIcon/>
            </div>
        </div>
    </div>

  );
}

export default App;

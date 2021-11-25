import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'

import { Nav, Container } from 'react-bootstrap'
import Login from './Login'
import Logout from './Logout'
const Menu = (props) => {

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to="/"><Nav.Link>Markovian Memes</Nav.Link></LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/memes"><Nav.Link>Memes</Nav.Link></LinkContainer>
                        <LinkContainer to="/top10"><Nav.Link>Top10</Nav.Link></LinkContainer>
                        {props.loggedIn ? <LinkContainer to="/savedMemes"><Nav.Link>Saved Memes</Nav.Link></LinkContainer> : null}
                        <LinkContainer to="/policy"><Nav.Link>Privacy policy</Nav.Link></LinkContainer>
                        <LinkContainer to="/about"><Nav.Link>About</Nav.Link></LinkContainer>
                        
                        
                    </Nav>
                    <Nav>
                        {props.loggedIn !== null ?
                            <Nav>
                                <LinkContainer to="/userSettings"><Nav.Link>Profile</Nav.Link></LinkContainer>
                                <Logout login={props.login}></Logout>
                            </Nav>
                            :
                            <Login login={props.login} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Menu
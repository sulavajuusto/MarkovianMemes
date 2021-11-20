import {
    BrowserRouter as Router,
    Switch, Route, Link
  } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'

import { Nav, Container } from 'react-bootstrap'

const Menu = (props) => {

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/" onClick={() => props.setSavedMemes(false)} >Markovian Memes</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/memes">Memes</Nav.Link>
                        <Nav.Link href="/top10">Top10</Nav.Link>
                        {props.loggedIn ? <Nav.Link onClick={() => props.setSavedMemes(true)}>Saved memes</Nav.Link> : null}

                    </Nav>
                    <Nav>
                        {props.loggedIn ?
                            <Nav.Link href="/userSettings">Profile</Nav.Link>
                            :
                            <Nav.Link onClick={props.login}>Login</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Menu
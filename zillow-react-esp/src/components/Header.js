import React from 'react';

// css
import { Nav, Navbar, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="#home">Compramelo</Navbar.Brand>

                <Nav className="ml-auto">
                    <Nav.Link>Home</Nav.Link>
                    <Nav.Link>Buy</Nav.Link>
                    <Nav.Link>Sell</Nav.Link>
                    <Nav.Link>Contact</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
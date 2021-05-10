import React from 'react';
import { NavLink, Link } from 'react-router-dom';

// css
import { Nav, Navbar, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand>
                    <Link to="/">Compramelo</Link>
                </Navbar.Brand>

                <Nav className="ml-auto">
                    <Nav.Link>
                        <NavLink to='/welcome'>Home</NavLink>
                    </Nav.Link>
                    <Nav.Link>
                        <NavLink to='/compra'>Buy</NavLink>
                    </Nav.Link>
                    <Nav.Link>Sell</Nav.Link>
                    <Nav.Link>Contact</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
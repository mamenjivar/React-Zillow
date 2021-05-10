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
                    <NavLink className='nav-link' to='/welcome'>Home</NavLink>
                    <NavLink className='nav-link' to='/compra'>Buy</NavLink>
                    <NavLink className='nav-link' to='/vender'>Vender</NavLink>
                    <NavLink className='nav-link' to='/'>Contact</NavLink>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
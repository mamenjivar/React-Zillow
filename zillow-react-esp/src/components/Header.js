import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';

// store
import AuthContext from '../store/auth-context';

// css
import { Nav, Navbar, Container, Button } from 'react-bootstrap';

const Header = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
    }

    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand>
                    <Link to="/">Compramelo</Link>
                </Navbar.Brand>

                <Nav className="ml-auto">
                    <NavLink className='nav-link' to='/welcome'>Home</NavLink>
                    <NavLink className='nav-link' to='/compra'>Buy</NavLink>
                    {isLoggedIn && (
                        <NavLink className='nav-link' to='/vender'>Vender</NavLink>
                    )}
                    {/* <NavLink className='nav-link' to='/'>Contactar</NavLink> */}
                    {!isLoggedIn && (
                        <NavLink className='nav-link' to='/auth'>Login</NavLink>
                    )}
                    {isLoggedIn && (
                        <Button variant="primary" onClick={logoutHandler}>Logout</Button>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
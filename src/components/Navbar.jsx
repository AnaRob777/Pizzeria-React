import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CartContext.jsx';
import { useUser } from '../context/UserContext.jsx'; 

const NavBar = () => {
  const { calcularPrecioTotal } = useCarrito(); 
  const total = calcularPrecioTotal();

  const { token, logout } = useUser(); 

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Pizzeria Mamma Mia!</Navbar.Brand>
        <Nav className="me-auto">
          <Link to="/" className="text-decoration-none">
            <Button variant="dark" className="border-light mx-2">🍕 Home</Button>
          </Link>
          {token ? (
            <>
              <Link to="/profile" className="text-decoration-none">
                <Button variant="dark" className="border-light mx-2">🔓 Profile</Button>
              </Link>
              <Button
                variant="dark"
                className="border-light mx-2"
                onClick={logout} 
              >
                🔒 Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-decoration-none">
                <Button variant="dark" className="border-light mx-2">🔐 Login</Button>
              </Link>
              <Link to="/register" className="text-decoration-none">
                <Button variant="dark" className="border-light mx-2">🔐 Register</Button>
              </Link>
            </>
          )}
        </Nav>
        <Nav className="ms-auto">
          <Link to="/cart" className="text-decoration-none">
            <Button variant="dark" className="p-2 border-light">
              🛒 Total: ${total.toLocaleString('es-ES')}
            </Button>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;

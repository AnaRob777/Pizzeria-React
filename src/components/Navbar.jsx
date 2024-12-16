import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const NavBar = () => {
  const total = 25000;
  const token = false;

  return(
    <Navbar bg="dark" data-bs-theme="dark">
    <Container>
      <Navbar.Brand>Pizzeria Mamma Mia!</Navbar.Brand>
      <Nav className="me-auto">
        <Button variant="dark" className="border-light mx-2">🍕 Home</Button>
        {token ? (
          <div>
            <Button variant="dark" className="border-light mx-2">🔓 Profile</Button>
            <Button variant="dark" className="border-light mx-2">🔒 Logout</Button>
          </div>
        ) : (
          <div>
            <Button variant="dark" className="border-light mx-2">🔐 Login</Button>
            <Button variant="dark" className="border-light mx-2">🔐 Register</Button>
          </div>
        )}
      </Nav>
      <Nav className="ms-auto">
        <Button variant="dark" className="p-2 border-light">
          🛒 Total: ${total.toLocaleString('es-ES')}
        </Button>
      </Nav>
    </Container>
  </Navbar>
  )
}

export default NavBar;


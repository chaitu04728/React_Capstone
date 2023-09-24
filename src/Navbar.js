import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { toast } from "react-toastify";


function AppHeader() {
  const loggedIn = sessionStorage.getItem('username');

  const handleLogout = () => {
    sessionStorage.clear();
    toast.success('Logout successful');
    window.location.reload();
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Container>
        <Navbar.Brand href="/">ShopiFi</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/Product">Products</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/About">About</Nav.Link>
            {loggedIn ? (
              <NavDropdown title={sessionStorage.getItem('username')} id="collapsible-nav-dropdown">
                <NavDropdown.Item href="/Profile">View Profile</NavDropdown.Item>
                <NavDropdown.Item href="/AddProduct">Add Product</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link href="/Login">Login</Nav.Link>
                <Nav.Link href="/Register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppHeader;

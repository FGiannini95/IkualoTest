import React from "react";
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import './navbarApp.scss'


export const NavBarApp = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/registro')
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid className="paddingContainer">
        <Navbar.Brand as={Link} to="/">
          <img src="/images/logo.png"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav w-100">
          <Nav className="me-auto d-flex w-100 ">
            <div className="d-flex justify-content-end w-100">
              <div className="d-flex">
                <Nav.Link as={Link} to="/">
                  Qué es Ikaulo?
                </Nav.Link>
                <Nav.Link as={Link} to="/about">
                  Productos
                </Nav.Link>
                <Nav.Link as={Link} to="/about">
                  ÍkuaBlog
                </Nav.Link>
                <Nav.Link as={Link} to="/about">
                  Íkualo en los medios
                </Nav.Link>
                <Button variant="light" onClick={handleClick}>REGÍSTRATE</Button>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  
  );
}


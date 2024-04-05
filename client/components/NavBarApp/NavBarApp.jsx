import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "./navbarApp.scss";
import { IkauloContext } from "../../context/IkauloContext";
import { delLocalStorage } from "../../helpers/localStorage";

export const NavBarApp = () => {
  const { user, setUser, toke, setToken, setIsLogged } =
    useContext(IkauloContext);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/registro");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const logOut = () => {
    delLocalStorage("token");
    setUser();
    setToken();
    setIsLogged(false);
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid className="paddingContainer">
        <Navbar.Brand as={Link} to="/">
          <img src="/images/logo.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu} />
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
                {!user ? (
                  <>
                    <button variant="light" onClick={handleClick}>
                      REGÍSTRATE
                    </button>
                  </>
                ) : (
                  <>
                    <p>{`${user.name.charAt(0).toUpperCase()}${user.lastname.charAt(0).toUpperCase()}`}</p>
                    <button variant="light" onClick={logOut}>
                      LOGOUT
                    </button>
                  </>
                )}
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

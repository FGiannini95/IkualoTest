import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../../public/stylesheets/general.scss'

const initialValue = {
  email: "",
  password: "",
};

export const Login = () => {
  const [login, setLogin] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/users/login", login)
      .then((res) => {
        setIsLogged(true);
        setToken(res.data.token);
        saveLocalStorage("token", res.data.token);
      })
      .catch((err) => {
        setMsgError(err.response.data);
      });
  };

  return (
    <Container fluid className="formulario">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form className="p-5 login text-center">
            <h2>Login</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
            <p>{msgError}</p>
            <Button variant="primary me-2" onClick={handleSubmit}>
              Aceptar
            </Button>
            <Button variant="primary" onClick={() => navigate("/")}>
              Cancelar
            </Button>
            <p>
              ¿No estás registrado? <Link to={"/registro"}>Regístrate</Link>
            </p>
            <p>
              ¿Has olvidado tu contraseña? <Link to="/recoverpassword">Haz click aquí</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

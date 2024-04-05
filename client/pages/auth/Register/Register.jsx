import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../public/stylesheets/general.scss"
import { registerValidator } from "../../../utils/registerValidator";


const initialValue = {
  name: "",
  lastname: "",
  email: "",
  email2: "",
  password: "",
  password2: "",
};

export const Register = () => {
  const [register, setRegister] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();

  const verPassword = () => {
    setShowPassword(!showPassword);
  };

  const verPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = registerValidator(register);
    if(!validate.validate) {
      setMsgError(validate.message)}
     else {
      axios
        .post("http://localhost:3000/users/createuser", register)
        .then((res) => {
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.error?.errno === 1062) {
            setMsgError("Email duplicado");
          } else if (err.response.data.error?.errno === 1406) {
            setMsgError("Campo demasiado largo");
          } else {
            setMsgError("Upps ha habido algún error!!");
          }
        });
    }
  };

  return (
    <Container fluid className="formulario">
      <Row className="justify-content-center p-5 registro text-center">
        <Col md={6}>
          <Form>
            <h2>Registro</h2>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="name"
                onChange={handleChange}
                autoFocus
                value={register.name}
                style={{ marginBottom: "11px" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="text"
                placeholder="Apellidos"
                name="lastname"
                onChange={handleChange}
                value={register.lastname}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                style={{ marginBottom: "11px" }}
                value={register.email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="text"
                placeholder="Repetir email"
                name="email2"
                onChange={handleChange}
                value={register.email2}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Contraseña"
                name="password"
                onChange={handleChange}
                style={{ marginBottom: "10px" }}
                value={register.password}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Repetir contraseña"
                name="password2"
                onChange={handleChange}
                value={register.password2}
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
              ¿Ya estás registrado? <Link to="/login">Loguéate</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

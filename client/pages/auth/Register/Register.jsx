import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleSubmit = (e) => {
    if (
      !register.name ||
      !register.lastname ||
      !register.email ||
      !register.email2 ||
      !register.password ||
      !register.password2
    ) {
      setMsgError("Completa todos los campos");
    }else{
      axios
          .post("http://localhost:3000/users/createuser", register)
          .then((res)=>{
              navigate('/login')
          })
          .catch((err)=>{
              console.log(err);
              if(err.response.data.error?.errno === 1062){
                  setMsgError("Email duplicado")
              }else if(err.response.data.error?.errno === 1406){
                  setMsgError("campo demasiado largo")
              }else{
                  setMsgError("upps ha habido algún error")
              }
          })
  }
  };

  return (
    <Row className="d-flex justify-content-center p-5">
      <Col md={4}>
        <Form>
          <h2>Registro</h2>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              name="name"
              // value={register.name}
              onChange={handleChange}
              autoFocus
            />
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellidos"
              name="lastname"
              // value={register.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              // value={register.email}
              onChange={handleChange}
            />
            <Form.Label>Repetir Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Repetir email"
              name="email2"
              // value={register.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              name="password"
              // value={register.password}
              onChange={handleChange}
            />{" "}
            <Form.Label>Repetir contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Repetir contraseña"
              name="password2"
              // value={register.password}
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
            Ya estás registrado? <Link to="/login">Loguéate</Link>
          </p>
        </Form>
      </Col>
    </Row>
  );
};

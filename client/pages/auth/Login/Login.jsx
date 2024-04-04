import React, { useState } from "react";
import { useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IkauloContext } from "../../../context/IkauloContext";
import axios from "axios";

const initialValue = {
  email: "",
  password: ""
}

export const Login = () => {
  const [login, setLogin] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  
  const {setToken, setIsLogged} = useContext(IkauloContext)

  const navigate = useNavigate();

  const handleChange = () => {
    const {name, value} = e.target;
    setLogin({...login, [name]:value})
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/users/login", login)
      .then((res)=>{
        setIsLogged(true)
        setToken(res.data.token)
        saveLocalStorage("token", res.data.token)
      })
      .catch((err)=>{setMsgError(err.response.data)})
  };

  return (
    <Row className="d-flex justify-content-center p-5">
      <Col md={4}>
        <Form>
          <h2>Login</h2>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              name="email"
              //value={login.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              //value={login.password}
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
            No estás registrado? <Link to={"/registro"}>Regístrate</Link>
          </p>
        </Form>
      </Col>
    </Row>
  );
};

import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../public/stylesheets/general.scss";
import { IkauloContext } from "../../../context/IkauloContext";
import { saveLocalStorage } from "../../../helpers/localStorage";
import { EyeClosed } from "../../../components/svg/EyeClosed";
import { EyeOpen } from "../../../components/svg/EyeOpen";

const initialValue = {
  email: "",
  password: "",
};

export const Login = () => {
  const [login, setLogin] = useState(initialValue);
  const { setUser, setToken, setIsLogged } = useContext(IkauloContext);
  const [msgError, setMsgError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const verPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/users/login", login)
      .then((res) => {
        console.log("aaa", res);
        setIsLogged(true);
        setUser(res.data.user);
        setToken(res.data.token);
        saveLocalStorage("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        //setMsgError(err.response.data);
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
                placeholder="Email"
                name="email"
                onChange={handleChange}
                autoFocus
                autoComplete
              />
            </Form.Group>
            <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                name="password"
                onChange={handleChange}
              />
              <span
                className="eye-icon position-absolute pointer"
                onClick={verPassword}
              >
                {showPassword ? (
                  <EyeClosed height="1.5rem" />
                ) : (
                  <EyeOpen height="1.5rem" />
                )}
              </span>
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
              ¿Has olvidado tu contraseña?{" "}
              <Link to="/recoverpassword">Haz click aquí</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "./modal.scss";
import { EyeClosed } from "../../../components/svg/EyeClosed";
import { EyeOpen } from "../../../components/svg/EyeOpen";
import axios from "axios";
import { modalValidator } from "../../../utils/modalValidator";


const initialValue = {
  email:"",
  password: ""
}

export const ModalRecoverPassword = ({
  showModal,
  handleCloseModal,
  showPassword,
  verPassword,
}) => {

  const [recover, setRecover] = useState(initialValue);
  const [msgError, setMsgError] = useState("");

  const handleChange = (e) => {
    setRecover({
      ...recover,
      [e.target.name]: e.target.value
    })
  }

  const handleClose = () => {
    handleCloseModal();
    setRecover(initialValue);
    setMsgError("");
  }

  const handleSubmit = () => {
    // Validación de los campos del formulario utilizando la función registerValidator
    const validationRes = modalValidator(recover);

    if (!validationRes.validate) {
      // Si la validación falla, mostramos el mensaje de error correspondiente
      setMsgError(validationRes.message);
    } else {
      axios
        .put("http://localhost:3000/users/recoverpassword", recover)
        .then((res) => {
          console.log(res);
          setMsgError("Contraseña actualizada");
          handleCloseModal();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton className="modale">
        <Modal.Title>Establecer nueva contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modale">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            style={{ marginBottom: "11px" }}
            value={recover.email}
            autoComplete="email"
            autoFocus
          />
        </Form.Group>
        <Form.Group
          className="mb-3 position-relative"
          controlId="formBasicPassword"
        >
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Nueva contraseña"
            name="password"
            onChange={handleChange}
            value={recover.password}
            autoComplete="off"
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
        {msgError && <p>{msgError}</p>}

        <button className="btnModale" onClick={handleSubmit}>
          Aceptar
        </button>
        <button className="btnModale" onClick={handleClose}>
          Cancelar
        </button>
      </Modal.Body>
    </Modal>
  );
};

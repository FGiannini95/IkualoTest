import React from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "./modal.scss";
import { EyeClosed } from "../../../components/svg/EyeClosed";
import { EyeOpen } from "../../../components/svg/EyeOpen";

export const ModalRecoverPassword = ({
  showModal,
  handleCloseModal,
  showPassword,
  verPassword,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}
      className=""
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
            //onChange={handleChange}
            style={{ marginBottom: "11px" }}
            //value={register.email}
            autoComplete
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
            //onChange={handleChange}
            //value={register.password}
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
  
        <button className="btnModale" onClick={handleCloseModal}>
          Aceptar
        </button>
        <button className="btnModale" onClick={handleCloseModal}>
          Cancelar
        </button>
     
      </Modal.Body>
    </Modal>
  );
};

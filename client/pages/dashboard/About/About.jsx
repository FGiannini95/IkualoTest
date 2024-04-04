import React from "react";
import "./about.scss";
import { Spinner } from "react-bootstrap";

export const About = () => {
  return (
    <div className="text-center p-5 about">
      <h4>
        Estamos trabajando para mejorar el contenido. Sentimos las molestias.
      </h4>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

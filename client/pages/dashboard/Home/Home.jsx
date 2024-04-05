import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './home.scss'; // Asegúrate de importar tus estilos SCSS aquí

export const Home = () => {
  return (
    <div className='home'>
      <Container fluid>
        <Row className='justify-content-center'>
          <Col xs={12} className='text-center'>
            <h1 className='title'>Welcome to ÍKUALO</h1>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col xs={12} md={6} className='d-flex align-items-center justify-content-center'>
            <div className='text-center'>
              <p className='home_subtitle'>
                <span className='subtitle__1'>LA SÚPER APP</span>
                <br />
                <span className='subtitle__2'>FINANCIERA</span>
                <br />
                <span className='subtitle__3'>DE LOS</span>
                <br />
                <span className='subtitle__4'>INMIGRANTES</span>
              </p>
            </div>
          </Col>
          <Col xs={12} md={6} className='text-center justify-content-center'>
            <img src="images/footer.png" alt="Descripción de la imagen" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

import React, { useState } from 'react';
import { Navbar, Nav, Button, Container, Row, Col, Form, Card } from 'react-bootstrap';
import busbImage from '../../../img/busb.jpg';

const BusBookingHeader = () => {
  const [expanded, setExpanded] = useState(false); // State to control collapse

  return (
    <div style={{ padding: '20px' }}>
      {/* Banner Section */}
      <div className="banner" style={{
        position: 'relative',
        backgroundImage: `url(${busbImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '90vh',
        color: 'white',
        textAlign: 'left',
        borderRadius: '20px',
        overflow: 'hidden'
      }}>
        {/* Overlay to reduce brightness on the banner */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1
        }}></div>

        {/* Navbar Section */}
        <Navbar
          expanded={expanded}
          onToggle={() => setExpanded(expanded ? false : true)}
          expand="lg"
          bg="transparent"
          variant="dark"
          style={{ position: 'relative', zIndex: 2 }}
        >
          <Container>
            <Navbar.Brand href="#home" className="fw-bold" style={{ fontSize: '2rem' }}>B.S.R.T.C</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto justify-content-center w-100">
                <Nav.Link href="#home" style={{
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  fontFamily: 'Poppins, sans-serif',
                  color: 'white',
                  fontWeight: '500',
                  letterSpacing: '1px',
                  padding: '0 15px'
                }}>Home</Nav.Link>
                <Nav.Link href="#about" style={{
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  fontFamily: 'Poppins, sans-serif',
                  color: 'white',
                  fontWeight: '500',
                  letterSpacing: '1px',
                  padding: '0 15px'
                }}>About Us</Nav.Link>
                <Nav.Link href="#contact" style={{
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  fontFamily: 'Poppins, sans-serif',
                  color: 'white',
                  fontWeight: '500',
                  letterSpacing: '1px',
                  padding: '0 15px'
                }}>Contact Us</Nav.Link>
                <Nav.Link href="#gallery" style={{
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  fontFamily: 'Poppins, sans-serif',
                  color: 'white',
                  fontWeight: '500',
                  letterSpacing: '1px',
                  padding: '0 15px'
                }}>Gallery</Nav.Link>
                <Nav.Link href="#directory" style={{
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  fontFamily: 'Poppins, sans-serif',
                  color: 'white',
                  fontWeight: '500',
                  letterSpacing: '1px',
                  padding: '0 15px'
                }}>Directory</Nav.Link>
                <Nav.Link href="#tickets" style={{
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  fontFamily: 'Poppins, sans-serif',
                  color: 'white',
                  fontWeight: '500',
                  letterSpacing: '1px',
                  padding: '0 15px'
                }}>Tickets</Nav.Link>
              </Nav>
              <Button variant="secondary" className="ms-2" style={{
                color: 'gold',
                backgroundColor: 'transparent',
                borderColor: 'transparent'
              }}>
                Login
              </Button>
              <Button variant="primary" className="ms-2">Sign Up</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Main Banner Text */}
        <Container className="d-flex flex-column justify-content-center align-items-start h-100" style={{
          position: 'relative',
          zIndex: 2,
          marginTop: '-180px' // Move up the text
        }}>
          <h1 className="fw-bold display-5 text-white">
            Book your bus ride <br />
            <span className="text-primary">now</span>, we’ll do the rest!
          </h1>
        </Container>
      </div>

      {/* Booking Form Section */}
      <Card className="booking-form" style={{
        position: 'absolute',
        top: '65%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        borderRadius: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 3
      }}>
        <Card.Body>
          <h3 className="text-center mb-4">Book Your Journey</h3>
          <Form>
            <Row className="mb-3">
              <Col xs={6} md={3}>
                <Form.Check inline label="One Way" name="journeyType" type="radio" id="one-way" defaultChecked />
              </Col>
              <Col xs={6} md={3}>
                <Form.Check inline label="Round Trip" name="journeyType" type="radio" id="round-trip" />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="fromLocation">
                  <Form.Label>From</Form.Label>
                  <Form.Control type="text" placeholder="Patna" />
                </Form.Group>
              </Col>
              <Col md={1} className="d-flex align-items-center justify-content-center">
                <span style={{ fontSize: '1.5rem', color: '#6f42c1' }}>⇆</span>
              </Col>
              <Col md={3}>
                <Form.Group controlId="toLocation">
                  <Form.Label>To</Form.Label>
                  <Form.Control type="text" placeholder="Delhi" />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="departureDate">
                  <Form.Label>Departure</Form.Label>
                  <Form.Control type="text" placeholder="05 Nov 24" />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="returnDate">
                  <Form.Label>Return</Form.Label>
                  <Form.Control type="text" placeholder="05 Nov 24" disabled />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6} md={3}>
                <Form.Check inline label="Single Lady" name="passengerType" type="radio" id="single-lady" />
              </Col>
              <Col xs={6} md={3}>
                <Form.Check inline label="Senior Citizen" name="passengerType" type="radio" id="senior-citizen" />
              </Col>
            </Row>
            <div className="text-center mt-4">
              <Button variant="primary" size="lg" style={{backgroundColor:'#86469C',border:'none'}}>
                <i className="fas fa-bus"></i> Show Buses
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BusBookingHeader;

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../../UserComponents/Home/popular.css';

const PopularRoutes = () => {
  const navigate = useNavigate(); // Create a navigate function

  const routes = [
    {
      id: 1,
      title: 'Patna to Delhi',
      description: 'A Paris Adventure',
      image: '/Routes/delhi.jpg',
    },
    {
      id: 2,
      title: 'Patna to Kathmandu',
      description: 'A Paris Adventure',
      image: '/Routes/khatmandu.png',
    },
    {
      id: 3,
      title: 'Patna to Rajgir',
      description: 'London Eye Adventure',
      image: '/Routes/patna.jpeg',
    },
    {
      id: 4,
      title: 'Delhi to Patna',
      description: 'Amazing Streets',
      image: '/Routes/Rajgir.webp',
    },
  ];

  return (
    <Container
      className="py-5 mt-5 pop"
      style={{
        border: '1px solid #eee',
        borderRadius: '20px',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
        padding: '30px',
        backgroundColor: '#fff',
        width: '80%',
        
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4 ">
        <div>
          <h2 className="fw-bold">Popular Routes</h2>
          <p>
            Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination.
          </p>
        </div>
        <Button
          variant=""
          className="fw-bold view"
          style={{
            borderRadius: '8px',
            border: '2px solid #6f42c1',
            padding: '6px 18px',
            width: '100px',
            marginLeft: '20px',
            fontSize: '12px',
          }}
          onClick={() => navigate('/all-routes')} // Use navigate function to go to /all-routes
        >
          View All
        </Button>
      </div>

      {/* Routes Cards Section */}
      <Row>
        {routes.map((route) => (
          <Col key={route.id} sm={12} md={6} lg={3} className="mb-4">
            <Card
              className="shadow-sm h-100 text-white"
              style={{
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${route.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '300px',
                  width: '100%',
                }}
              ></div>
              <Card.ImgOverlay
                className="d-flex flex-column justify-content-end"
                style={{
                  background: 'rgba(0, 0, 0, 0.3)', // dark overlay for readability
                  padding: '20px',
                  borderRadius: '0 0 15px 15px',
                }}
              >
                <Card.Title className="fw-bold">{route.title}</Card.Title>
                <Card.Text>{route.description}</Card.Text>
                <Button
                  variant="warning"
                  className="fw-bold"
                  style={{
                    color: '#fff',
                    borderRadius: '3px',
                    padding: '5px 10px',
                    backgroundColor: '#ffcc00',
                    border: 'none',
                  }}
                >
                  Book Now
                </Button>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PopularRoutes;

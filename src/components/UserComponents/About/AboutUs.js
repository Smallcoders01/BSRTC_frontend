import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config';
import busImage from '../../../img/aboutBus.png';

const CACHE_KEY = 'aboutUsContent';
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const AboutUs = ({ onDataLoaded }) => {
  const [content, setContent] = useState({
    aboutUs: '',
    vision: '',
    mission: ''
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const language = localStorage.getItem('language') || 'en';

  useEffect(() => {
    const fetchContent = async () => {
      const cachedData = localStorage.getItem(`${CACHE_KEY}_${language}`);
      const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_${language}_timestamp`);

      if (cachedData && cachedTimestamp) {
        const now = new Date().getTime();
        if (now - parseInt(cachedTimestamp) < CACHE_EXPIRATION) {
          console.log('AboutUs: Using cached data');
          setContent(JSON.parse(cachedData));
          setLoading(false);
          onDataLoaded();
          return;
        }
      }

      console.log('AboutUs: Fetching fresh data');
      try {
        const response = await axios.get(`${config.apiBaseUrl}/about-us?lang=${language}`, { timeout: 10000 });
        const data = {
          aboutUs: response.data[`aboutUs${language === 'en' ? 'En' : 'Hi'}`],
          vision: response.data[`vision${language === 'en' ? 'En' : 'Hi'}`],
          mission: response.data[`mission${language === 'en' ? 'En' : 'Hi'}`]
        };
        setContent(data);
        localStorage.setItem(`${CACHE_KEY}_${language}`, JSON.stringify(data));
        localStorage.setItem(`${CACHE_KEY}_${language}_timestamp`, new Date().getTime().toString());
        setLoading(false);
        onDataLoaded();
      } catch (error) {
        console.error('AboutUs: Error fetching data', error);
        setError('Error fetching content');
        setLoading(false);
        onDataLoaded();
      }
    };

    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/about-profile/${language}`);
        console.log('API Response:', response.data); // Debugging: Log API response
        const members = response.data.map(profile => ({
          name: profile.name,
          title: profile.title,
          image: profile.photos.length > 0 ? `${config.baseUrl}${profile.photos[0]}` : null
        }));
        console.log('Mapped Members:', members); // Debugging: Log mapped members
        setTeamMembers(members);
      } catch (error) {
        console.error('Error fetching team members', error);
        setError('Error fetching team members');
      }
    };
  
    fetchContent();
    fetchTeamMembers();
  }, [onDataLoaded, language]);



  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ 
      marginTop: '-15vh', 
      position: 'relative', 
      zIndex: 1,
      marginBottom: '15vh' 
    }}>
      <Container
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Row>
          <Col md={7}>
            <h2 style={{ color: '#5c3b92', fontSize: '40px' }}>
              {language === 'en' ? 'About Us' : 'हमारे बारे में'}
            </h2>
            <div dangerouslySetInnerHTML={{ __html: content.aboutUs }} />
          </Col>
          <Col md={5} className="d-none d-md-flex justify-content-center align-items-center">
            <img
              src={busImage}
              alt="BSRTC Bus"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '10px',
                zIndex: 2,
              }} 
            />
          </Col>
        </Row>

        <Row className="mt-5">
          {teamMembers.map((member, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <Card className="border-0 text-center mb-4 team-card" style={{
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <div style={{
                  width: '200px',
                  height: '200px',
                  margin: '0 auto',
                  overflow: 'hidden',
                  borderRadius: '15px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                  marginTop: '15px'
                }}>
                  <Card.Img
                    variant="top"
                    src={member.image || '/path/to/default-image.jpg'}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/path/to/default-image.jpg'; }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </div>
                <Card.Body>
                  <Card.Title style={{ 
                    color: '#5c3b92', 
                    fontSize: '24px',
                    marginTop: '15px',
                    fontWeight: '800'
                  }}>
                    {member.name}
                  </Card.Title>
                  <Card.Text style={{ 
                    color: '#000',
                    fontSize: '16px'
                  }}>
                    {member.title}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="vision-section">
          <Col md={12}>
            <h3 style={{ color: '#5c3b92', fontSize: '30px' }}>
              {language === 'en' ? 'Vision' : 'दृष्टि'}
            </h3>
            <div dangerouslySetInnerHTML={{ __html: content.vision }} />
          </Col>
          <Col md={12}>
            <h3 style={{ color: '#5c3b92', fontSize: '30px', marginTop: '40px' }}>
              {language === 'en' ? 'Mission' : 'लक्ष्य'}
            </h3>
            <div dangerouslySetInnerHTML={{ __html: content.mission }} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;
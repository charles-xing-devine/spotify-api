import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, getTokenFromUrl } from '../Auth/OAuth';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Dashboard2.css';

function Dashboard() {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getTokenFromUrl();
    if (token) {
      localStorage.setItem('spotifyAccessToken', token);
      fetchUserProfile(token)
        .then((profile) => {
          setUserProfile(profile);
        })
        .catch((err) => {
          console.error('Error fetching user profile:', err);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('spotifyAccessToken'); // Remove token from local storage
    setUserProfile(null); // Reset user profile state
    navigate('/welcome'); // Redirect to the welcome page
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="hidden-navbar">
      <Container>
        <Navbar.Brand href="#home">Moodify</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
  
          </Nav>
          <Nav>
            <Nav.Link href="#deets">User Statistics</Nav.Link>
            <Nav.Link eventKey={2} onClick={handleLogout}>
              {userProfile ? (
                <img
                  src={userProfile.images[0]?.url}
                  alt="User Profile"
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    marginRight: '10px',
                    marginLeft: '10px',
                  }}
                />
              ) : (
                'Logout'
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Dashboard;

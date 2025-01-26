import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Dashboard2.css';

function Dashboard({ userProfile, handleLogout }) {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="#home">Moodify</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => window.location.reload()}>User Statistics</Nav.Link>
          </Nav>
          <Nav>
            {userProfile && (
              <>
                <img
                  src={userProfile.images?.[0]?.url || '/placeholder-image.png'}
                  alt="User Profile"
                  className="profile-icon"
                />
                <Nav.Link onClick={handleLogout} className="logout-link">
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Dashboard;
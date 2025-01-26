import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import Homepage from './components/Homepage/Homepage';

function getTokenFromUrl() {
  const hash = window.location.hash.substring(1);
  const token = hash
    .split('&')
    .find((elem) => elem.startsWith('access_token'))
    ?.split('=')[1];

  window.location.hash = ''; // Clear the URL hash after extracting the token
  return token;
}

function MainApp() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getTokenFromUrl();

    if (token) {
      localStorage.setItem('spotifyAccessToken', token); // Store token in localStorage
      console.log('Token stored in localStorage:', token); // Confirm storage in localStorage
      navigate('/homepage'); // Redirect to Homepage after storing token
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/callback" element={<Homepage />} /> {/* Route /callback to Homepage */}
      <Route path="/homepage" element={<Homepage />} />
    </Routes>
  );
}

export default MainApp;

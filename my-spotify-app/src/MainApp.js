// MainApp.js
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import Homepage from './components/Homepage/Homepage';
import { getTokenFromUrl } from './components/Auth/OAuth';

function MainApp() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getTokenFromUrl();

  
    if (token) {
      localStorage.setItem('spotifyAccessToken', token); // Store token in localStorage
      console.log("Token stored in localStorage:", token); // Confirm storage in localStorage
      window.history.replaceState({}, document.title, "/homepage"); 
      navigate('/homepage'); //redirect when storing
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

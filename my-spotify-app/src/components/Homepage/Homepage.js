// Homepage.js
import React, { useEffect } from 'react';
import LoginButton from '../LoginButton/LoginButton';
import ArtistTracks from '../Service/ArtistTracks';
import Dashboard from './Dashboard'; // Import Dashboard component
import { getTokenFromUrl } from '../Auth/OAuth';
import './Homepage.css';

const Homepage = () => {
  useEffect(() => {
    const token = getTokenFromUrl(); // Extract token from URL
    if (token) {
      localStorage.setItem('spotifyAccessToken', token); // Store token in localStorage
      window.history.replaceState({}, document.title, "/homepage"); // Clean up URL after storing token
    }
  }, []);

  return (
    <div>
      <Dashboard />
      <ArtistTracks />
    </div>
  );
}

export default Homepage;

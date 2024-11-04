import React, { useState, useEffect } from 'react';
import LoginButton from '../LoginButton/LoginButton';
import ArtistTracks from '../Service/ArtistTracks';
import { getTokenFromUrl, fetchUserProfile } from '../Auth/OAuth';
import './Homepage.css';

const Homepage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const token = localStorage.getItem('spotifyAccessToken');

  useEffect(() => {
    if (token) {
      fetchUserProfile(token)
        .then(profile => setUserProfile(profile))
        .catch(err => console.error('Error fetching user profile:', err));
    }
  }, [token]);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const handleGenerateMusic = () => setShowInput(true);

  return (
    <div className="homepage-container">
      
      <header className="header">
        {userProfile && (
          <div className="profile-section">
            <img 
              src={userProfile.images[0]?.url} 
              alt="Profile" 
              className="profile-icon" 
              onClick={toggleDropdown} 
            />
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => {
                  localStorage.removeItem('spotifyAccessToken');
                  setUserProfile(null);
                  window.location.href = '/';
                }}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </header>
      
      <main className="main-content">
      <h1 className="app-title">
          Welcome {userProfile ? ` ${userProfile.display_name}` : ''} to App Name!
        </h1>

        
        <div className="button-group">
          <button className="action-button" onClick={handleGenerateMusic}>generate music</button>
          <button className="action-button">see my analytics</button>
          <button className="action-button">share my data</button>
        </div>
        
        {showInput && (
          <ArtistTracks /> // Conditionally render ArtistTracks based on button click
        )}
      </main>
    </div>
  );
}

export default Homepage;

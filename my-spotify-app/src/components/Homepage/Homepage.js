import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard'; // Import Dashboard component
import UserStats from '../Service/UserStats';
import ArtistTracks from '../Service/ArtistTracks';
import { fetchUserProfile, getAuthUrl } from '../Auth/OAuth';
import './Homepage.css';

const Homepage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const hash = window.location.hash.substring(1).split('&').reduce((acc, item) => {
      const [key, value] = item.split('=');
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});

    const token = hash.access_token || localStorage.getItem('spotifyAccessToken'); // Check hash and localStorage

    if (token) {
      // Store the token in localStorage and clear the hash
      if (!localStorage.getItem('spotifyAccessToken')) {
        localStorage.setItem('spotifyAccessToken', token);
      }
      setAccessToken(token);
      window.location.hash = '';

      // Fetch the user profile
      setIsLoading(true);
      fetchUserProfile(token)
        .then((profile) => {
          setUserProfile(profile);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Failed to fetch profile:', error);
          setIsLoading(false);
          alert('Failed to fetch profile. Please log in again.');
          localStorage.removeItem('spotifyAccessToken');
          setAccessToken(null);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('spotifyAccessToken');
    setUserProfile(null);
    setAccessToken(null);
    window.location.href = '/'; // Redirect to the homepage
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className="homepage-container">
      <Dashboard />
      {/* Pass the accessToken to UserStats */}
      {accessToken && <UserStats accessToken={accessToken} />}
      <header className="header">
        {userProfile ? (
          <div className="profile-section">
            <img
              src={userProfile.images?.[0]?.url || '/placeholder-image.png'} // Default image if none exists
              alt="Profile"
              className="profile-icon"
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          !isLoading
        )}
      </header>

      <main className="main-content">
        <h1 className="app-title">
          Welcome {userProfile ? `${userProfile.display_name}` : 'to Moodify!'}
        </h1>

        {isLoading && <p>Loading your profile...</p>}

        <div className="button-group">
          <button
            className="action-button"
            onClick={() => setShowInput(true)}
          >
            Moods
          </button>
          <button
            className="action-button"
            onClick={() => alert('Artists is not implemented yet!')}
          >
            Artists
          </button>
          <button
            className="action-button"
            onClick={() => alert('Genres is not implemented yet!')}
          >
            Genres
          </button>
        </div>

        {showInput && <ArtistTracks />}
      </main>
    </div>
  );
};

export default Homepage;

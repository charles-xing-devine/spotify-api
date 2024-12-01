import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Container from './container';
import ArtistTracks from '../Service/ArtistTracks';
import SongsByArtist from '../Service/SongsByArtists';
import SongsByGenre from '../Service/SongsByGenre';
import { fetchUserProfile } from '../Auth/OAuth';
import './Homepage.css';

const Homepage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showSongsByArtist, setShowSongsByArtist] = useState(false);
  const [showSongsByGenre, setShowSongsByGenre] = useState(false); // New state for SongsByGenre
  const [showContainer, setShowContainer] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const hash = window.location.hash.substring(1).split('&').reduce((acc, item) => {
      const [key, value] = item.split('=');
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});

    const token = hash.access_token || localStorage.getItem('spotifyAccessToken');

    if (token) {
      if (!localStorage.getItem('spotifyAccessToken')) {
        localStorage.setItem('spotifyAccessToken', token);
      }
      setAccessToken(token);
      window.location.hash = '';

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
    } else {
      console.error('No access token available.');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('spotifyAccessToken');
    setUserProfile(null);
    setAccessToken(null);
    window.location.href = '/';
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className="homepage-container">
      <Dashboard />
      <header className="header">
        {userProfile ? (
          <div className="profile-section">
            <img
              src={userProfile.images?.[0]?.url || '/placeholder-image.png'}
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
          !isLoading && <p>Please log in to see your profile.</p>
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
            onClick={() => {
              setShowInput(true);
              setShowSongsByArtist(false);
              setShowSongsByGenre(false);
              setShowContainer(false);
            }}
          >
            Moods
          </button>
          <button
            className="action-button"
            onClick={() => {
              setShowSongsByArtist(true);
              setShowInput(false);
              setShowSongsByGenre(false);
              setShowContainer(false);
            }}
          >
            Artists
          </button>
          <button
            className="action-button"
            onClick={() => {
              setShowSongsByGenre(true);
              setShowInput(false);
              setShowSongsByArtist(false);
              setShowContainer(false);
            }}
          >
            Genres
          </button>
        </div>

        {showInput && <ArtistTracks />}
        {showSongsByArtist && <SongsByArtist token={accessToken} />}
        {showSongsByGenre && <SongsByGenre token={accessToken} />}
        {showContainer && <Container accessToken={accessToken} />}
      </main>
    </div>
  );
};

export default Homepage;

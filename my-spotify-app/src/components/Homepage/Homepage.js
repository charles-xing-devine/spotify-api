import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Container from './container';
import ArtistTracks from '../Service/ArtistTracks';
import { fetchUserProfile } from '../Auth/OAuth';
import SongsByArtist from '../Service/SongsByArtists';
import SongsByGenre from '../Service/SongsByGenre';
import './Homepage.css';

const Homepage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [showSongsByArtist, setShowSongsByArtist] = useState(false);
  const [showSongsByGenre, setShowSongsByGenre] = useState(false); //genre
  const [showContainer, setShowContainer] = useState(true);

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
    window.location.href = '/'; // Redirect to the welcome page
  };

  return (
    <div className="homepage-container">
      <Dashboard userProfile={userProfile} handleLogout={handleLogout} />
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
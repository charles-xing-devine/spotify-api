import React, { useState } from 'react';
import { fetchTracksByArtist } from './SpotifyService';
import './Dashboard.css';

const ArtistTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [artist, setArtist] = useState('');
  const token = localStorage.getItem('spotifyAccessToken');  // Standardized key

  const handleSearch = async () => {
    if (!token) {
      alert('No token found. Please log in.');
      return;
    }
    const fetchedTracks = await fetchTracksByArtist(artist, token);
    setTracks(fetchedTracks);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to App Name.</h1>
      <div className="input-container">
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="How do you feel today?"
          className="input-field"
        />
        <button onClick={handleSearch} className="submit-button">↑</button>
      </div>
      <div className="button-container">
        <button className="dashboard-button">Make me a playlist</button>
        <button className="dashboard-button">Give me a genre</button>
        <button className="dashboard-button">Use your Spotify data</button>
      </div>
      <ul>
        {tracks.map(track => (
          <li key={track.id}>{track.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistTracks;

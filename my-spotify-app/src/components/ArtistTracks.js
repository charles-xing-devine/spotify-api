import React, { useState } from 'react';
import { fetchTracksByArtist } from './SpotifyService';

const ArtistTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [artist, setArtist] = useState('');
  const token = localStorage.getItem('token');  // Retrieve the token from local storage

  const handleSearch = async () => {
    if (!token) {
      alert('No token found. Please log in.');
      return;
    }
    const fetchedTracks = await fetchTracksByArtist(artist, token);
    setTracks(fetchedTracks);
  };

  return (
    <div>
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Enter artist name"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {tracks.map(track => (
          <li key={track.id}>{track.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistTracks;

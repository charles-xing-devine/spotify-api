import React, { useState } from 'react';
import { fetchSongsByGenre } from './SpotifyService'; // Add this new service function
import SavePlaylist from '../SavePlaylist/SavePlaylist';
import './Dashboard.css';

const SongsByGenre = ({ token }) => {
  const [genreInput, setGenreInput] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('spotifyUserId'); // Spotify user ID

  const handleSearchSongs = async () => {
    if (!genreInput) {
      alert('Please enter a genre.');
      return;
    }

    setLoading(true);

    try {
      // Call the service function to fetch songs by genre
      const fetchedSongs = await fetchSongsByGenre(genreInput, token);
      setSongs(fetchedSongs);
    } catch (error) {
      console.error('Error fetching songs by genre:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Find Songs by Genre</h1>
      <div className="input-container">
        <input
          type="text"
          value={genreInput}
          onChange={(e) => setGenreInput(e.target.value)}
          placeholder="Enter a genre (e.g., rock)"
          className="input-field"
        />
        <button onClick={handleSearchSongs} className="submit-button">
          Search Songs
        </button>
      </div>
      {loading && <p>Loading songs...</p>}
      <div className="results-container">
        {songs.length === 0 && !loading ? (
          <p>No songs found. Try entering another genre.</p>
        ) : (
          <div className="container">
            <div className="track-list">
              {songs.map((song) => (
                <div key={song.id} className="track-item">
                  <img
                    src={song.album.images[0]?.url}
                    alt={song.name}
                    className="track-album-cover"
                  />
                  <div className="track-info">
                    <h3 className="track-name">{song.name}</h3>
                    <p className="track-artist">
                      {song.artists.map((artist) => artist.name).join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <SavePlaylist tracks={songs} token={token} userId={userId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SongsByGenre;

import React, { useState } from 'react';
import { fetchSongsByArtist } from './SpotifyService'; // Add this new service function
import SavePlaylist from '../SavePlaylist/SavePlaylist';
import './Dashboard.css';

const SongsByArtist = ({ token }) => {
  const [artistInput, setArtistInput] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('spotifyUserId');

  const handleSearchSongs = async () => {
    if (!artistInput) {
      alert('Please enter an artist name.');
      return;
    }

    setLoading(true);

    try {
      const fetchedSongs = await fetchSongsByArtist(artistInput, token);
      setSongs(fetchedSongs);
    } catch (error) {
      console.error('Error fetching songs by artist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Find Songs by Artist</h1>
      <div className="input-container">
        <input
          type="text"
          value={artistInput}
          onChange={(e) => setArtistInput(e.target.value)}
          placeholder="Enter artist name (e.g., Drake)"
          className="input-field"
        />
        <button onClick={handleSearchSongs} className="submit-button">
          Search Songs
        </button>
      </div>
      {loading && <p>Loading songs...</p>}
      <div className="results-container">
        {songs.length === 0 && !loading ? (
          <p>No songs found. Try entering another artist.</p>
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

export default SongsByArtist;

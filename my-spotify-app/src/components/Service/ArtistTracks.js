import React, { useState } from 'react';
import { fetchSongsByEmotion } from './SpotifyService';
import axios from 'axios';
import SavePlaylist from '../SavePlaylist/SavePlaylist';
import './Dashboard.css';

const ArtistTracks = () => {
  const [tracks, setTracks] = useState([]); // Tracks fetched based on emotion
  const [userInput, setUserInput] = useState(''); // User input for emotion analysis
  const [loading, setLoading] = useState(false); // Loading state
  const token = localStorage.getItem('spotifyAccessToken'); // Spotify access token
  const userId = localStorage.getItem('spotifyUserId'); // Spotify user ID

  const handleAnalyzeEmotion = async () => {
    if (!userInput) {
      alert('Please enter a prompt.');
      return;
    }

    setLoading(true);

    try {
      // Analyze user input to determine emotion
      const response = await axios.post('http://127.0.0.1:5000/analyze', { text: userInput });
      const emotion =
        response.data.input_type === 'single_sentence'
          ? response.data.emotion
          : response.data.overall_emotion;

      if (!token) {
        alert('No token found. Please log in.');
        return;
      }

      // Fetch songs matching the emotion
      const songs = await fetchSongsByEmotion(`Songs that make me feel ${emotion}`, token);
      setTracks(songs);
    } catch (error) {
      console.error('Error analyzing emotion or fetching songs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Sentimental Analysis Language Model via Spotify API</h1>
      <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter a prompt (e.g., 'I am feeling great today!')"
          className="input-field"
        />
        <button onClick={handleAnalyzeEmotion} className="submit-button">
          Analyze and Search
        </button>
      </div>
      {loading && <p>Loading songs...</p>}
      <div className="results-container">
        {tracks.length === 0 && !loading ? (
          <p>No songs found. Try entering another prompt.</p>
        ) : (
          <>
            <div className="scrollable-container">
              <div className="track-list">
                {tracks.map((track) => (
                  <div key={track.id} className="track-item">
                    <img
                      src={track.album.images[0]?.url}
                      alt={track.name}
                      className="track-album-cover"
                    />
                    <div className="track-info">
                      <h3 className="track-name">{track.name}</h3>
                      <p className="track-artist">
                        {track.artists.map((artist) => artist.name).join(', ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* SavePlaylist component for saving fetched tracks */}
            <SavePlaylist tracks={tracks} token={token} userId={userId} />
          </>
        )}
      </div>
    </div>
  );
};

export default ArtistTracks;

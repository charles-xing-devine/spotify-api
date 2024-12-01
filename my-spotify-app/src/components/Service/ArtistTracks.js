import React, { useState } from 'react';
import { fetchSongsByEmotion } from './SpotifyService';
import axios from 'axios';
import './Dashboard.css';

const ArtistTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [userInput, setUserInput] = useState(''); // User's input text
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('spotifyAccessToken');

  const handleAnalyzeEmotion = async () => {
    if (!userInput) {
      alert('Please enter a prompt.');
      return;
    }
  
    setLoading(true);
  
    try {
      // Call NLP API to analyze emotion
      const response = await axios.post('http://127.0.0.1:5000/analyze', { text: userInput });
      console.log('API Response:', response.data); // Log the entire API response
  
      // Determine the emotion key based on the response structure
      const emotion =
        response.data.input_type === 'single_sentence'
          ? response.data.emotion
          : response.data.overall_emotion;
  
      console.log('Emotion from NLP API:', emotion);
  
      if (!token) {
        alert('No token found. Please log in.');
        return;
      }
  
      // Fetch songs based on the analyzed emotion
      const songs = await fetchSongsByEmotion(`Songs that make me feel ${emotion}`, token);
      setTracks(songs);
    } catch (error) {
      console.error('Error analyzing emotion or fetching songs:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Sentimental Analysis Language Model via. Spotify API</h1>
      <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter a prompt (e.g., 'I am feeling great today!')"
          className="input-field"
        />
        <button onClick={handleAnalyzeEmotion} className="submit-button">Analyze and Search</button>
      </div>
      {loading && <p>Loading songs...</p>}
      <div className="results-container">
        {tracks.length === 0 && !loading ? (
          <p>No songs found. Try entering another prompt.</p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ArtistTracks;

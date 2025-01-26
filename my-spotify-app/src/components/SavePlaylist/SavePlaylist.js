import React, { useState } from 'react';
import { createPlaylist, addTracksToPlaylist } from '../Service/SpotifyService';
import './SavePlaylist.css'; // Import the updated CSS

const SavePlaylist = ({ tracks, token, userId }) => {
  const [playlistName, setPlaylistName] = useState('');
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSavePlaylist = async () => {
    if (!playlistName) {
      setErrorMessage('Please enter a playlist name.');
      return;
    }

    if (tracks.length === 0) {
      setErrorMessage('No tracks to save.');
      return;
    }

    setSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const playlist = await createPlaylist(token, userId, playlistName);
      const trackUris = tracks.map((track) => track.uri);
      await addTracksToPlaylist(token, playlist.id, trackUris);

      setSuccessMessage(`Playlist "${playlistName}" created successfully!`);
    } catch (error) {
      console.error('Error saving playlist:', error);
      setErrorMessage('Failed to save the playlist. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="save-playlist-container">
    <p className="playlist-instructions">
      Like the songs? Save them to your Spotify playlist below!
    </p>
    <div className="input-group">
      <input
        type="text"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        placeholder="Enter playlist name"
        className="input-field"
      />
      <button
        onClick={handleSavePlaylist}
        className="submit-button"
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save Playlist'}
      </button>
    </div>
    {errorMessage && <div className="alert alert-error">{errorMessage}</div>}
    {successMessage && (
      <div className="alert alert-success">{successMessage}</div>
    )}
  </div>
);
};

export default SavePlaylist;

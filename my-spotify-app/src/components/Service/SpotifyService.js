import axios from 'axios';

const BASE_URL = 'https://api.spotify.com/v1';

/**
 * Fetch songs based on an emotion (artist name used as a proxy for now).
 */
export const fetchSongsByEmotion = async (query, token) => {
  try {
    if (!query) {
      alert('Please enter a query.');
      return [];
    }

    if (!token) {
      throw new Error('Authorization token is missing.');
    }

    const searchResponse = await axios.get(`${BASE_URL}/search`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: query,
        type: 'track',
        limit: 50,
      },
    });

    const tracks = searchResponse.data.tracks.items;

    // Filter to include only unique artists
    const uniqueTracks = [];
    const artistIds = new Set();

    tracks.forEach((track) => {
      const primaryArtistId = track.artists[0]?.id; // Use the first artist in the track's artists array
      if (!artistIds.has(primaryArtistId)) {
        artistIds.add(primaryArtistId);
        uniqueTracks.push(track);
      }
    });

    return uniqueTracks;
  } catch (error) {
    console.error('Error fetching songs by emotion:', error.response?.data || error.message);
    return [];
  }
};

export const createPlaylist = async (accessToken, userId, playlistName) => {
  const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: playlistName,
      public: false,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create playlist');
  }

  return response.json(); // Returns playlist details
};

export const addTracksToPlaylist = async (accessToken, playlistId, trackUris) => {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uris: trackUris,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to add tracks to playlist');
  }

  return response.json();
};

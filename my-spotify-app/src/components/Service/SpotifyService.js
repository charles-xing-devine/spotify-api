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
import axios from 'axios';

const BASE_URL = 'https://api.spotify.com/v1';

/**
 * Fetch unique tracks by handling pagination and ensuring one song per artist.
 */
const requiredSongs = 50

const fetchUniqueTracks = async (url, token, desiredCount) => {
  const uniqueTracks = [];
  const artistIds = new Set();
  let nextUrl = url;

  try {
    while (uniqueTracks.length < desiredCount && nextUrl) {
      const response = await axios.get(nextUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const tracks = response.data.tracks?.items || response.data.items; // Handle both search and browse APIs
      tracks.forEach((track) => {
        const primaryArtistId = track.artists[0]?.id;
        if (!artistIds.has(primaryArtistId)) {
          artistIds.add(primaryArtistId);
          uniqueTracks.push(track);
        }
      });

      nextUrl = response.data.tracks?.next || response.data.next; // Move to the next page
    }

    return uniqueTracks;
  } catch (error) {
    console.error('Error fetching unique tracks:', error.message);
    return uniqueTracks; // Return what we have so far
  }
};

/**
 * Fetch songs based on an emotion (artist name used as a proxy for now).
 */
export const fetchSongsByEmotion = async (query, token, desiredCount = requiredSongs) => {
  if (!query) {
    alert('Please enter a query.');
    return [];
  }

  if (!token) {
    throw new Error('Authorization token is missing.');
  }

  const initialUrl = `${BASE_URL}/search?q=${encodeURIComponent(query)}&type=track&limit=50`;

  return await fetchUniqueTracks(initialUrl, token, desiredCount);
};

/**
 * Fetch songs similar to a given artist using Spotify's Search API.
 */
export const fetchSongsByArtist = async (artistName, accessToken, desiredCount = requiredSongs) => {
  const initialUrl = `${BASE_URL}/search?q=${encodeURIComponent('Songs that sound like ' + artistName)}&type=track&limit=50`;

  return await fetchUniqueTracks(initialUrl, accessToken, desiredCount);
};

/**
 * Fetch songs by genre using Spotify's Search API.
 */
export const fetchSongsByGenre = async (currentGenre, accessToken, desiredCount = requiredSongs) => {
  const targetGenre = currentGenre.toLowerCase() || 'rock'; // Default to rock if not found
  const initialUrl = `${BASE_URL}/search?q=genre:"${encodeURIComponent(targetGenre)}"&type=track&limit=50`;

  return await fetchUniqueTracks(initialUrl, accessToken, desiredCount);
};

/**
 * Create a Spotify playlist.
 */
export const createPlaylist = async (accessToken, userId, playlistName) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: playlistName,
        public: false,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Create Playlist Error:', errorDetails);
      throw new Error(`Failed to create playlist: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Create Playlist Error:', error.message);
    throw error;
  }
};

/**
 * Add tracks to a Spotify playlist.
 */
export const addTracksToPlaylist = async (accessToken, playlistId, trackUris) => {
  try {
    const response = await fetch(`${BASE_URL}/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: trackUris,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Add Tracks Error:', errorDetails);
      throw new Error(`Failed to add tracks to playlist: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Add Tracks Error:', error.message);
    throw error;
  }
};

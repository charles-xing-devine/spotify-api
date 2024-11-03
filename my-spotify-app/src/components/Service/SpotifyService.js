import axios from 'axios';

const BASE_URL = 'https://api.spotify.com/v1';

//adding optimized error handling

export const fetchTracksByArtist = async (artistName, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        q: artistName,
        type: 'track',
        limit: 50
      }
    });
    return response.data.tracks.items;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert("Your session has expired. Please log in again.");
    } else {
      console.error('Error fetching tracks by artist:', error);
    }
    return [];
  }
};


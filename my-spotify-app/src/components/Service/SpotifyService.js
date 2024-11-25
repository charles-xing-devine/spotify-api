import axios from 'axios';

const BASE_URL = 'https://api.spotify.com/v1';

// Fetch recommended tracks based on an artist
export const fetchRecommendationsByArtist = async (artistName, token) => {
  try {
    // Step 1: Search for the artist to get their ID
    const searchResponse = await axios.get(`${BASE_URL}/search`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        q: artistName,
        type: 'artist',
        limit: 1
      }
    });

    const artistId = searchResponse.data.artists.items[0]?.id;

    if (!artistId) {
      alert("Artist not found.");
      return [];
    }

    // Step 2: Use the artist's ID as a seed for recommendations
    const recommendationsResponse = await axios.get(`${BASE_URL}/recommendations`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        seed_artists: artistId,
        limit: 50
      }
    });

    return recommendationsResponse.data.tracks;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert("Your session has expired. Please log in again.");
    } else {
      console.error('Error fetching recommendations:', error);
    }
    return [];
  }
};
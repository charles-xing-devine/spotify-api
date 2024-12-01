const CLIENT_ID = '1d4b3733e4554c99a31987ea900702cd'; // Your client ID
const REDIRECT_URI = 'http://localhost:3000/callback'; // Your redirect URI
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPE =
  'user-read-private user-library-read user-top-read playlist-modify-public playlist-modify-private';

// Generates the Spotify Authorization URL
export const getAuthUrl = () => {
  return `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
};

// Extracts the token from the URL hash
export const getTokenFromUrl = () => {
  const hash = window.location.hash.substring(1); // Get everything after #
  const token = hash
    .split('&')
    .find((elem) => elem.startsWith('access_token'))
    ?.split('=')[1];

  window.location.hash = ''; // Clear the hash from URL for security
  return token;
};

// Initiates the Spotify login process
export const login = () => {
  window.location.href = getAuthUrl(); // Redirect to Spotify Auth URL
};

// Fetches user profile data using the access token
export const fetchUserProfile = async (token) => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const profile = await response.json(); // Parse response as JSON

    // Save the user ID to localStorage
    localStorage.setItem('spotifyUserId', profile.id); // Save userId
    return profile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};


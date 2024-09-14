const CLIENT_ID = '764e0602648144eeb78bb38a956d7824';
const REDIRECT_URI = 'http://localhost:3000/callback';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPE = 'user-library-read';  // Adjust the scope according to your needs

export const getAuthUrl = () => {
    return `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
  };
  
  export const getTokenFromUrl = () => {
    const hash = window.location.hash;
    window.location.hash = "";  // Clear hash after extraction to prevent security risks
    const token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token'))?.split('=')[1];
    return token;
  };
  
  export const login = () => {
    window.location.href = getAuthUrl();
  };
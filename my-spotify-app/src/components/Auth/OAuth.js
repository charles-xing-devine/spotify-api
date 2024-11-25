const CLIENT_ID = '764e0602648144eeb78bb38a956d7824';
//celeste : const CLIENT_ID = '7653be98ff5044428dd180104f730448';
const REDIRECT_URI = 'http://localhost:3000/callback'; // Ensure this is consistent
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPE = 'user-read-private user-library-read';



export const getAuthUrl = () => {
  return `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
};


export const getTokenFromUrl = () => {
  const hash = window.location.hash;
  
  window.location.hash = "";  // Clear hash for security
  const token = hash
    .substring(1)
    .split("&")
    .find(elem => elem.startsWith("access_token"))
    ?.split("=")[1];


    console.log("Parsed access token:", token); //debugging

    window.location.hash = ""; // Clear hash for security
  

  return token;
};

export const login = () => {
  window.location.href = getAuthUrl();  // brings user to auth
};

// Fetch the user profile with the access token
//also fixed some syntax
export const fetchUserProfile = async (token) => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

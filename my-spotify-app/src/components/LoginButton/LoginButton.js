//LoginButton.js


import React, { useState, useEffect } from 'react';
import { login, fetchUserProfile } from '../Auth/OAuth';
import { useNavigate } from 'react-router-dom';
import './LoginButton.css';

const LoginButton = () => {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('spotifyAccessToken'); //checking if our token is in our localStorage
  console.log("Token retrieved from localStorage for profile fetch:", token); // Log the token used


  useEffect(() => {
    if (token && !userProfile) {
      //fetch
      fetchUserProfile(token)
      .then(profile => {setUserProfile(profile);
      }).catch(err => {
        console.error('Error fetching user profile:', err);
      });
    }
  }, [token, userProfile]);

  //Redirect user to Spotify AUTH

  const handleLogin = () => {
    login();
  };



  const handleLogout = () => {
    localStorage.removeItem('spotifyAccessToken');
    setUserProfile(null);
    navigate('/'); //modified so it brings the user to the welcome :)
  };

  return (
    <div>
      {userProfile ? (
        <div>
          <img
            src={userProfile.images[0]?.url}
            alt="Spotify User"
            style={{ width: '50px', height: '50px', borderRadius: '50%', marginLeft: '10px', marginTop: '10px' }}
          />
          <p>Welcome, {userProfile.display_name}</p>
          <button onClick={handleLogout} className="btn-outline-spotify">Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin} className="btn-outline-spotify">Login</button>
      )}
    </div>
  );
};

export default LoginButton;

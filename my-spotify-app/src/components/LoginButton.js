// LoginButton.js
import React from 'react';
import { login } from './OAuth';

const LoginButton = () => {
  return (
    <button onClick={login}>Login with Spotify</button>
  );
};

export default LoginButton;
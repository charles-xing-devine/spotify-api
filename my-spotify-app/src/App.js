// App.js
import React, { useEffect } from 'react';
import { getTokenFromUrl } from './components/OAuth';
import LoginButton from './components/LoginButton';

function App() {
  useEffect(() => {
    const token = getTokenFromUrl();
    if (token) {
      localStorage.setItem('token', token);
      // Redirect or perform further actions after successful login
    }
  }, []);

  return (
    <div>
      <LoginButton />

    </div>
  );
}

export default App;
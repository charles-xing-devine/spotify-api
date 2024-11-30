// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainApp from './MainApp'; // Import the new MainApp component

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;

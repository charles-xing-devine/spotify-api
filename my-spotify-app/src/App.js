// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import Homepage from './components/Homepage/Homepage';
import MainApp from './MainApp'; // Import the new MainApp component

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;

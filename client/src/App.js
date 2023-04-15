import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landingpage/Landingpage';
import Impressum from './components/Impressum/Impressum';
import DataPrivacy from './components/DataPrivacy/DataPrivacy';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/CO2Rechner" element={<LandingPage />} />
        <Route path="/Dashboard" element={<LandingPage />} />
        <Route path="/datenschutz" element={<DataPrivacy />} />
        <Route path="/impressum" element={<Impressum />} />
      </Routes>
    </Router>
  );
}

export default App;
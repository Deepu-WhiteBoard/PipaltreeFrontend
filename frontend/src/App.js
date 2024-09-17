import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import CohortSummary from './pages/CohortSummary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/landing" element= {<LandingPage />} />
        <Route path="/cohortsummary" element= {<CohortSummary />} />
      </Routes>
    </Router>
  );
}

export default App;

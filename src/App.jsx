import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// Styles import
import './assets/styles/NavStyle.css';
import './assets/styles/LandingPageStyle.css';
import './assets/styles/HomePageStyle.css';
import './assets/styles/RegistrationPageStyle.css';
import './assets/styles/SignInPageStyle.css';
import './assets/styles/ProfilePageStyle.css';
import './assets/styles/SearchBarStyle.css';
import './assets/styles/NetworkPageStyle.css';
import './assets/styles/ProfileButtonStyle.css';
import './assets/styles/PostCardStyle.css';
import './assets/styles/ToolboxPageStyle.css';
import './assets/styles/FooterStyle.css';

import LandingPage from './pages/LandingPage.jsx';
import HomePage from "./pages/HomePage.jsx";
import RegistrationPage from './pages/RegistrationPage';
import SignInPage from './pages/SignInPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import NetworkPage from './pages/NetworkPage.jsx';
import ToolboxPage from './pages/ToolboxPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/:userid" element={<HomePage />} />
        <Route path="/:userid/profile" element={<ProfilePage />} />
        <Route path="/:userid/network" element={<NetworkPage />} />
        <Route path="/:userid/toolbox" element={<ToolboxPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../src/App.jsx';
import './assets/styles/NavStyle.css';
import './assets/styles/HomePageStyle.css';
import './assets/styles/RegistrationPageStyle.css';
import './assets/styles/SignInPageStyle.css';
// import './assets/styles/ProfilePageStyle.css';
import './assets/styles/FooterStyle.css';
import './assets/styles/SearchBarStyle.css';

import Nav from "./components/Nav";
import HomePage from "./pages/HomePage.jsx";
import RegistrationPage from './pages/RegistrationPage';
import SignInPage from './pages/SignInPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

function App() {
  return (
    <Router>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/network" element={<ProfilePage />} />
          <Route path="/toolbox" element={<ProfilePage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

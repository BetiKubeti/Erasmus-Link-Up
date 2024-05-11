import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import '../src/App.jsx'

import Nav from "./components/Nav";
import HomePage from "./pages/HomePage.jsx";
import RegistrationPage from './pages/RegistrationPage';
import SignInPage from './pages/SignInPage.jsx';
import SignUpLogInPage from './pages/SignUpLogInPage.jsx';
import DiscoverCompanies from './pages/DiscoverCompanies.jsx'
import CompaniesCategoryPage from './pages/CompaniesCategoryPage.jsx'
import ProfilePage from './pages/ProfiePage.jsx'

function App() {

  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/enterprofile" element={<SignUpLogInPage />} />
          <Route path="/discover-companies" element={<DiscoverCompanies />} />
          <Route path="/companies-category/:category" element={<CompaniesCategoryPage />} />
          <Route path="/companies-category/:category/:subcategories" element={<CompaniesCategoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { NavLink, useLocation } from 'react-router-dom';

import SearchBar from '../components/SearchBar'
import ProfileButton from './ProfileButton';

// Navigation bar component
const Nav = () => {
    // Get the user and loading state from Firebase authentication
    const [user] = useAuthState(auth);
    // Get the current location using useLocation
    const location = useLocation();

    // Render the navigation bar
    return (
        <nav>
            {/* Container for the navigation bar */}
            <div className='nav-container'>
                {/* Logo section with a link to the home page */}
                <div className='logo'>
                    <NavLink to="/">
                        <span>Collabo</span>Green
                    </NavLink>
                </div>
                <div className="banner-search-bar">
                    {/* Container for the search bar */}
                    <SearchBar />
                </div>
                {/* Contents section with navigation links */}
                <div className='contents'>
                    {/* Home link with active class based on the current location */}
                    <NavLink to="/" className={location.pathname === '/' ? 'active-navbar-link' : ''}>Home</NavLink>
                    {/* Discover Businesses link with active class based on the current location */}
                    <NavLink to="/" className={location.pathname === '/' ? 'active-navbar-link' : ''}>Discover Businesses</NavLink>
                    {/* Render ProfileButton when the user is signed in */}
                    {user && <ProfileButton />}
                    {/* Render SignUpLogInButton when the user is not signed in */}
                    {!user && (
                        <NavLink to="/">
                            <span>Sign Up</span>
                            <span>Log In</span>
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Nav;

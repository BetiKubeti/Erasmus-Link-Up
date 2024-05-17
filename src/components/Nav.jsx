import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { NavLink, useLocation } from 'react-router-dom';

// Components imports
import SearchBar from '../components/SearchBar'
import ProfileButton from './ProfileButton';

// Image imports
import Logo from '../assets/images/Logo.png';

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
                <div className='logo-container'>
                    <div className='logo'>
                        <NavLink to={`/${user?.uid}`}>
                            <img src={Logo} alt="Erasmus Link Up Logo" />
                        </NavLink>
                    </div>
                    <div className="banner-search-bar">
                        {/* Container for the search bar */}
                        <SearchBar />
                    </div>
                </div>
                {/* Contents section with navigation links */}
                <div className='contents'>
                    {/* Home link with active class based on the current location */}
                    <NavLink to={`/${user?.uid}`} className={location.pathname === `/${user?.uid}` ? 'active-navbar-link' : 'nav-link'}>Home</NavLink>
                    {/* Discover Businesses link with active class based on the current location */}
                    <NavLink to={`/${user?.uid}/network`} className={location.pathname === `/${user?.uid}/network` ? 'active-navbar-link' : 'nav-link'}>Network</NavLink>
                    <NavLink to={`/${user?.uid}/toolbox`} className={location.pathname === `/${user?.uid}/toolbox` ? 'active-navbar-link' : 'nav-link'}>ToolBox</NavLink>
                    {/* Render ProfileButton when the user is signed in */}
                    <ProfileButton />
                </div>
            </div>
        </nav>
    );
};

export default Nav;
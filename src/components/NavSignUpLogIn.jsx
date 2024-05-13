import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { NavLink, useLocation } from 'react-router-dom';

// Image imports
import Logo from '../assets/images/Logo.png';

// Navigation bar component
const NavSignUpLogIn = () => {

    // Render the navigation bar
    return (
        <nav>
            {/* Container for the navigation bar */}
            <div className='nav-signup-login-container'>
                {/* Logo section with a link to the home page */}
                <div className='logo-container'>
                    <div className='logo'>
                        <NavLink to="/">
                            <img src={Logo} alt="Erasmus Link Up Logo" />
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavSignUpLogIn;

import React from 'react'; 
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Image imports
import Logo from '../assets/images/Logo.png';

const FooterSignUpLogIn = () => {

    // Footer component
    return (
        <footer className='footer-signup-login'>
            <div className='footer-container'>
                <div className='footer-column'>
                    <div className='logo-container'>
                        <div className='logo'>
                            <NavLink to="/">
                                <img src={Logo} alt="Erasmus Link Up Logo" />
                            </NavLink>
                        </div>
                    </div>
                    <p className='copyright-text' >&copy; 2024 ErasmusLinkUp All Rights Reserved </p>
                </div>
                <div className='footer-column'>
                    <a href="">About</a>
                    <a href="">Help</a>
                    <a href="">More</a>
                </div>
                <div className='footer-column'>
                    <a href="">Privacy Policy</a>
                    <a href="">Copyright Policy</a>
                    <a href="">Cookies Policy</a>
                </div>
                <div className='footer-column'>
                    <p className='media-subtitle'>Get to know us:</p>
                    <a href=""><Icon icon="brandico:facebook-rect" style={{ color:'#034EA2' }} /></a>
                    <a href=""><Icon icon="skill-icons:instagram" /></a>
                </div>
            </div>
        </footer>
    );
}

export default FooterSignUpLogIn;
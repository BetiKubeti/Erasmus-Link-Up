import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Image imports
import Logo from '../assets/images/Logo.png';

export default function Footer() {
    return (
        <footer className='footer-home-page'>
            <div className='footer-container'>
                <div className='links-area'>
                    <div className='footer-area'>
                        <a href="">About</a>
                        <a href="">Copyright Policy</a>
                        <a href="">More</a>
                    </div>
                    <div className='footer-area'>
                        <a href="">Privacy Policy</a>
                        <a href="">Cookies Policy</a>
                    </div>
                    <div className='footer-area'>
                        <a href="">Help</a>
                        <div className='media-area'>
                            <p>Get to know us:</p>
                            <a href=""><Icon icon="brandico:facebook-rect" style={{ color: '#034EA2' }} /></a>
                            <a href=""><Icon icon="skill-icons:instagram" /></a>
                        </div>
                    </div>
                </div>
                <div className='logo-area'>
                    <div className='logo-container'>
                        <div className='logo'>
                            <NavLink to="/">
                                <img src={Logo} alt="Erasmus Link Up Logo" />
                            </NavLink>
                        </div>
                    </div>
                    <p>&copy; 2024 All Rights Reserved ErasmusLinkUp</p>
                </div>
            </div>
        </footer>
    );
}
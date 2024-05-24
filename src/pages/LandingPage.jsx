import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase';
import { getDoc, doc, collection, getDocs } from 'firebase/firestore';
import { Icon } from '@iconify/react';

// Components
import Footer from '../components/FooterSignUpLogIn';
import Nav from "../components/NavSignUpLogIn";

// Image import
import LandingPageImage from '../assets/images/landing-page-image.png';

export default function LandingPage() {

    return (
        <>
            <Nav />
            <div className='landingpage-container'>
                <section className="register-container" id="register-container">
                    <h2>Welcome to your Erasmus community</h2>
                    <button className='button'><Icon icon="flat-color-icons:google" /><span>Continue with Google</span></button>
                    <p>
                        By choosing to continue, you agree to ErasmusLinkUp <a href="">Copyright Policy</a>, <a href="">Privacy Policy</a> and <a href="">Cookies Policy</a>. 
                    </p>
                    <div className='or-text-wrap'>
                        <div className='horizontal-line'></div>
                        <div>or</div>
                        <div className='horizontal-line'></div>
                    </div>
                    <a href='/signup' className='button'><span>Sign Up</span></a>
                    <a href='/login' className='button'><span>Log In</span></a>
                </section>

                <section className='image-container' id='image-container'>
                    <img src={LandingPageImage} alt="Landing Page Image" className='landing-page-image' />
                </section>
            </div>
            <Footer />
        </>
    );
}

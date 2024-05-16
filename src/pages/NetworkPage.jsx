import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Image imports
import Logo from '../assets/images/Logo.png';

// Components import
import Nav from '../components/Nav';
import Footer from '../components/FooterSignUpLogIn';

export default function NetworkPage() {
    return (
        <>
            <Nav />

            <section className='people-cards'>

            </section>

            <section className='companies-cards'>

            </section>

            <Footer />
        </>
    );
}
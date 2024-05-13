import React from 'react'; // Import React module
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

// Components imports
import SearchBar from '../components/SearchBar'
import Footer from '../components/Footer'

import Nav from "../components/Nav";
export default function HomePage() {
    // This is the functional component for the HomePage

    const [user] = useAuthState(auth);

    return (
        <>
            <Nav />
            <section className="banner" id="banner">
                {/* The main section with a 'banner' class and 'banner' id */}
                <div className="banner-container">
                    {/* The container for banner content */}
                    <div className="banner-content-container">
                        {/* Container for the content within the banner */}
                        <div className="banner-text">
                            {/* Container for the banner text */}
                            {/* Text content within the banner */}
                        </div>
                    </div>
                </div>
            </section>

            

            <Footer />
        </>
    );
}

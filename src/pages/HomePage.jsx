import React from 'react'; // Import React module
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

// Components imports
import SearchBar from '../components/SearchBar'
import Footer from '../components/Footer'

export default function HomePage() {
    // This is the functional component for the HomePage

    const [user] = useAuthState(auth);

    return (
        <>
            <section className="banner" id="banner">
                {/* The main section with a 'banner' class and 'banner' id */}
                <div className="banner-container">
                    {/* The container for banner content */}
                    <div className="banner-content-container">
                        {/* Container for the content within the banner */}
                        <div className="banner-text">
                            {/* Container for the banner text */}
                            <p>Discover businesses and <span>collaborate</span>.</p>
                            <p>Read and write reviews. Keep in mind <span>sustainability</span>.</p>
                            {/* Text content within the banner */}
                        </div>
                        <div className="banner-search-bar">
                            {/* Container for the search bar */}
                            <SearchBar />
                            {/* Include the SearchBar component here */}
                        </div>
                    </div>
                </div>
            </section>

            

            <Footer />
        </>
    );
}

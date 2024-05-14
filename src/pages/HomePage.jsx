import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Icon } from '@iconify/react';

// Components imports
import Footer from '../components/Footer'
import Nav from "../components/Nav";


export default function HomePage() {
    // This is the functional component for the HomePage

    const [user] = useAuthState(auth);

    return (
        <>
            <Nav />
            <div className='homepage-container'>

                <section className="profile" id="profile">

                    <div className='current-profile-card'>
                        <div className='profile-picture'></div>
                        <div className='profile-name'>Elizabet Aleksieva</div>
                        <a href="">view profile</a>
                        <div className='followers-container'>
                            <div className='followers'>
                                <p>Followers:</p>
                                <p>56</p>
                            </div>
                            <div className='following'>
                                <p>Following:</p>
                                <p>67</p>
                            </div>
                        </div>
                        <div className='saved-items'><a href=""><Icon icon="mdi:favorite-box-outline" /> Saved items</a></div>
                    </div>

                    <div className='other-profiles-card'>

                    </div>

                </section>

                <section className='infinite-scroll' id='infinite-scroll'>

                    <div className='feed-card'>
                        
                    </div>

                </section>

                <section className='recommendations' id='recommendations'>

                    <div className='add-to-your-feed-card'>

                    </div>

                    <Footer />

                </section>

            </div>

        </>
    );
}

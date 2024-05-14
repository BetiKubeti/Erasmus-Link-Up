import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase'; // Make sure to import firestore
import { doc, getDoc } from 'firebase/firestore';
import { Icon } from '@iconify/react';

import DefaultProfileImage from '../assets/images/default-profile-image.jpg';

// Components imports
import Footer from '../components/Footer';
import Nav from "../components/Nav";

export default function HomePage() {
    const [user] = useAuthState(auth);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user) {
                const userDocRef = doc(firestore, 'users', user.uid);
                const userSnap = await getDoc(userDocRef);

                if (userSnap.exists()) {
                    setProfileData(userSnap.data());
                } else {
                    console.log("No such document!");
                }
            }
        };

        fetchUserProfile();
    }, [user]);

    return (
        <>
            <Nav />
            <div className='homepage-container'>

                <section className="profile" id="profile">

                    <div className='current-profile-card'>
                        {/* Display the profile picture */}
                        <div className='profile-picture'>
                            <img src={profileData?.profileImageURL || DefaultProfileImage } alt="Profile"  />
                        </div>
                        <div className='profile-name'>{profileData?.name}</div>
                        <a className='view-profile-button' href="">view profile</a>
                        <div className='followers-container'>
                            <div className='followers'>
                                <p>Followers:</p>
                                <p className='number-of-followers'>56</p>
                            </div>
                            <div className='following'>
                                <p>Following:</p>
                                <p className='number-of-following'>67</p>
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
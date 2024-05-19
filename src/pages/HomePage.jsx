import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase'; 
import { getDoc, doc} from 'firebase/firestore';
import { Icon } from '@iconify/react';

// Image import
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';

// Components imports
import Footer from '../components/Footer';
import Nav from "../components/Nav";
import OtherProfilesCard from '../components/OtherProfilesCard';
import AddToYourFeedCard from '../components/AddToYourFeedCard';

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
                            <img src={profileData?.profileImageURL || DefaultProfileImage } alt="Profile" />
                        </div>
                        <div className='profile-name'>{profileData?.name}</div>
                        <a className='view-profile-button' href={`/${user?.uid}/profile`}>view profile</a>
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
                        <a href="" className='saved-items-button'><Icon icon="mdi:favorite-box-outline" /> <span>Saved items</span></a>
                    </div>

                    <OtherProfilesCard />

                </section>

                <section className='infinite-scroll' id='infinite-scroll'>

                    <div className='feed-card'>

                    </div>

                </section>

                <section className='recommendations' id='recommendations'>

                    <AddToYourFeedCard />

                    <Footer />

                </section>

            </div>
            
        </>
    );
}
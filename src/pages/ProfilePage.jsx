import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { Icon } from '@iconify/react';

// Image import
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';

// Components imports
import Footer from '../components/FooterSignUpLogIn';
import Nav from "../components/Nav";
import OtherProfilesCard from '../components/OtherProfilesCard';
import AddToYourFeedCard from '../components/AddToYourFeedCard';

export default function ProfilePage() {
    const [user] = useAuthState(auth);
    const [profileData, setProfileData] = useState(null);

    return (
        <>
            <Nav />
            <div className='profilepage-container'>

                <section className="profiles" id="profiles">

                    <OtherProfilesCard />

                </section>

                <section className='profile-scroll' id='profile-scroll'>

                    <div className='profile-top-section-card'>
                        <div className='info-section'>
                            <div className='profile-picture'>
                                <img src={profileData?.profileImageURL || DefaultProfileImage} alt="Profile" />
                            </div>
                            <div className='general-info'>
                                <div className='name-contact-section'>

                                    <div className='name-and-edit-section'>
                                        <h3 className='profile-name'>{user?.displayName}</h3>
                                        <div className='buttons-container'>
                                            <button className='saved-items-button'><Icon icon="mdi:favorite-box-outline" /> <span>Saved items</span></button>
                                            <button className='edit-profile-button'><Icon icon="tdesign:edit" /> <span>Edit profile</span></button>
                                        </div>
                                    </div>

                                    <a href="" className='view-contact-information-button'>View contact information</a>

                                </div>

                                <div className='number-of-followers-section'>
                                    <p>15 posts</p>
                                    <p>32 followers</p>
                                    <p>17 following</p>
                                </div>
                            </div>
                        </div>

                        <div className='profile-update-recommendations'>
                            <div className='recommendation-container'>
                                <div className='text'>
                                    <p>
                                        Share that you're looking for free trip deals with various educational options.
                                    </p>
                                    <a href="">Get started now!</a>
                                </div>
                                <Icon icon="carbon:close-filled" />
                            </div>

                            <div className='recommendation-container'>
                                <div className='text'>
                                    <p>
                                        Share that you're looking for applicants to join your traveling opportunities.
                                    </p>
                                    <a href="">Get started now!</a>
                                </div>
                                <Icon icon="carbon:close-filled" />
                            </div>
                        </div>
                    </div>

                    <div className='statistics-card'>

                    </div>

                </section>

                <section className='recommendations' id='recommendations'>

                    <AddToYourFeedCard />

                    

                </section>
                
            </div>
            <Footer /> 
        </>
    );
}
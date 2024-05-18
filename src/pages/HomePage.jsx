import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase'; 
import { collection, query, getDocs, getDoc, doc, orderBy, limit, where } from 'firebase/firestore';
import { Icon } from '@iconify/react';

// Image import
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';

// Components imports
import Footer from '../components/Footer';
import Nav from "../components/Nav";

export default function HomePage() {
    const [user] = useAuthState(auth);
    const [profileData, setProfileData] = useState(null);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        const fetchRecommendedUsersToFollow = async () => {
            try {
                const usersCollection = collection(firestore, 'users');
                const querySnapshot = await getDocs(usersCollection);
                const allUsers = querySnapshot.docs.map(doc => doc.data());
                const currentUserUid = user ? user.uid : null;

                // Filter out the current user
                const otherUsers = allUsers.filter(userObj => userObj.uid !== currentUserUid);

                // Shuffle the entire list of users
                const shuffledUsers = otherUsers.sort(() => Math.random() - 0.5).slice(0, 3);

                // Assuming you want to store the result in a single state variable
                setUsers(shuffledUsers);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching recommended users: ", error);
            }
        };

        fetchRecommendedUsersToFollow();
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
                        <a href="" className='saved-items-button'><Icon icon="mdi:favorite-box-outline" /> <span>Saved items</span></a>
                    </div>

                    <div className='other-profiles-card'>
                        <div className='title'>Accounts:</div>
                        <div className='other-profiles-container'>
                            <div className='other-profile'>
                                <div className='other-profile-image'><img src={profileData?.profileImageURL || DefaultProfileImage} alt="Profile" /></div>
                                <p className='name'>The Nordic Crew</p>
                            </div>
                        </div>
                        <a href="" className='add-account-button'><Icon icon="icon-park-outline:add" /> <span>Add account</span></a>
                    </div>

                </section>

                <section className='infinite-scroll' id='infinite-scroll'>

                    <div className='feed-card'>

                    </div>

                </section>

                <section className='recommendations' id='recommendations'>

                    <div className='add-to-your-feed-card'>
                        <div className='title'>Add to your feed: <Icon icon="tabler:info-square" /></div>
                        <div className='person-to-follow'>
                            {users.map((user, index) => (
                                <div key={index} className='person'>
                                    <div className='person-image-name-container'>
                                        <div className='person-to-follow-image'><img src={user.profileImageURL || DefaultProfileImage} alt="Profile" /></div>
                                        <p className='name'>{user.name}</p> {/* Updated line */}
                                    </div>
                                    <a href="" className='follow-button'><Icon icon="icon-park-outline:add" /> <span>Follow</span></a>
                                </div>
                            ))}
                        </div>
                        <div className='view-all-recommendations'><a href="">View all recommendations <Icon icon="typcn:arrow-right" /></a></div>
                    </div>

                    <Footer />

                </section>

            </div>
            
        </>
    );
}
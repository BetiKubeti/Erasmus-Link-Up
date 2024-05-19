import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Icon } from '@iconify/react';

// Image import
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';

// Components imports
import Footer from '../components/Footer';
import Nav from "../components/Nav";
import OtherProfilesCard from '../components/OtherProfilesCard';

export default function HomePage() {
    const [user] = useAuthState(auth);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

        </>
    );
}
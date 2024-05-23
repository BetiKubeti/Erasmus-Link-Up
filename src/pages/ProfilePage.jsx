import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase';
import { getDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import { Icon } from '@iconify/react';

// Image import
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';

// Components imports
import Footer from '../components/FooterSignUpLogIn';
import Nav from "../components/Nav";
import OtherProfilesCard from '../components/OtherProfilesCard';
import AddToYourFeedCard from '../components/AddToYourFeedCard';
import EditProfileInformationModal from '../components/EditProfileInformationModal';
import CreatePostModal from '../components/CreatePostModal';
import PostCard from '../components/ProfilePagePostCard';
import TripPreferencesModal from '../components/TripPreferencesModal';

export default function ProfilePage() {
    const [user] = useAuthState(auth);
    const [profileData, setProfileData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('my-posts');
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
    const [isTripPreferencesModalOpen, setIsTripPreferencesModalOpen] = useState(false);
    const [tripPreference, setTripPreference] = useState('notListed');
    const [posts, setPosts] = useState([]);

    // Fetch user profile info
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

    // Fetch user posts
    useEffect(() => {
        const fetchUserPosts = async () => {
            if (user) {
                const postsCollectionRef = collection(firestore, 'posts');
                const q = query(postsCollectionRef, where('createdBy', '==', user.uid));
                const querySnapshot = await getDocs(q);

                const fetchedPosts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPosts(fetchedPosts);
            }
        };

        fetchUserPosts();
    }, [user]);

    // Handle preference change
    const handlePreferenceChange = (newPreference) => {
        setTripPreference(newPreference);
        console.log('Preference saved:', newPreference);  // Add logic to save preference if needed
    };

    const handleMyPostsClick = () => {
        setSelectedCategory('my-posts');
    };

    const handleMyToolboxesClick = () => {
        setSelectedCategory('my-toolboxes');
    };

    const handleSavedItemsClick = () => {
        setSelectedCategory('saved-items');
    };

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
                                        <h3 className='profile-name'>{profileData?.name}</h3>
                                        <div className='buttons-container'>
                                            <button className='edit-profile-button' onClick={() => setIsEditProfileModalOpen(true)}><Icon icon="tdesign:edit" /> <span>Edit profile</span></button>
                                        </div>
                                        {isEditProfileModalOpen && (
                                            <EditProfileInformationModal onClose={() => setIsEditProfileModalOpen(false)} onPreferenceChange={handlePreferenceChange} />
                                        )}
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
                                    <button className='get-started-now-button' onClick={() => setIsTripPreferencesModalOpen(true)}>Get started now!</button>
                                </div>
                                {isTripPreferencesModalOpen && <TripPreferencesModal initialPreference={tripPreference} onClose={() => setIsTripPreferencesModalOpen(false)} onPreferenceChange={handlePreferenceChange} />}
                            </div>
                            <div className='recommendation-container'>
                                <div className='text'>
                                    <p>
                                        Share that you're looking for applicants to join your traveling opportunities.
                                    </p>
                                    <button href="" className='get-started-now-button'>Get started now!</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='statistics-card'>
                        <div className='title-container'>
                            <div className='title'>
                                <h2>Statistics:</h2>
                                <Icon icon="tabler:info-square" />
                            </div>
                            <p className='subtitle'>Private to you</p>
                        </div>
                        <div className='profile-statistics'>
                            <div className='statistics-container'>
                                <Icon icon="bi:people-fill" />
                                <div className='text'>
                                    <h4>20 profile views</h4>
                                    <p>This statistic reflects how many users have opened and seen your profile in the previous month.</p>
                                </div>
                            </div>
                            <div className='statistics-container'>
                                <Icon icon="gg:search" />
                                <div className='text'>
                                    <h4>17 search appearances</h4>
                                    <p>This statistic reflects how your profile appeared in other users search results.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='activity-card'>
                        <div className='title-container'>
                            <h2>Activity:</h2>
                            <div className='buttons-container'>
                                <button onClick={() => setIsCreatePostModalOpen(true)}><span>Create a post</span></button>
                                <button><span>Upload a toolbox</span></button>
                            </div>
                        </div>
                        <div className='categories-to-view-container'>
                            <div className='subtitle-container'>
                                <p>Choose which category you want to view:</p>
                            </div>
                            <div className='buttons-container'>
                                <button
                                    className={`my-posts-button ${selectedCategory === 'my-posts' ? 'active-button' : ''}`}
                                    onClick={handleMyPostsClick}
                                >
                                    <Icon icon="bi:postcard-heart" /> <span>My Posts</span>
                                </button>
                                <button
                                    className={`my-toolboxes-button ${selectedCategory === 'my-toolboxes' ? 'active-button' : ''}`}
                                    onClick={handleMyToolboxesClick}
                                >
                                    <Icon icon="fluent:toolbox-12-filled" /> <span>My toolboxes</span>
                                </button>
                                <button
                                    className={`saved-items-button ${selectedCategory === 'saved-items' ? 'active-button' : ''}`}
                                    onClick={handleSavedItemsClick}
                                >
                                    <Icon icon="mdi:favorite-box-outline" /> <span>Saved items</span>
                                </button>
                            </div>
                        </div>

                        <div className='content-container'>
                            {selectedCategory === 'my-posts' && (
                                posts.length > 0 ? (
                                    posts.map(post => (
                                        <PostCard key={post.id} post={post} />
                                    ))
                                ) : (
                                    <div className='no-content'>
                                        <p>You have not uploaded any posts yet.</p>
                                        <button onClick={() => setIsCreatePostModalOpen(true)}><span>Create your first Post Now!</span></button>
                                    </div>
                                )
                            )}
                            {selectedCategory === 'my-toolboxes' && <div>You don't have any toolboxes yet.</div>}
                            {selectedCategory === 'saved-items' && <div>You don't have any saved items yet.</div>}
                        </div>
                    </div>
                    {isCreatePostModalOpen && (
                        <CreatePostModal
                            onClose={() => setIsCreatePostModalOpen(false)}
                            initialProfileData={profileData}
                            oldProfileImageURL={profileData?.profileImageURL || DefaultProfileImage}
                        />
                    )}
                </section>

                <section className='recommendations' id='recommendations'>
                    <AddToYourFeedCard />
                </section>
            </div>
            <Footer />
        </>
    );
}

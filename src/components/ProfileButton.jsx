import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import { collection, getDocs, deleteDoc, query, where } from 'firebase/firestore';
import { Icon } from '@iconify/react';

// Image import
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';

// ProfileButton component
export default function ProfileButton() {

    const [user] = useAuthState(auth);

    const [profileData, setProfileData] = useState(null);

    // State for dropdown visibility
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isUserLoggingOut, setIsUserLoggingOut] = useState(false);
    const [isSettingsAndPrivacyOpen, setIsSettingsAndPrivacyOpen] = useState(false);
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

    // Hook for navigating to different routes
    const navigate = useNavigate();

    // Log out function
    const handleLogOut = async () => {
        try {
            await auth.signOut();
            // Navigate to the home page after logout
            navigate('/login');
        } catch (error) {
            console.error('Log out error:', error);
        }
    };
    
    // Confirm account deletion function
    const confirmDeleteAccount = async () => {
        const user = auth.currentUser;

        // Get the user's email
        const userEmail = user.email;

        try {
            // Delete the user account
            await user.delete();

            // Query for the document with the matching email in the 'companies' collection
            const companyRef = collection(firestore, 'users');
            const companyQuery = query(companyRef, where('email', '==', userEmail));
            const querySnapshot = await getDocs(companyQuery);

            // If the document exists, delete it
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                await deleteDoc(doc.ref);
            }

            // User and company data deleted, navigate to the home page
            navigate('/');
        } catch (error) {
            console.error('Delete account error:', error);
        }
    };

    // Cancel delete account function
    const cancelDeleteAccount = () => {
        setDeleteConfirmationOpen(false);
    };

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const closeProfileDropdown = () => {
        setDropdownOpen(false);
        setIsUserLoggingOut(false);
        setIsSettingsAndPrivacyOpen(false);
    };

    // Toggle user logout

    const toggleUserLogout = () => {
        setDropdownOpen(false);
        setIsUserLoggingOut(!isUserLoggingOut);
    }

    const goBackFromLogoutQuestion = () => {
        setIsUserLoggingOut(false);
        setDropdownOpen(!isDropdownOpen)
    }

    // Toggle settings and privacy dropdown
    
    const toggleSettingsAndPrivacy = () => {
        setDropdownOpen(false);
        setIsSettingsAndPrivacyOpen(!isSettingsAndPrivacyOpen);
    }

    const goBackFromSettingsAndPrivacy = () => {
        setIsSettingsAndPrivacyOpen(false);
        setDropdownOpen(!isDropdownOpen)
    }

    // Close dropdown when clicking outside
    const handleDocumentClick = (event) => {
        if (isDropdownOpen && !event.target.closest("#profileButton")) {
            setDropdownOpen(false);
        }
    };

    // Add event listener to handle clicks outside the dropdown
    React.useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
        // Remove event listener on component unmount
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    // Render the ProfileButton component
    return (
        <div style={{ position: 'relative' }}>
            <div className="profile-button" id="profileButton">
                {/* Toggle button for the dropdown */}
                <div className='profile-button-toggle' id="profileButtonToggle" onClick={toggleDropdown}>
                    <img src={profileData?.profileImageURL || DefaultProfileImage} alt="Profile" />
                </div>
                {/* Dropdown content */}
                {isDropdownOpen && (
                    <div className="profile-dropdown" id="profile-dropdown">
                        <div className="dropdown-content">
                            <div className='title-container'>
                                <div className='profile-name-container'>
                                    <h2 className='profile-name'>{user?.displayName}</h2>
                                    <Icon icon="carbon:close-filled" onClick={closeProfileDropdown}/>
                                </div>
                                <a href="" className='view-all-profiles-button'>see all profiles</a>
                            </div>
                            <div className='profile-dropdown-buttons-container'>
                                <NavLink className='dropdown-button' id='dropdown-button' to={`/${user?.uid}/profile`} onClick={() => setDropdownOpen(false)}><Icon icon="bi:person-fill" /> View Profile</NavLink>
                                <button className='dropdown-button' id='dropdown-button' onClick={toggleSettingsAndPrivacy}><Icon icon="solar:settings-bold" /> Settings & Privacy</button>
                                <NavLink className='dropdown-button' id='dropdown-button' to={`/${user?.uid}`} onClick={() => setDropdownOpen(false)}><Icon icon="material-symbols:help" /> Help Center</NavLink>
                                <button className='dropdown-button' id='dropdown-button' onClick={handleLogOut}><Icon icon="material-symbols:feedback-outline-rounded" /> Give a feedback</button>
                                <button className='dropdown-button' id='dropdown-button' onClick={toggleUserLogout}><Icon icon="ic:round-log-out" /> Log Out</button>
                            </div>
                        </div>
                    </div>
                )}

                {isUserLoggingOut && (
                    <div className="logout-dropdown" id="logout-dropdown">
                        <div className="dropdown-content">
                            <div className='title-container'>
                                <div className='go-back-container'>
                                    <Icon icon="typcn:arrow-left" onClick={goBackFromLogoutQuestion} />
                                    <h2 className='profile-name'>Log Out</h2>
                                </div>
                                <Icon icon="carbon:close-filled" onClick={closeProfileDropdown} />
                            </div>
                            <div className='logout-question'>
                                <p><b>{user?.displayName}</b>, are you sure that you want to Log out from your ErasmusLinkUp profile?</p>
                            </div>
                            <div className='profile-dropdown-buttons-container'>
                                <button className='dropdown-button' id='dropdown-button' onClick={handleLogOut}><span>Continue Log Out</span></button>
                            </div>
                        </div>
                    </div>
                )}

                {isSettingsAndPrivacyOpen && (
                    <div className="settings-and-privacy-dropdown" id="settings-and-privacy-dropdown">
                        <div className="dropdown-content">
                            <div className='title-container'>
                                <div className='go-back-container'>
                                    <Icon icon="typcn:arrow-left" onClick={goBackFromSettingsAndPrivacy} />
                                    <h2 className='profile-name'>Settings & Privacy</h2>
                                </div>
                                <Icon icon="carbon:close-filled" onClick={closeProfileDropdown} />
                            </div>
                            <div className='profile-dropdown-buttons-container'>
                                <NavLink className='dropdown-button' id='dropdown-button' to={`/${user?.uid}/profile`} onClick={() => setDropdownOpen(false)}><Icon icon="solar:settings-bold" /> Settings</NavLink>
                                <NavLink className='dropdown-button' id='dropdown-button' to={`/${user?.uid}/profile`} onClick={() => setDropdownOpen(false)}><Icon icon="material-symbols:lock" /> Privacy Center</NavLink>
                                <NavLink className='dropdown-button' id='dropdown-button' to={`/${user?.uid}/profile`} onClick={() => setDropdownOpen(false)}><Icon icon="bx:book" /> Activity Log</NavLink>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

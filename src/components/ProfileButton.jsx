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
    // State for dropdown visibility and delete confirmation modal
    const [isDropdownOpen, setDropdownOpen] = useState(false);
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
    };

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
                    <div className="profile-dropdown" id="profileDropdown">
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
                                <button className='dropdown-button' id='dropdown-button' onClick={handleLogOut}><Icon icon="solar:settings-bold" /> Settings & Privacy</button>
                                <NavLink className='dropdown-button' id='dropdown-button' to={`/${user?.uid}`} onClick={() => setDropdownOpen(false)}><Icon icon="material-symbols:help" /> Help Center</NavLink>
                                <button className='dropdown-button' id='dropdown-button' onClick={handleLogOut}><Icon icon="material-symbols:feedback-outline-rounded" /> Give a feedback</button>
                                <button className='dropdown-button' id='dropdown-button' onClick={handleLogOut}><Icon icon="ic:round-log-out" /> Log Out</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

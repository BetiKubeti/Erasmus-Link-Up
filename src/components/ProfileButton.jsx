import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { auth, firestore } from '../firebase';
import { collection, getDocs, deleteDoc, query, where } from 'firebase/firestore';

// Image import
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';

// Set the root element for the modal
Modal.setAppElement('#root');

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
            const companyRef = collection(firestore, 'companies');
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
        <div className="profile-button" id="profileButton">
            {/* Toggle button for the dropdown */}
            <div className='profile-button-toggle' id="profileButtonToggle" onClick={toggleDropdown}>
                <img src={profileData?.profileImageURL || DefaultProfileImage} alt="Profile" />
            </div>
            {/* Dropdown content */}
            {isDropdownOpen && (
                <div className="profile-dropdown" id="profileDropdown">
                    {/* Link to the user's profile */}
                    <NavLink className='dropdown-button' id='dropdown-button' to={`/${user?.uid}/profile`} onClick={() => setDropdownOpen(false)}>Profile</NavLink>
                    {/* Button to sign out */}
                    <button className='dropdown-button' id='dropdown-button' onClick={handleLogOut}>Sign Out</button>
                </div>
            )}
            {/* Delete confirmation modal */}
            <Modal
                isOpen={isDeleteConfirmationOpen}
                className="custom-modal"
                contentLabel="Delete Confirmation Modal"
                id='pop-up'
            >
                <div className='pop-up-container'>
                    <h2>Do you really want to delete your account?</h2>
                    <div className='buttons'>
                        {/* Button to confirm account deletion */}
                        <button onClick={confirmDeleteAccount}>Delete</button>
                        {/* Button to cancel account deletion */}
                        <button onClick={cancelDeleteAccount}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

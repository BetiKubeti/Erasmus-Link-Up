import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { auth, firestore } from '../firebase';
import { collection, getDocs, deleteDoc, query, where } from 'firebase/firestore';

// Set the root element for the modal
Modal.setAppElement('#root');

// ProfileButton component
export default function ProfileButton() {
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
            navigate('/');
        } catch (error) {
            console.error('Log out error:', error);
        }
    };

    // Function to initiate the delete account process
    const handleDeleteAccount = () => {
        setDeleteConfirmationOpen(true);
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
            <div id="profileButtonToggle" onClick={toggleDropdown}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2Z" />
                        <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z" />
                    </g>
                </svg>
            </div>
            {/* Dropdown content */}
            {isDropdownOpen && (
                <div className="profile-dropdown" id="profileDropdown">
                    {/* Link to the user's profile */}
                    <NavLink className='dropdown-button' id='dropdown-button' to="/profile" onClick={() => setDropdownOpen(false)}>Profile</NavLink>
                    {/* Button to sign out */}
                    <button className='dropdown-button' id='dropdown-button' onClick={handleLogOut}>Sign Out</button>
                    {/* Button to initiate account deletion */}
                    <button className='dropdown-button' id='dropdown-button' onClick={handleDeleteAccount}>Delete Account</button>
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

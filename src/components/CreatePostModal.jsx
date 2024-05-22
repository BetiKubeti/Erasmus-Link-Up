import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { Icon } from '@iconify/react';

// Images import
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';

const CreatePostModal = ({ onClose }) => {
    
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

    const handlePostPictureUpload = () => {

    }

    // Placeholder for the handleSubmitPost function
    const handleSubmitPost = () => {
        // Implement the logic to submit the post here
        console.log('Submitting post...');
        onClose(); // Close the modal after submission
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className='title-container'>
                    <div className='title'>
                        <div className='profile-picture'>
                            <img src={profileData?.profileImageURL || DefaultProfileImage} alt="Profile" />
                        </div>
                        <h2>Create a post</h2>
                    </div>
                    <Icon icon="carbon:close-filled" onClick={handleClose} />
                </div>

                <div className='post-inputs-container'>
                    <div className='input-container'>
                        <textarea className='post-textarea' id='post-textarea' placeholder='What do you want to post about?'></textarea>
                    </div>

                    <div className='buttons-container'>
                        <input type="file" id='profile-picture-input' style={{ display: 'none' }} onChange={handlePostPictureUpload} />
                        <label htmlFor="profile-picture-input"><Icon icon="ion:camera-outline" /> <span>Add photo</span></label>
                    </div>
                </div>

                <div className='submit-post-container'>
                    <button onClick={handleSubmitPost} disabled><span>Post</span></button>
                </div>

                
            </div>
        </div>
    );
};

export default CreatePostModal;

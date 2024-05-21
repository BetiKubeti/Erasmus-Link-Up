import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { Icon } from '@iconify/react';

// Images import
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';

const EditProfileInformationModal = ({ onClose }) => {

    const [profileData, setProfileData] = useState({
        profileImageURL: null,
    });

    const storage = getStorage();

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const storageRef = ref(storage, `profilePictures/${uuidv4()}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Handle progress here if needed
                },
                (error) => {
                    console.error("Error uploading file:", error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setProfileData(prevState => ({
                            ...prevState,
                            profileImageURL: downloadURL,
                        }));
                    });
                }
            );
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className='title-container'>
                    <div className='title'>
                        <h2>Edit your profile</h2>
                        <p className='subtitle'>* indicates required information</p>
                    </div>
                    <Icon icon="carbon:close-filled" onClick={onClose} />
                </div>
                <div className='edit-profile-inputs-container'>
                    <div className='edit-profile-picture'>
                        <h3>Edit your profile picture:</h3>
                        <div className='profile-picture'>
                            <img src={profileData?.profileImageURL || DefaultProfileImage} alt="Profile" />
                        </div>
                        <div className='buttons-container'>
                            <input type="file" id='profile-picture-input' style={{ display: 'none' }} onChange={handleFileChange} />
                            <label htmlFor="profile-picture-input"><Icon icon="ion:camera-outline" /> <span>Add photo</span></label>
                            <button><Icon icon="ph:trash-bold" /><span>Remove photo</span></button>
                        </div>
                    </div>
                    <div className='edit-profile-name'>
                        <h3>Edit your Name:</h3>
                        <label className='text-input-label' htmlFor="">Full Name*</label>
                        <input type="text" className='text-input' />
                    </div>
                    <div className='edit-profile-location'>
                        <h3>Edit your Location:</h3>
                        <label className='text-input-label' htmlFor="">Country/Region</label>
                        <input type="text" className='text-input' />
                    </div>
                    <div className='edit-profile-contact-info'>
                        <h3>Edit Contact Information:</h3>
                        <label className='text-input-label' htmlFor="">Email*</label>
                        <input type="email" className='text-input' />
                        <label className='text-input-label' htmlFor="">Telephone</label>
                        <input type="tel" className='text-input' />
                        <label className='text-input-label' htmlFor="">Social Media</label>
                        <input type="text" className='text-input' />
                        <input type="text" className='text-input' />
                        <input type="text" className='text-input' />
                    </div>
                </div>

                <div className='submit-edit-changes-container'>
                    <button><span>Save changes</span></button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileInformationModal;
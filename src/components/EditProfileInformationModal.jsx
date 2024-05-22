import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { Icon } from '@iconify/react';

// Images import
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';

const EditProfileInformationModal = ({ onClose }) => {
    const [profileData, setProfileData] = useState({
        profileImageURL: null,
        name: '',
        location: '',
        email: '',
        telephone: '',
        socialMedia1: '',
        socialMedia2: '',
        socialMedia3: '',
    });

    const [initialProfileData, setInitialProfileData] = useState(null);
    const [oldProfileImageURL, setOldProfileImageURL] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const storage = getStorage();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(firestore, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setProfileData(userData);
                    setInitialProfileData(userData);
                    setOldProfileImageURL(userData.profileImageURL);
                }
            }
        };
        fetchUserProfile();
    }, []);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setIsLoading(true); // Set loading to true
            const file = event.target.files[0];
            const storageRef = ref(storage, `profilePictures/${uuidv4()}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Display loading icon
                    setIsLoading(true);
                },
                (error) => {
                    console.error("Error uploading file:", error);
                    setIsLoading(false); // Set loading to false in case of error
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        setProfileData(prevState => ({
                            ...prevState,
                            profileImageURL: downloadURL,
                        }));
                        setOldProfileImageURL(downloadURL);
                        setIsLoading(false); // Set loading to false after upload completes
                    });
                }
            );
        }
    };

    const handleRemovePhoto = async () => {
        if (oldProfileImageURL) {
            const imageRef = ref(storage, oldProfileImageURL);
            try {
                await deleteObject(imageRef);
                setProfileData(prevState => ({
                    ...prevState,
                    profileImageURL: null,
                }));
                setOldProfileImageURL(null);
            } catch (error) {
                console.error("Error deleting file:", error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfileData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                const userDocRef = doc(firestore, 'users', user.uid);
                await setDoc(userDocRef, profileData, { merge: true });
                onClose(); // Close the modal after saving changes
            } catch (error) {
                console.error("Error updating profile:", error);
            }
        }
    };

    const handleClose = () => {
        setProfileData(initialProfileData); // Reset profileData to initialProfileData
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className='title-container'>
                    <div className='title'>
                        <h2>Edit your profile</h2>
                        <p className='subtitle'>* indicates required information</p>
                    </div>
                    <Icon icon="carbon:close-filled" onClick={handleClose} />
                </div>
                <div className='edit-profile-inputs-container'>
                    <div className='edit-profile-picture'>
                        <h3>Edit your profile picture:</h3>
                        <div className='profile-picture'>
                            {isLoading ? (
                                <Icon icon="line-md:loading-loop" style={{ fontSize: '50px' }} />
                            ) : (
                                <img src={profileData?.profileImageURL || DefaultProfileImage} alt="Profile" />
                            )}
                        </div>
                        <div className='buttons-container'>
                            <input type="file" id='profile-picture-input' style={{ display: 'none' }} onChange={handleFileChange} />
                            <label htmlFor="profile-picture-input"><Icon icon="ion:camera-outline" /> <span>Add photo</span></label>
                            <button onClick={handleRemovePhoto}><Icon icon="ph:trash-bold" /><span>Remove photo</span></button>
                        </div>
                    </div>
                    <div className='edit-profile-name'>
                        <h3>Edit your Name:</h3>
                        <label className='text-input-label' htmlFor="name">Full Name*</label>
                        <input type="text" className='text-input' name="name" value={profileData.name} onChange={handleChange} />
                    </div>
                    <div className='edit-profile-location'>
                        <h3>Edit your Location:</h3>
                        <label className='text-input-label' htmlFor="location">Country/Region</label>
                        <input type="text" className='text-input' name="location" value={profileData.location} onChange={handleChange} />
                    </div>
                    <div className='edit-profile-contact-info'>
                        <h3>Edit Contact Information:</h3>
                        <label className='text-input-label' htmlFor="email">Email*</label>
                        <input type="email" className='text-input' name="email" value={profileData.email} onChange={handleChange} />
                        <label className='text-input-label' htmlFor="telephone">Telephone</label>
                        <input type="tel" className='text-input' name="telephone" value={profileData.telephone} onChange={handleChange} />
                        <label className='text-input-label' htmlFor="socialMedia1">Social Media</label>
                        <input type="text" className='text-input' name="socialMedia1" value={profileData.socialMedia1} onChange={handleChange} />
                        <input type="text" className='text-input' name="socialMedia2" value={profileData.socialMedia2} onChange={handleChange} />
                        <input type="text" className='text-input' name="socialMedia3" value={profileData.socialMedia3} onChange={handleChange} />
                    </div>
                </div>

                <div className='submit-edit-changes-container'>
                    <button onClick={handleSaveChanges}><span>Save changes</span></button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileInformationModal;

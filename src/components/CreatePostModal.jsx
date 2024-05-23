import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { Icon } from '@iconify/react';

// Images import
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';

const CreatePostModal = ({ onClose }) => {
    const [user] = useAuthState(auth);
    const [profileData, setProfileData] = useState(null);
    const [postText, setPostText] = useState('');
    const [postImageURL, setPostImageURL] = useState('');
    const [postImageRef, setPostImageRef] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const storage = getStorage(); // Initialize Firebase storage

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

    const handlePostPictureUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsLoading(true);

        const storageRef = ref(storage, `postImages/${uuidv4()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            snapshot => { },
            error => {
                console.error(error);
                setIsLoading(false);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setPostImageURL(downloadURL);
                setPostImageRef(storageRef);
                setIsLoading(false);
            }
        );
    };

    const handleSubmitPost = async () => {
        try {
            const postsCollectionRef = collection(firestore, 'posts');
            await addDoc(postsCollectionRef, {
                postText,
                picture: postImageURL,
                likes: [],
                comments: [],
                createdBy: user.uid, // Save user ID with the post
                createdAt: new Date(), // Save the post creation time
            });
            console.log('Post submitted successfully!');
            onClose(); // Close the modal after submission
            window.location.reload();
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };

    const handleClose = async () => {
        if (postImageRef) {
            try {
                await deleteObject(postImageRef);
                console.log('Uploaded image deleted successfully!');
            } catch (error) {
                console.error('Error deleting uploaded image:', error);
            }
        }
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
                        <textarea
                            className='post-textarea'
                            id='post-textarea'
                            placeholder='What do you want to post about?'
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
                        />
                    </div>

                    <div className='buttons-container'>
                        <input type="file" id='profile-picture-input' style={{ display: 'none' }} onChange={handlePostPictureUpload} />
                        <label htmlFor="profile-picture-input"><Icon icon="ion:camera-outline" /> <span>Add photo</span></label>
                    </div>

                    {isLoading && <Icon icon="line-md:loading-loop" style={{ fontSize: '50px' }} />} {/* Loading icon */}

                    {postImageURL && (
                        <div className='uploaded-picture'>
                            <img src={postImageURL} alt="Uploaded" />
                        </div>
                    )}
                </div>

                <div className='submit-post-container'>
                    <button onClick={handleSubmitPost} disabled={isLoading || (!postText && !postImageURL)}><span>Post</span></button>
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal;

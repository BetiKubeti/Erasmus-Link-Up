import React, { useEffect, useState, useRef } from 'react';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject, getStorage } from 'firebase/storage';
import { firestore } from '../firebase';
import { Icon } from '@iconify/react';
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';

const PostCard = ({ post, onPostDelete, currentUserId }) => {
    const [authorData, setAuthorData] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const storage = getStorage();

    useEffect(() => {
        const fetchAuthorData = async () => {
            const authorDocRef = doc(firestore, 'users', post.createdBy);
            const authorSnap = await getDoc(authorDocRef);

            if (authorSnap.exists()) {
                setAuthorData(authorSnap.data());
            } else {
                console.log("No such document!");
            }
        };

        fetchAuthorData();
    }, [post.createdBy]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDeletePost = async () => {
        try {
            // Delete the post document from Firestore
            await deleteDoc(doc(firestore, 'posts', post.id));

            // Delete the image from Firebase Storage, if it exists
            if (post.picture) {
                const imageRef = ref(storage, post.picture);
                await deleteObject(imageRef);
            }

            console.log('Post deleted successfully');
            onPostDelete(post.id);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    if (!authorData) return null; // Return null or a loading spinner while fetching author data

    return (
        <div className="post-card">
            <div className="post-header">
                <div className='author-info'>
                    <div className='profile-picture'>
                        <img src={authorData.profileImageURL || DefaultProfileImage} alt="Profile" />
                    </div>

                    <div className="post-author">
                        <h2>{authorData.name}</h2>
                        <p>Posted on: {formatDate(post.createdAt)}</p>
                    </div>
                </div>

                <div className="more-post-button-container" ref={dropdownRef}>
                    <Icon
                        icon="ri:more-fill"
                        className='more-post-button'
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    />
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            {post.createdBy === currentUserId && (
                                <button onClick={handleDeletePost}>Delete</button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="post-content">
                <p>{post.postText}</p>
                {post.picture && <img src={post.picture} alt="Post" className="post-image" />}
            </div>
            <div className="post-actions">
                <button><Icon icon="mdi:thumb-up-outline" /> <span>Like</span></button>
                <button><Icon icon="fa-regular:comment" /> <span>Comment</span></button>
                <button><Icon icon="mdi:favorite-box-outline" /> <span>Save</span></button>
            </div>
        </div>
    );
};

export default PostCard;

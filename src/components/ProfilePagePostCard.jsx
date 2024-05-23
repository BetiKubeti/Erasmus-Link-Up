import React, { useEffect, useState, useRef } from 'react';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject, getStorage } from 'firebase/storage';
import { firestore } from '../firebase';
import { Icon } from '@iconify/react';

export default function ProfilePagePostCard({ post }) {
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

    const formatDate = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

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
            window.location.reload();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    if (!authorData) return null;

    return (
        <div className="post-card">
            <div className="post-header">
                <div className="post-info">
                    <p className="author-name">{authorData.name} posted this on: {formatDate(post.createdAt)}</p>
                    <div className="more-post-button-container" ref={dropdownRef}>
                        <Icon
                            icon="ri:more-fill"
                            className='more-post-button'
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        />
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <button onClick={handleDeletePost}>Delete</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="post-body">
                {post.picture && <img src={post.picture} alt="Post" className="post-image" />}
                <div className="post-content">
                    <p>{post.postText}</p>
                </div>
            </div>
            <div className="see-more">
                <a href="#">... see more</a>
            </div>
        </div>
    );
}

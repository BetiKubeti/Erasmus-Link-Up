// src/components/PostCard.jsx
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Icon } from '@iconify/react';
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';

const PostCard = ({ post }) => {
    const [authorData, setAuthorData] = useState(null);

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

                <div>
                    <Icon icon="ri:more-fill" className='more-post-button' />
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

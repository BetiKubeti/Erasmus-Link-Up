import React from 'react';
import { Icon } from '@iconify/react';

// Images import
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';

const NetworkPageSeeAllProfilesModal = ({ profiles, onClose, userType }) => {

    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    const shuffledProfiles = shuffle(profiles);

    // Determine the majority userType among the profiles
    const userTypeCounts = profiles.reduce((acc, profile) => {
        acc[profile.userType] = (acc[profile.userType] || 0) + 1;
        return acc;
    }, {});

    // Determine the title based on userType
    const title = userType === 'person' ? "People you might be interested in:" : "Companies you might be interested in:";

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className='title-container'>
                    <h2>{title}</h2>
                    <Icon icon="carbon:close-filled" onClick={onClose} />
                </div>
                <div className='modal-cards-container network-cards'>
                    {shuffledProfiles.map((profile, index) => (
                        <div key={index} className='card'>
                            <div className='profile-picture'>
                                <img src={profile.profileImageURL || DefaultProfileImage} alt="Profile" />
                            </div>
                            <div className='profile-name'>{profile.name}</div>
                            <a className='view-profile-button' href="">{profile.userType === 'person' ? 'personal profile' : 'company profile'}</a>
                            <div className='mutual-connections-container'>
                                <div className='mutual-connections'>
                                    <p>Mutual connections:</p>
                                    <p className='number-of-mutual-connections'>56</p>
                                </div>
                            </div>
                            <a href="" className='follow-button'><Icon icon="icon-park-outline:add" /> <span>Follow</span></a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NetworkPageSeeAllProfilesModal;
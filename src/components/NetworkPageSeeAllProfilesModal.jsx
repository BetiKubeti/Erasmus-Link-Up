import React from 'react';
import { Icon } from '@iconify/react';

// Styles import
import '../assets/styles/NetworkPageSeeAllProfilesModalStyle.css';

// Images import
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';

const NetworkPageSeeAllProfilesModal = ({ profiles, onClose }) => {

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

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>All Profiles</h2>
                <button onClick={onClose}>Close</button>
                <ul>
                    {shuffledProfiles.map((profile, index) => (
                        <li key={index}>
                            <div className='profile-picture'>
                                <img src={profile.profileImageURL || DefaultProfileImage} alt="Profile" />
                            </div>
                            <div className='profile-name'>{profile.name}</div>
                            <a className='view-profile-button' href="">{profile.userType === 'person' ? 'Personal Profile' : ''}</a>
                            <div className='mutual-connections-container'>
                                <div className='mutual-connections'>
                                    <p>Mutual connections:</p>
                                    <p className='number-of-mutual-connections'>56</p>
                                </div>
                            </div>
                            <div className='follow-button'><a href=""><Icon icon="icon-park-outline:add" /> Follow</a></div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NetworkPageSeeAllProfilesModal;
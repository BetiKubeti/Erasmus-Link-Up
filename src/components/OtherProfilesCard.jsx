import React, { useState } from 'react';
import { Icon } from '@iconify/react';

// Image import
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';

// Components imports
import Footer from '../components/Footer';
import Nav from "../components/Nav";

export default function OtherProfilesCard() {

    const [profileData, setProfileData] = useState(null);

    return (
        <>

                    <div className='other-profiles-card'>
                        <div className='title'>Accounts:</div>
                        <div className='other-profiles-container'>
                            <div className='other-profile'>
                                <div className='other-profile-image'><img src={profileData?.profileImageURL || DefaultProfileImage} alt="Profile" /></div>
                                <p className='name'>The Nordic Crew</p>
                            </div>
                        </div>
                        <a href="" className='add-account-button'><Icon icon="icon-park-outline:add" /> <span>Add account</span></a>
                    </div>

        </>
    );
}
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { Icon } from '@iconify/react';

import DefaultProfileImage from '../assets/images/default-profile-image.jpg';

import Nav from '../components/Nav';
import Footer from '../components/FooterSignUpLogIn';

export default function NetworkPage() {

    const [user] = useAuthState(auth);
    const [persons, setPersons] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchUserProfiles = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'users'));
            const allUsers = querySnapshot.docs.map(doc => doc.data());
            const currentUserUid = user ? user.uid : null;

            const otherUsers = allUsers.filter(userObj => userObj.uid !== currentUserUid);

            // Separate users into persons and companies
            const personsArray = otherUsers.filter(profile => profile.userType === 'person');
            const companiesArray = otherUsers.filter(profile => profile.userType === 'company');

            if (personsArray.length > 0) {
                setPersons(personsArray);
            }

            if (companiesArray.length > 0) {
                setCompanies(companiesArray);
            } else {
                console.log("No other users found!");
            }
        };

        fetchUserProfiles();
    }, [user]);

    return (
        <>
            <Nav />

            <section className='people-cards network-cards'>
                <div className='title'>
                    <p>Personal Profiles you might be interested in:</p>
                    <a href="">See All</a>
                </div>
                <div className='cards-container'>
                    {persons.map((profile, index) => (
                        <div key={index} className='card'>
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
                        </div>
                    ))}
                </div>
            </section>

            <section className='companies-cards network-cards'>
                <div className='title'>
                    <p>Company Profiles you might be interested in:</p>
                    <a href="">See All</a>
                </div>
                <div className='cards-container'>
                    {companies.map((profile, index) => (
                        <div key={index} className='card'>
                            <div className='profile-picture'>
                                <img src={profile.profileImageURL || DefaultProfileImage} alt="Profile" />
                            </div>
                            <div className='profile-name'>{profile.name}</div>
                            <a className='view-profile-button' href="">{profile.userType === 'company' ? 'Company Profile' : ''}</a>
                            <div className='mutual-connections-container'>
                                <div className='mutual-connections'>
                                    <p>Mutual connections:</p>
                                    <p className='number-of-mutual-connections'>56</p>
                                </div>
                            </div>
                            <div className='follow-button'><a href=""><Icon icon="icon-park-outline:add" /> Follow</a></div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </>
    );
}
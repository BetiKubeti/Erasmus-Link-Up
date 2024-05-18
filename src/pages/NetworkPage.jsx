import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Icon } from '@iconify/react';

// Images import
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';

// Components import
import Nav from '../components/Nav';
import Footer from '../components/FooterSignUpLogIn';
import ModalComponent from '../components/NetworkPageSeeAllProfilesModal'

export default function NetworkPage() {
    const [user] = useAuthState(auth);
    const [persons, setPersons] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalProfiles, setModalProfiles] = useState([]);
    const [modalInfo, setModalInfo] = useState({ isModalOpen: false, userType: null });

    useEffect(() => {
        const fetchUserProfiles = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'users'));
            const allUsers = querySnapshot.docs.map(doc => doc.data());
            const currentUserUid = user ? user.uid : null;

            const otherUsers = allUsers.filter(userObj => userObj.uid !== currentUserUid);

            // Separate users into persons and companies
            const personsArray = otherUsers.filter(profile => profile.userType === 'person').slice(0, 10); // Limit to 10
            const companiesArray = otherUsers.filter(profile => profile.userType === 'company').slice(0, 10); // Limit to 10

            // Randomize the order of persons and companies
            const shuffledPersons = personsArray.sort(() => Math.random() - 0.5);
            const shuffledCompanies = companiesArray.sort(() => Math.random() - 0.5);

            setPersons(shuffledPersons);
            setCompanies(shuffledCompanies);
        };

        fetchUserProfiles();
    }, [user]);

    const handleSeeAllClick = (profiles, userType) => {
        setModalProfiles(profiles);
        setModalInfo({ isModalOpen: true, userType });
    };

    return (
        <>
            <Nav />

            <section className='people-cards network-cards'>
                <div className='title'>
                    <p>Personal Profiles you might be interested in:</p>
                    <a onClick={() => handleSeeAllClick(persons, 'person')}>See All</a>
                </div>
                <div className='cards-container'>
                    {persons.map((profile, index) => (
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
                            <div className='follow-button'><a href=""><Icon icon="icon-park-outline:add" /> Follow</a></div>
                        </div>
                    ))}
                </div>
            </section>

            <section className='companies-cards network-cards'>
                <div className='title'>
                    <p>Company Profiles you might be interested in:</p>
                    <a onClick={() => handleSeeAllClick(companies, 'company')}>See All</a>
                </div>
                <div className='cards-container'>
                    {companies.map((profile, index) => (
                        <div key={index} className='card'>
                            <div className='profile-picture'>
                                <img src={profile.profileImageURL || DefaultProfileImage} alt="Profile" />
                            </div>
                            <div className='profile-name'>{profile.name}</div>
                            <a className='view-profile-button' href="">{profile.userType === 'company' ? 'company profile' : 'personal profile'}</a>
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

            {/* Modal Component */}
            {modalInfo.isModalOpen && (
                <ModalComponent profiles={modalProfiles} onClose={() => setModalInfo({ isModalOpen: false, userType: null })} userType={modalInfo.userType} />
            )}

            <Footer />
        </>
    );
}
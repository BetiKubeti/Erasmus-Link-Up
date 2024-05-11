import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';


import Footer from '../components/Footer';

export default function ProfilePage() {
    const [user] = useAuthState(auth); // Get the currently logged-in user
    const [companyData, setCompanyData] = useState(null);
    const [companyName, setCompanyName] = useState('');
    const [websiteURL, setWebsiteURL] = useState('');
    const [email, setEmail] = useState('');
    const [aboutCompany, setAboutCompany] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactLinkedIn, setContactLinkedIn] = useState('');
    const [contactFacebook, setContactFacebook] = useState('');
    const [contactInstagram, setContactInstagram] = useState('');
    const [locationCity, setLocationCity] = useState('');
    const [locationCountry, setLocationCountry] = useState('');
    const [subcategories, setSubcategories] = useState([]);

    // State for controlling the modal
    const [isModalOpenAboutCompany, setIsModalOpenAboutCompany] = useState(false);
    const [updatedAboutCompany, setUpdatedAboutCompany] = useState('');
    const [isModalOpenAboutCompanySidebar, setIsModalOpenAboutCompanySidebar] = useState(false);
    const [updatedContactEmail, setUpdatedContactEmail] = useState('');
    const [updatedContactPhone, setUpdatedContactPhone] = useState('');
    const [updatedContactLinkedIn, setUpdatedContactLinkedIn] = useState('');
    const [updatedContactFacebook, setUpdatedContactFacebook] = useState('');
    const [updatedContactInstagram, setUpdatedContactInstagram] = useState('');
    const [updatedLocationCity, setUpdatedLocationCity] = useState('');
    const [updatedLocationCountry, setUpdatedLocationCountry] = useState('');

    const [selectedSubcategories, setSelectedSubcategories] = useState([]);


    // Use `useEffect` to fetch the company data when the component mounts
    useEffect(() => {
        if (user) {
            // Create a query to find the company with the user's email
            const companyQuery = query(collection(firestore, 'companies'), where('email', '==', user.email));

            // Fetch the documents that match the query
            getDocs(companyQuery)
                .then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        // Get the first document (assuming there's only one match)
                        const docRef = querySnapshot.docs[0];
                        // Get the company data from the document
                        const companyData = docRef.data();
                        setCompanyData(companyData);
                        setCompanyName(companyData.companyName);
                        setWebsiteURL(companyData.websiteURL);
                        setEmail(companyData.email);
                        setAboutCompany(companyData.aboutCompany);
                        setContactEmail(companyData.contactEmail);
                        setContactPhone(companyData.contactPhone);
                        setContactLinkedIn(companyData.contactLinkedIn);
                        setContactFacebook(companyData.contactFacebook);
                        setContactInstagram(companyData.contactInstagram);
                        setLocationCity(companyData.locationCity);
                        setLocationCountry(companyData.locationCountry);
                        setSubcategories(companyData.subcategories || [])
                    } else {
                        console.log('No matching documents for the user email.');
                    }
                })
                .catch((error) => {
                    console.error('Error getting documents:', error);
                });
        }
    }, [user]);

    // Function to open the modal
    const openModalAboutCompany = () => {
        setIsModalOpenAboutCompany(true);
        setUpdatedAboutCompany(aboutCompany); // Initialize the input with the current "aboutCompany" value
    };

    const openModalSidebar = () => {
        setIsModalOpenAboutCompanySidebar(true);
        setUpdatedContactEmail(contactEmail); // Initialize the input with the current "contactEmail" value
        setUpdatedContactPhone(contactPhone);
        setUpdatedContactLinkedIn(contactLinkedIn);
        setUpdatedContactFacebook(contactFacebook);
        setUpdatedContactInstagram(contactInstagram);
        setUpdatedLocationCity(locationCity);
        setUpdatedLocationCountry(locationCountry);
        setSelectedSubcategories(subcategories)
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpenAboutCompany(false);
        setIsModalOpenAboutCompanySidebar(false);
    };

    // Function to save the updated "aboutCompany" and close the modal
    const saveAboutCompany = async () => {
        if (user) {
            // Create a query to find the company with the user's email
            const companyQuery = query(collection(firestore, 'companies'), where('email', '==', user.email));

            try {
                // Fetch the documents that match the query
                const querySnapshot = await getDocs(companyQuery);

                if (!querySnapshot.empty) {
                    // Get the first document (assuming there's only one match)
                    const doc = querySnapshot.docs[0];
                    const companyRef = doc.ref; // Obtain the document reference
                    // Update the "aboutCompany" field in the Firestore document
                    await updateDoc(companyRef, {
                        aboutCompany: updatedAboutCompany,
                    });
                    setAboutCompany(updatedAboutCompany); // Update the displayed value
                } else {
                    console.log('No matching documents for the user email.');
                }
            } catch (error) {
                console.error('Error updating "aboutCompany":', error);
            }
        }

        // Close the modal
        setIsModalOpenAboutCompany(false);
    };

    const saveAboutCompanySidebar = async () => {
        if (user) {
            // Create a query to find the company with the user's email
            const companyQuery = query(collection(firestore, 'companies'), where('email', '==', user.email));

            try {
                // Fetch the documents that match the query
                const querySnapshot = await getDocs(companyQuery);

                if (!querySnapshot.empty) {
                    // Get the first document (assuming there's only one match)
                    const doc = querySnapshot.docs[0];
                    const companyRef = doc.ref; // Obtain the document reference
                    // Update the "aboutCompany" field in the Firestore document
                    await updateDoc(companyRef, {
                        contactEmail: updatedContactEmail,
                        contactPhone: updatedContactPhone,
                        contactLinkedIn: updatedContactLinkedIn,
                        contactFacebook: updatedContactFacebook,
                        contactInstagram: updatedContactInstagram,
                        locationCity: updatedLocationCity,
                        locationCountry: updatedLocationCountry,
                        subcategories: selectedSubcategories
                    });
                    setContactEmail(updatedContactEmail); // Update the displayed value
                    setContactPhone(updatedContactPhone);
                    setContactLinkedIn(updatedContactLinkedIn);
                    setContactFacebook(updatedContactFacebook);
                    setContactInstagram(updatedContactInstagram);
                    setLocationCity(updatedLocationCity);
                    setLocationCountry(updatedLocationCountry);
                    setSelectedSubcategories(selectedSubcategories)
                } else {
                    console.log('No matching documents for the user email.');
                }
            } catch (error) {
                console.error('Error updating "sidebar":', error);
            }
        }

        // Close the modal
        setIsModalOpenAboutCompanySidebar(false);
    };

    const handleSubcategorySelection = (subcategory) => {
        setSelectedSubcategories(prevSubcategories => {
            if (prevSubcategories.includes(subcategory)) {
                return prevSubcategories.filter(sc => sc !== subcategory);
            } else {
                return [...prevSubcategories, subcategory];
            }
        });
    };

    return (
        <>
            {/* Section containing the profile page */}
            <section className='profile-page-container'>
                {/* Sidebar section containing company information */}
                <div className='profile-sidebar'>
                    <div className='profile-sidebar-container'>
                        {/* Button to update information, triggering modal */}
                        <div className='update-information'>
                            <button onClick={openModalSidebar}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953l1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44l1.263-1.263a.25.25 0 0 0 0-.354Z" /></svg></button>
                        </div>

                        {/* Header section of the sidebar */}
                        <div className='sidebar-header'>
                            <div className='profile-picture'>
                                <img src="" alt="profile logo image" />
                            </div>
                            <div className='company-title-sidebar'>
                                <h2>{companyName}</h2>
                            </div>
                        </div>

                        {/* Content section of the sidebar */}
                        <div className='sidebar-content'>
                            {/* Company sub-categories in the sidebar */}
                            <div className='company-sub-categories-sidebar'>
                                <p><strong>We do:</strong></p>
                                <p>{subcategories.join(', ')}</p>
                            </div>
                            {/* Contact information section in the sidebar */}
                            <div className='add-contact-information-sidebar'>
                                <p><strong>Contact Info:</strong></p>
                                <div className='contacts-list'>
                                    <div className='email contact'>
                                        <img src="" alt="image for mail" />
                                        {updatedContactEmail || email}
                                    </div>

                                    {contactPhone && (
                                        <div className='phone contact'>
                                            <img src="" alt="image for phone" />{contactPhone}
                                        </div>
                                    )}
                                    {contactLinkedIn && (
                                        <div className='linked-in contact'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#fff" rx="60" /><rect width="256" height="256" fill="#0A66C2" rx="60" /><path fill="#fff" d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4ZM38 59.627c0 11.865 9.767 21.627 21.632 21.627c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627Zm6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4Z" /></g></svg>
                                            <a href={contactLinkedIn} target='_blank'>www.linkedin.com</a>
                                        </div>
                                    )}
                                    {contactFacebook && (
                                        <div className='facebook contact'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="118.35" height="118.35" x="4.83" y="4.83" fill="#3d5a98" rx="6.53" ry="6.53" /><path fill="#fff" d="M86.48 123.17V77.34h15.38l2.3-17.86H86.48v-11.4c0-5.17 1.44-8.7 8.85-8.7h9.46v-16A126.56 126.56 0 0 0 91 22.7c-13.62 0-23 8.3-23 23.61v13.17H52.62v17.86H68v45.83z" /></svg>
                                            <a href={contactFacebook} target='_blank'>www.facebook.com</a>
                                        </div>
                                    )}
                                    {contactInstagram && (
                                        <div className='instagram contact'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="url(#skillIconsInstagram0)" rx="60" /><rect width="256" height="256" fill="url(#skillIconsInstagram1)" rx="60" /><path fill="#fff" d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604h.031Zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396c0 26.688-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413c0-26.704.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5c3.5-3.5 6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563v.025Zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12v.004Zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355c0 28.361 22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355h.002Zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334c-18.41 0-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334Z" /><defs><radialGradient id="skillIconsInstagram0" cx="0" cy="0" r="1" gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)" gradientUnits="userSpaceOnUse"><stop stopColor="#FD5" /><stop offset=".1" stopColor="#FD5" /><stop offset=".5" stopColor="#FF543E" /><stop offset="1" stopColor="#C837AB" /></radialGradient><radialGradient id="skillIconsInstagram1" cx="0" cy="0" r="1" gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)" gradientUnits="userSpaceOnUse"><stop stopColor="#3771C8" /><stop offset=".128" stopColor="#3771C8" /><stop offset="1" stopColor="#60F" stopOpacity="0" /></radialGradient></defs></g></svg>
                                            <a href={contactInstagram} target='_blank'>www.instagram.com</a>
                                        </div>
                                    )}
                                </div>

                            </div>

                            {/* Company location in the sidebar */}
                            <div className='company-location-sidebar'>
                                <p><strong>Location:</strong> <br /></p>
                                <p>
                                    {locationCity && locationCountry
                                        ? `${locationCity}, ${locationCountry}`
                                        : locationCity || locationCountry
                                    }
                                </p>
                            </div>

                            {/* Company website in the sidebar */}
                            <div className='company-website-sidebar'>
                                <p><strong>Visit Website:</strong> <br /></p>
                                <a href={websiteURL} target='_blank'>{websiteURL}</a>
                            </div>

                            {/* Company rating in the sidebar */}
                            <div className='company-rating-sidebar'>
                                <p><strong>Your Trust Score:</strong> 4.12</p>
                                <div className='star-rating'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='green-star' width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='green-star' width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='green-star' width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='green-star' width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main company data */}
                <div className='profile-page-main-data-of-company'>
                    <div className='profile-page-main-data-of-company-container'>

                        <div className='main-data-about-company'>
                            {/* About Company */}
                            <div className='about-company-title'>
                                <h2>About {companyName}</h2>
                                <div className='update-information'>
                                    <button onClick={openModalAboutCompany}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953l1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44l1.263-1.263a.25.25 0 0 0 0-.354Z" /></svg></button>
                                </div>
                            </div>
                            <div className='about-company-text'>
                                <div><p>{aboutCompany}</p></div>
                            </div>
                        </div>

                    </div>
                </div>


            </section>

            {/* Modal component for editing the About Company main data*/}
            <Modal
                isOpen={isModalOpenAboutCompany}
                className="custom-modal"
                contentLabel="Edit About Company Modal"
                id='pop-up-change-about-company'
            >
                <div className='pop-up-container'>
                    <h2>Edit About {companyName}</h2>
                    <textarea
                        value={updatedAboutCompany}
                        onChange={(e) => setUpdatedAboutCompany(e.target.value)}
                    />
                    <div className='buttons'>
                        <button onClick={saveAboutCompany}>Save</button>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </Modal>

            {/* Modal component for editing the About Company sidebar */}
            <Modal
                isOpen={isModalOpenAboutCompanySidebar}
                className="custom-modal"
                contentLabel="Edit About Company Modal"
                id='pop-up-change-sidebar'
            >
                {/* Container for the content of the modal */}
                <div className='pop-up-container'>
                    {/* Title of the modal */}
                    <h2>Edit Sidebar</h2>
                    {/* Container for input fields within the modal */}
                    <div className='input-fields-container'>
                        {/* Label for selecting subcategories */}
                        <p>Select Subcategories:</p>
                        {/* Container for displaying and selecting subcategories */}
                        <div className='subcategory-check-container'>
                            {/* Conditional rendering based on the company's category */}
                            {companyData && (() => {
                                switch (companyData.category) {
                                    // Case for 'Software & Technology' category
                                    case 'Software & Technology':
                                        // Map through subcategories and create checkbox for each
                                        return ['Software Development', 'Cybersecurity Solutions', 'Cloud Computing', 'Mobile App Development', 'Web Development', 'Tech Support and Maintenance', 'Data Analytics and BI'].map(subcategory => (
                                            // Individual subcategory checkbox
                                            <div key={subcategory} className={`subcategory-check ${selectedSubcategories.includes(subcategory) ? 'div-checked' : ''}`}>
                                                {/* Checkbox input */}
                                                <input
                                                    type="checkbox"
                                                    id={`subcategory_checkbox_${subcategory}`}
                                                    checked={selectedSubcategories.includes(subcategory)}
                                                    // Handle checkbox change event
                                                    onChange={() => handleSubcategorySelection(subcategory)}
                                                />
                                                {/* Label for the checkbox */}
                                                <label htmlFor={`subcategory_checkbox_${subcategory}`}>
                                                    {subcategory}
                                                </label>
                                            </div>
                                        ));
                                    case 'Environmental & Sustainability':
                                        return ['Investment Banking', 'Wealth Management', 'Insurance Services', 'Payment Processing', 'Asset Management', 'Credit Unions', 'Tax and Accounting Services'].map(subcategory => (

                                            <div key={subcategory} className={`subcategory-check ${selectedSubcategories.includes(subcategory) ? 'div-checked' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    id={`subcategory_checkbox_${subcategory}`}
                                                    checked={selectedSubcategories.includes(subcategory)}
                                                    onChange={() => handleSubcategorySelection(subcategory)}
                                                />
                                                <label htmlFor={`subcategory_checkbox_${subcategory}`}>
                                                    {subcategory}
                                                </label>
                                            </div>

                                        ));
                                    case 'Education & Training':
                                        return ['Dental Clinics', 'Pharmaceutical Manufacturing', 'Telehealth Services', 'Medical Imaging Centers', 'Biotechnology Research', 'Healthcare Equipment Suppliers', 'Rehabilitation Centers'].map(subcategory => (

                                            <div key={subcategory} className={`subcategory-check ${selectedSubcategories.includes(subcategory) ? 'div-checked' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    id={`subcategory_checkbox_${subcategory}`}
                                                    checked={selectedSubcategories.includes(subcategory)}
                                                    onChange={() => handleSubcategorySelection(subcategory)}
                                                />
                                                <label htmlFor={`subcategory_checkbox_${subcategory}`}>
                                                    {subcategory}
                                                </label>
                                            </div>

                                        ));
                                    case 'Home & Garden':
                                        return ['Furniture Retailers', 'Gardening Supplies', 'Interior Design Services', 'Home Improvement Stores', 'Kitchen and Bath Fixtures', 'Outdoor Living', 'Home Security Services'].map(subcategory => (

                                            <div key={subcategory} className={`subcategory-check ${selectedSubcategories.includes(subcategory) ? 'div-checked' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    id={`subcategory_checkbox_${subcategory}`}
                                                    checked={selectedSubcategories.includes(subcategory)}
                                                    onChange={() => handleSubcategorySelection(subcategory)}
                                                />
                                                <label htmlFor={`subcategory_checkbox_${subcategory}`}>
                                                    {subcategory}
                                                </label>
                                            </div>

                                        ));
                                    case 'Legal Services':
                                        return ['Law Firms', 'Litigation Services', 'Corporate Legal', 'Intellectual Property', 'Family Law', 'Immigration Law', 'Criminal Defense'].map(subcategory => (

                                            <div key={subcategory} className={`subcategory-check ${selectedSubcategories.includes(subcategory) ? 'div-checked' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    id={`subcategory_checkbox_${subcategory}`}
                                                    checked={selectedSubcategories.includes(subcategory)}
                                                    onChange={() => handleSubcategorySelection(subcategory)}
                                                />
                                                <label htmlFor={`subcategory_checkbox_${subcategory}`}>
                                                    {subcategory}
                                                </label>
                                            </div>

                                        ));
                                    case 'Professional Services':
                                        return ['HR and Recruitment', 'Management Consulting', 'Financial Advisory', 'Marketing Consulting', 'IT Consulting', 'Environmental Consulting', 'Executive Search'].map(subcategory => (

                                            <div key={subcategory} className={`subcategory-check ${selectedSubcategories.includes(subcategory) ? 'div-checked' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    id={`subcategory_checkbox_${subcategory}`}
                                                    checked={selectedSubcategories.includes(subcategory)}
                                                    onChange={() => handleSubcategorySelection(subcategory)}
                                                />
                                                <label htmlFor={`subcategory_checkbox_${subcategory}`}>
                                                    {subcategory}
                                                </label>
                                            </div>

                                        ));
                                    case 'Marketing & Advertising':
                                        return ['Digital Marketing', 'Advertising Agencies', 'Social Media Marketing', 'Content Marketing', 'Public Relations', 'Branding and Design', 'Market Research'].map(subcategory => (

                                            <div key={subcategory} className={`subcategory-check ${selectedSubcategories.includes(subcategory) ? 'div-checked' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    id={`subcategory_checkbox_${subcategory}`}
                                                    checked={selectedSubcategories.includes(subcategory)}
                                                    onChange={() => handleSubcategorySelection(subcategory)}
                                                />
                                                <label htmlFor={`subcategory_checkbox_${subcategory}`}>
                                                    {subcategory}
                                                </label>
                                            </div>

                                        ));
                                    case 'Financial Services':
                                        return ['Investment Banking', 'Wealth Management', 'Insurance Services', 'Payment Processing', 'Asset Management', 'Credit Unions', 'Tax and Accounting Services'].map(subcategory => (

                                            <div key={subcategory} className={`subcategory-check ${selectedSubcategories.includes(subcategory) ? 'div-checked' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    id={`subcategory_checkbox_${subcategory}`}
                                                    checked={selectedSubcategories.includes(subcategory)}
                                                    onChange={() => handleSubcategorySelection(subcategory)}
                                                />
                                                <label htmlFor={`subcategory_checkbox_${subcategory}`}>
                                                    {subcategory}
                                                </label>
                                            </div>

                                        ));
                                    case 'Healthcare & Medical Services':
                                        return ['Hospitals and Clinics', 'Pharmaceutical Companies', 'Telehealth Services', 'Medical Imaging Centers', 'Biotechnology Research', 'Healthcare Equipment Suppliers', 'Mental Health Services'].map(subcategory => (

                                            <div key={subcategory} className={`subcategory-check ${selectedSubcategories.includes(subcategory) ? 'div-checked' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    id={`subcategory_checkbox_${subcategory}`}
                                                    checked={selectedSubcategories.includes(subcategory)}
                                                    onChange={() => handleSubcategorySelection(subcategory)}
                                                />
                                                <label htmlFor={`subcategory_checkbox_${subcategory}`}>
                                                    {subcategory}
                                                </label>
                                            </div>

                                        ));
                                    case 'Retail & E-commerce':
                                        return ['Fashion and Apparel', 'Electronics and Gadgets', 'Home Decor', 'Pet Supplies', 'Sporting Goods', 'Luxury Brands', 'Bookstores and Publishing'].map(subcategory => (

                                            <div key={subcategory} className={`subcategory-check ${selectedSubcategories.includes(subcategory) ? 'div-checked' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    id={`subcategory_checkbox_${subcategory}`}
                                                    checked={selectedSubcategories.includes(subcategory)}
                                                    onChange={() => handleSubcategorySelection(subcategory)}
                                                />
                                                <label htmlFor={`subcategory_checkbox_${subcategory}`}>
                                                    {subcategory}
                                                </label>
                                            </div>

                                        ));
                                    case 'Automotive & Transportation':
                                        return ['Car Dealerships', 'Transportation Services', 'Automotive Manufacturers', 'Auto Repair and Maintenance', 'Fleet Management', 'Logistics and Supply Chain', 'Electric Vehicle (EV) Companies'].map(subcategory => (

                                            <div key={subcategory} className={`subcategory-check ${selectedSubcategories.includes(subcategory) ? 'div-checked' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    id={`subcategory_checkbox_${subcategory}`}
                                                    checked={selectedSubcategories.includes(subcategory)}
                                                    onChange={() => handleSubcategorySelection(subcategory)}
                                                />
                                                <label htmlFor={`subcategory_checkbox_${subcategory}`}>
                                                    {subcategory}
                                                </label>
                                            </div>

                                        ));
                                    case 'Entertainment & Media':
                                        return ['Film and Television Production', 'Music and Recording Industry', 'Video Game Development', 'Streaming Services', 'Publishing and Printing', 'Public Relations and Media Relations', 'Event Management and Promotion'].map(subcategory => (

                                            <div key={subcategory} className={`subcategory-check ${selectedSubcategories.includes(subcategory) ? 'div-checked' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    id={`subcategory_checkbox_${subcategory}`}
                                                    checked={selectedSubcategories.includes(subcategory)}
                                                    onChange={() => handleSubcategorySelection(subcategory)}
                                                />
                                                <label htmlFor={`subcategory_checkbox_${subcategory}`}>
                                                    {subcategory}
                                                </label>
                                            </div>

                                        ));
                                    case 'Hospitality and Travel':
                                        return ['Hotels and Accommodations', 'Airlines and Aviation', 'Travel Agencies', 'Tour Operators', 'Cruise Lines', 'Restaurants and Dining', 'Tourism Services'].map(subcategory => (

                                            <div key={subcategory} className={`subcategory-check ${selectedSubcategories.includes(subcategory) ? 'div-checked' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    id={`subcategory_checkbox_${subcategory}`}
                                                    checked={selectedSubcategories.includes(subcategory)}
                                                    onChange={() => handleSubcategorySelection(subcategory)}
                                                />
                                                <label htmlFor={`subcategory_checkbox_${subcategory}`}>
                                                    {subcategory}
                                                </label>
                                            </div>

                                        ));
                                    case 'Fitness & Wellness':
                                        return ['Gyms and Fitness Centers', 'Yoga Studios', 'Wellness Spas', 'Personal Trainers', 'Nutrition and Diet Services', 'Sports and Recreation', 'Mental Health and Wellness Services'].map(subcategory => (

                                            <div key={subcategory} className={`subcategory-check ${selectedSubcategories.includes(subcategory) ? 'div-checked' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    id={`subcategory_checkbox_${subcategory}`}
                                                    checked={selectedSubcategories.includes(subcategory)}
                                                    onChange={() => handleSubcategorySelection(subcategory)}
                                                />
                                                <label htmlFor={`subcategory_checkbox_${subcategory}`}>
                                                    {subcategory}
                                                </label>
                                            </div>

                                        ));
                                    case 'Manufacturing & Industrial':
                                        return ['Automotive Manufacturing', 'Aerospace and Defense', 'Textile and Apparel Production', 'Metals and Alloys', 'Chemical Manufacturing', 'Electronic Component Manufacturing', 'Machinery and Equipment Production'].map(subcategory => (

                                            <div key={subcategory} className={`subcategory-check ${selectedSubcategories.includes(subcategory) ? 'div-checked' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    id={`subcategory_checkbox_${subcategory}`}
                                                    checked={selectedSubcategories.includes(subcategory)}
                                                    onChange={() => handleSubcategorySelection(subcategory)}
                                                />
                                                <label htmlFor={`subcategory_checkbox_${subcategory}`}>
                                                    {subcategory}
                                                </label>
                                            </div>

                                        ));
                                    default:
                                        return null;
                                }
                            })()}
                            {/* Form for updating contact and location information */}
                        </div>
                        {/* Input field for updating contact email */}
                        <p>Change your contact Email:</p>
                        <input
                            value={updatedContactEmail}
                            onChange={(e) => setUpdatedContactEmail(e.target.value)}
                            placeholder='Add your contact email'
                        />
                        {/* Input field for updating contact phone */}
                        <p>Add a Phone:</p>
                        <input
                            value={updatedContactPhone}
                            onChange={(e) => setUpdatedContactPhone(e.target.value)}
                            placeholder='Add your contact phone'
                        />
                        {/* Input field for updating LinkedIn URL */}
                        <p>Add LinkedIn URL:</p>
                        <input
                            value={updatedContactLinkedIn}
                            onChange={(e) => setUpdatedContactLinkedIn(e.target.value)}
                            placeholder='Add a link to your LinkedIn profile page'
                        />
                        {/* Input field for updating Facebook URL */}
                        <p>Add Facebook URL:</p>
                        <input
                            value={updatedContactFacebook}
                            onChange={(e) => setUpdatedContactFacebook(e.target.value)}
                            placeholder='Add a link to your Facebook profile page'
                        />
                        {/* Input field for updating Instagram URL */}
                        <p>Add Instagram URL:</p>
                        <input
                            value={updatedContactInstagram}
                            onChange={(e) => setUpdatedContactInstagram(e.target.value)}
                            placeholder='Add a link to your Instagram profile page'
                        />
                        {/* Input field for updating city location */}
                        <p>Add a City:</p>
                        <input
                            value={updatedLocationCity}
                            onChange={(e) => setUpdatedLocationCity(e.target.value)}
                            placeholder='Add a city location'
                        />
                        {/* Input field for updating country */}
                        <p>Add a Country:</p>
                        <input
                            value={updatedLocationCountry}
                            onChange={(e) => setUpdatedLocationCountry(e.target.value)}
                            placeholder='Add a country'
                        />
                    </div>

                    {/* Buttons for saving or canceling the changes */}
                    <div className='buttons'>
                        {/* Save button triggers the saveAboutCompanySidebar function */}
                        <button onClick={saveAboutCompanySidebar}>Save</button>
                        {/* Cancel button triggers the closeModal function */}
                        <button onClick={closeModal}>Cancel</button>
                    </div>

                </div>
            </Modal>

            <Footer />
        </>
    );
}


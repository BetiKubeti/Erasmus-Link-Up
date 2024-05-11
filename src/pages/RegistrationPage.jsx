import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
} from 'firebase/auth';
import { auth, firestore } from '../firebase';
import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    where,
    getDocs,
} from 'firebase/firestore';
import Modal from 'react-modal';
import Footer from '../components/Footer';

const categories = [
    "Software & Technology",
    "Environmental & Sustainability",
    "Education & Training",
    "Home & Garden",
    "Legal Services",
    "Professional Services",
    "Marketing & Advertising",
    "Financial Services",
    "Healthcare & Medical Services",
    "Retail & E-commerce",
    "Automotive & Transportation",
    "Entertainment and Media",
    "Hospitality and Travel",
    "Fitness & Wellness",
    "Manufacturing & Industrial"
];

const RegistrationForm = () => {
    const [companyName, setCompanyName] = useState('');
    const [websiteURL, setWebsiteURL] = useState('');
    const [category, setCategory] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [companyNameError, setCompanyNameError] = useState('');
    const [websiteURLError, setWebsiteURLError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [isEmailConfirmationModalOpen, setEmailConfirmationModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();

        // Reset any previous error messages.
        setCompanyNameError('');
        setWebsiteURLError('');
        setCategoryError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');

        let hasErrors = false;

        // Error checks
        if (!companyName) {
            setCompanyNameError('Please enter your company name');
            hasErrors = true;
        }

        if (!websiteURL) {
            setWebsiteURLError('Please enter your website URL');
            hasErrors = true;
        }

        if (!category) {
            setCategoryError('Choose a category');
            hasErrors = true;
        }

        if (!email) {
            setEmailError('Please enter your email');
            hasErrors = true;
        }

        if (!password) {
            setPasswordError('Please enter a password');
            hasErrors = true;
        } else if (password.length < 6) {
            setPasswordError('Password should be at least 6 characters');
            hasErrors = true;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Password does not match');
            hasErrors = true;
        }

        if (hasErrors) {
            // If there are errors, do not proceed with registration.
            return;
        }

        // Check if the email is already used for registration.
        const emailExists = await checkIfEmailExists(email);

        if (emailExists) {
            setEmailError('This email is already registered');
            hasErrors = true;
        }

        // Proceed with registration if email and company name are not already used.
        const companyData = {
            companyName,
            websiteURL,
            category,
            email,
            registrationDate: serverTimestamp(),
        };

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Update the user's display name
            await updateProfile(userCredential.user, {
                displayName: companyName,
            });

            await sendEmailVerification(auth.currentUser);

            // Add company data to Firestore
            const docRef = await addDoc(collection(firestore, 'companies'), companyData);
            console.log('Registration and document creation successful. Document ID:', docRef.id);

            // Show the email confirmation modal
            setEmailConfirmationModalOpen(true);
        } catch (error) {
            console.error('Registration error:', error);
            // Handle registration error, e.g., display an error message.
        }
    };

    // Function to check if an email already exists in the database
    const checkIfEmailExists = async (email) => {
        const querySnapshot = await getDocs(query(collection(firestore, 'companies'), where('email', '==', email)));
        return !querySnapshot.empty;
    };

    const requestEmailVerification = async () => {
        try {
            await sendEmailVerification(auth.currentUser);
            setEmailConfirmationModalOpen(true);
        } catch (error) {
            console.error('Email verification request error:', error);
            // Handle the error, e.g., display an error message.
        }
    };

    return (
        <>
            {/* Registration page section */}
            <section className='registration-page'>
                <div className='registration-page-wrap'>
                    <div className='registration-page-container'>
                        {/* Registration form header */}
                        <h2>Sign Up to CollaboGreen</h2>
                        {/* Registration form */}
                        <form onSubmit={handleRegistration}>
                            {/* Company Information section */}
                            <p>Company Information:</p>
                            {/* Input field for Company Name */}
                            <div className='input-container'>
                                <input type="text" placeholder='Company Name' value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                            </div>
                            {/* Display error message for Company Name */}
                            <div className='error-message'>
                                {companyNameError && <p>{companyNameError}</p>}
                            </div>
                            {/* Input field for Website URL */}
                            <div className='input-container'>
                                <input type="url" placeholder='Website URL: https://example.com' value={websiteURL} onChange={(e) => setWebsiteURL(e.target.value)} />
                            </div>
                            {/* Display error message for Website URL */}
                            <div className='error-message'>
                                {websiteURLError && <p>{websiteURLError}</p>}
                            </div>
                            {/* Dropdown for selecting category */}
                            <div className='input-container'>
                                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="" disabled hidden defaultValue>Select a category</option>
                                    {/* Map through categories to populate dropdown options */}
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Display error message for category selection */}
                            <div className='error-message'>
                                {categoryError && <p>{categoryError}</p>}
                            </div>
                            {/* Input field for Email */}
                            <div className='input-container'>
                                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            {/* Display error message for Email */}
                            <div className='error-message'>
                                {emailError && <p>{emailError}</p>}
                            </div>
                            {/* Password section */}
                            <p>Password:</p>
                            {/* Input field for Password */}
                            <div className='input-container'>
                                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            {/* Display error message for Password */}
                            <div className='error-message'>
                                {passwordError && <p>{passwordError}</p>}
                            </div>
                            {/* Input field for Confirm Password */}
                            <div className='input-container'>
                                <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            {/* Display error message for Confirm Password */}
                            <div className='error-message'>
                                {confirmPasswordError && <p>{confirmPasswordError}</p>}
                            </div>
                            {/* Sign Up button */}
                            <div className='input-container'>
                                <button type="submit">Sign Up</button>
                            </div>
                        </form>
                        {/* Option to navigate to the login page */}
                        <div className='change-option'>
                            <p>You already have a CollaboGreen Account?</p>
                            <a href="/login">Log In here!</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Email Confirmation Modal */}
            <Modal
                isOpen={isEmailConfirmationModalOpen}
                contentLabel="Email Confirmation Modal"
                className="custom-modal"
                id='pop-up'
            >
                <div className='pop-up-container'>
                    {/* Modal header */}
                    <h2>Check Your Email</h2>
                    {/* Modal content */}
                    <p>An email has been sent to you for confirmation. Please verify your email to complete the registration.</p>
                    {/* Modal buttons */}
                    <div className='buttons'>
                        {/* Close button triggers closing modal and navigating to home */}
                        <button onClick={() => setEmailConfirmationModalOpen(false) & navigate('/')}>Close</button>
                        {/* Resend Confirmation Email button */}
                        <button type="button" onClick={requestEmailVerification}>Resend Confirmation Email</button>
                    </div>
                </div>
            </Modal>

            {/* Footer component */}
            <Footer />
        </>
    );
};

export default RegistrationForm;

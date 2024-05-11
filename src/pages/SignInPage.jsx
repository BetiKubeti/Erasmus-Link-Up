import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../../firebase';
import { doc, setDoc, getFirestore, collection, addDoc } from 'firebase/firestore';
import Footer from '../components/Footer'

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        // Reset any previous error messages.
        setEmailError('');
        setPasswordError('');

        let hasErrors = false;

        if (!email) {
            setEmailError('Please enter your email');
            hasErrors = true;
        }

        if (!password) {
            setPasswordError('Please enter your password');
            hasErrors = true;
        }

        if (hasErrors) {
            // If there are errors, do not proceed with sign-in.
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Handle successful sign-in, e.g., redirect the user
            navigate('/');
        } catch (error) {
            // Handle sign-in error, e.g., display an error message
            console.error('Sign-in error:', error);
            // You can set a specific error message based on the error code.
            if (error.code === 'auth/user-not-found') {
                setEmailError('Invalid email or password');
            } else if (error.code === 'auth/invalid-login-credentials') {
                setPasswordError('Invalid email or password');
            }
        }
    };

    return (
        <>
            {/* Sign In page section */}
            <section className='signin-page'>
                <div className='signin-page-wrap'>
                    {/* Sign In form container */}
                    <div className='registration-page-container'>
                        {/* Sign In form header */}
                        <h2>Log In to CollaboGreen</h2>
                        {/* Sign In form */}
                        <form onSubmit={handleSignIn}>
                            {/* Input field for Email */}
                            <div className='input-container'>
                                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            {/* Display error message for Email */}
                            <div className='error-message'>
                                {emailError && <p>{emailError}</p>}
                            </div>
                            {/* Input field for Password */}
                            <div className='input-container'>
                                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            {/* Display error message for Password */}
                            <div className='error-message'>
                                {passwordError && <p>{passwordError}</p>}
                            </div>
                            {/* Sign In button */}
                            <div className='input-container'>
                                <button type="submit">Sign In</button>
                            </div>
                        </form>
                        {/* Option to navigate to the Sign Up page */}
                        <div className='change-option'>
                            <p>You don't have a CollaboGreen Account?</p>
                            <a href="/signup">Sign Up here!</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer component */}
            <Footer />
        </>
    );
};

export default SignInForm;

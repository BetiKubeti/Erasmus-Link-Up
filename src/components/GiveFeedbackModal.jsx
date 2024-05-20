import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const GiveFeedbackModal = ({onClose}) => {

    const categories = [
        "Activity Log page",
        "Home page",
        "Network page",
        "Profile page",
        "Privacy Center page",
        "Settings page",
        "Toolbox page",
        "Other"
    ];

    const [category, setCategory] = useState('');

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className='feedback-modal-title-container'>
                    <h2>Help Us Improve ErasmusLinkUp</h2>
                    <Icon icon="carbon:close-filled" onClick={onClose} />
                </div>
                <div className='feedback-inputs-containers'>
                    <div className='input-container'>
                        <p>How can we improve ErasmusLinkUp?</p>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="" disabled hidden defaultValue>Select an area</option>
                            {/* Map through categories to populate dropdown options */}
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='input-container'>
                        <p>Give us details:</p>
                        <textarea name="feedback-details" id="feedback-details" placeholder='Write as much details as possible here...'></textarea>
                    </div>
                    <div className='input-container'>
                        <label for="file-input" className='file-input-label' ><Icon icon="akar-icons:attach" /> <span>Attach a screenshot or a screen video (decremented)</span></label>
                        <input type="file" id="file-input" name="file-input" className='file-input' />
                    </div>
                </div>
                <div className='submit-feedback-button-container'>
                    <button><span>Submit the feedback now!</span></button>
                </div>
            </div>
        </div>
    );
};

export default GiveFeedbackModal;
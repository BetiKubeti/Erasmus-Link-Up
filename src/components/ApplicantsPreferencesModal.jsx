import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const ApplicantsPreferencesModal = ({ onClose, onApplicantsPreferenceChange, initialApplicantPreference }) => {
    const [preference, setPreference] = useState(initialApplicantPreference);

    useEffect(() => {
        setPreference(initialApplicantPreference);
    }, [initialApplicantPreference]);

    const handlePreferenceChange = (newPreference) => {
        setPreference(newPreference);
        onApplicantsPreferenceChange(newPreference);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Applicant preferences</h2>
                    <Icon icon="carbon:close-filled" className="close-button" onClick={onClose} />
                </div>
                <div className="modal-body">
                    <label className="option">
                        <input
                            type="radio"
                            value="listed"
                            checked={preference === 'listed'}
                            onChange={() => handlePreferenceChange('listed')}
                        />
                        <span>By choosing this option, your profile will be listed as a suggestion to everyone who uses #TripApplicants while searching.</span>
                    </label>
                    <label className="option">
                        <input
                            type="radio"
                            value="notListed"
                            checked={preference === 'notListed'}
                            onChange={() => handlePreferenceChange('notListed')}
                        />
                        <span>By choosing this option, your profile will NOT be listed as a suggestion to everyone who uses #TripApplicants while searching.</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ApplicantsPreferencesModal;

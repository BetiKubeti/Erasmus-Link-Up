import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const TripPreferencesModal = ({ onClose, onOpportunityPreferenceChange, initialOpportunityPreference }) => {
    const [preference, setPreference] = useState(initialOpportunityPreference);

    useEffect(() => {
        setPreference(initialOpportunityPreference);
    }, [initialOpportunityPreference]);

    const handlePreferenceChange = (newPreference) => {
        setPreference(newPreference);
        onOpportunityPreferenceChange(newPreference);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Trip preferences</h2>
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
                        <span>By choosing this option, your profile will be listed as a suggestion to everyone who uses #TripOpportunities when users are searching for trip opportunities.</span>
                    </label>
                    <label className="option">
                        <input
                            type="radio"
                            value="notListed"
                            checked={preference === 'notListed'}
                            onChange={() => handlePreferenceChange('notListed')}
                        />
                        <span>By choosing this option, your profile will NOT be listed as a suggestion to everyone who uses #TripOpportunities while searching.</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default TripPreferencesModal;

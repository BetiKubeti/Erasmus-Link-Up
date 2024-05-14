import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [companyResults, setCompanyResults] = useState([]);
    const [personResults, setPersonResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const navigate = useNavigate();

    const handleResultClick = (result) => {
        setSearchTerm(result.name);
        setShowSuggestions(false);
    };

    useEffect(() => {
        if (searchTerm) {
            const query = searchTerm.toLowerCase();
            const companyResults = [];
            const personResults = [];

            // Fetch users from Firestore and filter based on the search term
            getDocs(collection(firestore, 'users'))
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        if (data && data.name) {
                            // Determine the type based on userType
                            const userType = data.userType === 'person' ? 'People' : 'Companies';
                            if (userType === 'Companies') {
                                if (data.name.toLowerCase().includes(query)) {
                                    companyResults.push(data.name);
                                }
                            } else {
                                if (data.name.toLowerCase().includes(query)) {
                                    personResults.push(data.name);
                                }
                            }
                        }
                    });

                    // Check if there are any matching results before showing suggestions
                    if (companyResults.length > 0 || personResults.length > 0) {
                        setCompanyResults(companyResults);
                        setPersonResults(personResults);
                        setShowSuggestions(true);
                    } else {
                        setShowSuggestions(false);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching users:', error);
                });
        } else {
            // Reset state and hide suggestions when search term is empty
            setCompanyResults([]);
            setPersonResults([]);
            setShowSuggestions(false);
        }
    }, [searchTerm]);

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            navigate(`/search-results/${searchTerm}`);
        }
    };

    return (
        <div className="search-bar-container">
            {/* Search form with input and button */}
            <form className={showSuggestions ? 'search-bar active' : 'search-bar'} action="">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>
                    {/* Search icon SVG */}
                    <Icon icon="ic:round-search" />
                </button>
            </form>
            {/* Display search results */}

            {searchTerm && (
                <ul className="search-results">
                    {companyResults.length > 0 || personResults.length > 0 ? (
                        <>
                            {companyResults.length > 0 && (
                                <div>
                                    {/* Display company results */}
                                    <strong>Companies</strong>
                                    {companyResults.map((company, index) => (
                                        <li key={index} onClick={() => handleResultClick({ name: company, userType: 'Companies' })}>
                                            {company}
                                        </li>
                                    ))}
                                </div>
                            )}
                            {personResults.length > 0 && (
                                <div>
                                    {/* Display people results */}
                                    <strong>People</strong>
                                    {personResults.map((person, index) => (
                                        <li key={index} onClick={() => handleResultClick({ name: person, userType: 'People' })}>
                                            {person}
                                        </li>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        // Displayed when there are no matching results
                        <div className="no-matches">No matches found</div>
                    )}
                </ul>
            )}
            
        </div>
    );
}
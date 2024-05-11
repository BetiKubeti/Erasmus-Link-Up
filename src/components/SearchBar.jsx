import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

// SearchBar component
export default function SearchBar() {
    // State variables for search term, company results, category results, location results, and suggestion visibility
    const [searchTerm, setSearchTerm] = useState('');
    const [companyResults, setCompanyResults] = useState([]);
    const [categoryResults, setCategoryResults] = useState([]);
    const [locationResults, setLocationResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Hook for navigation
    const navigate = useNavigate();

    // Function to handle clicks on search results
    const handleResultClick = (result) => {
        setSearchTerm(result);
        setShowSuggestions(false);
    };

    // useEffect hook for fetching and updating search results based on the search term
    useEffect(() => {
        if (searchTerm) {
            const query = searchTerm.toLowerCase();
            const companies = [];
            const categories = new Set();
            const locations = new Set();

            // Fetch companies from Firestore and filter based on the search term
            getDocs(collection(firestore, 'companies'))
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        if (data && data.companyName && data.category) {
                            if (data.companyName.toLowerCase().includes(query)) {
                                companies.push(data.companyName);
                            }
                            if (data.category.toLowerCase().includes(query)) {
                                categories.add(data.category);
                            }
                            if (data.locationCountry && data.locationCountry.toLowerCase().includes(query)) {
                                locations.add(data.locationCountry);
                            }
                        }
                    });

                    // Update state with filtered results and show suggestions
                    setCompanyResults(companies);
                    setCategoryResults(Array.from(categories));
                    setLocationResults(Array.from(locations));
                    setShowSuggestions(true);
                })
                .catch((error) => {
                    console.error('Error fetching companies:', error);
                });
        } else {
            // Reset state and hide suggestions when search term is empty
            setCompanyResults([]);
            setCategoryResults([]);
            setLocationResults([]);
            setShowSuggestions(false);
        }
    }, [searchTerm]);

    // Function to handle the search button click
    const handleSearch = () => {
        // Navigate to the search results page with the selected search term
        // Check if searchTerm is not empty before navigating
        if (searchTerm.trim() !== '') {
            // Navigate to the search results page with the selected search term
            navigate(`/companies-category/${searchTerm}`);
        }
    };

    // Render the SearchBar component
    return (
        <div className="search-bar-container">
            {/* Search form with input and button */}
            <form className='search-bar' action="">
                <input
                    type="text"
                    placeholder="Search for a company, category, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={showSuggestions ? 'active' : ''}
                />
                <button onClick={handleSearch}>
                    {/* Search icon SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g id="feSearch0" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
                            <g id="feSearch1" fill="currentColor">
                                <path
                                    id="feSearch2"
                                    d="m16.325 14.899l5.38 5.38a1.008 1.008 0 0 1-1.427 1.426l-5.38-5.38a8 8 0 1 1 1.426-1.426ZM10 16a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"
                                />
                            </g>
                        </g>
                    </svg>
                </button>
            </form>
            {/* Display search results */}
            {searchTerm && (
                <ul className="search-results">
                    {companyResults.length > 0 || categoryResults.length > 0 || locationResults.length > 0 ? (
                        <>
                            {companyResults.length > 0 && (
                                <div>
                                    {/* Display company results */}
                                    <strong>Companies</strong>
                                    {companyResults.map((company, index) => (
                                        <li key={index} onClick={() => handleResultClick(company)}>
                                            {company}
                                        </li>
                                    ))}
                                </div>
                            )}
                            {categoryResults.length > 0 && (
                                <div>
                                    {/* Display category results */}
                                    <strong>Categories</strong>
                                    {categoryResults.map((category, index) => (
                                        <li key={index} onClick={() => handleResultClick(category)}>
                                            {category}
                                        </li>
                                    ))}
                                </div>
                            )}
                            {locationResults.length > 0 && (
                                <div>
                                    {/* Display location results */}
                                    <strong>Locations</strong>
                                    {locationResults.map((location, index) => (
                                        <li key={index} onClick={() => handleResultClick(location)}>
                                            {location}
                                        </li>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        // Displayed when there are no matching results
                        <div className="no-matches">hello</div>
                    )}
                </ul>
            )}
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

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
                                companyResults.push(data.name);
                            } else {
                                personResults.push(data.name);
                            }
                        }
                    });

                    // Update state with filtered results and show suggestions
                    setCompanyResults(companyResults);
                    setPersonResults(personResults);
                    setShowSuggestions(true);
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
                        <div className="no-matches">hello</div>
                    )}
                </ul>
            )}
            
        </div>
    );
}



// // return (
// //     return (
// <div className="search-bar-container">
//     {/* Search form with input and button */}
//     <form className={showSuggestions ? 'search-bar active' : 'search-bar'} action="">
//         <input
//             type="text"
//             placeholder="Search"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button onClick={handleSearch}>
//             {/* Search icon SVG */}
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//                 <g id="feSearch0" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
//                     <g id="feSearch1" fill="currentColor">
//                         <path
//                             id="feSearch2"
//                             d="m16.325 14.899l5.38 5.38a1.008 1.008 0 0 1-1.427 1.426l-5.38-5.38a8 8 0 1 1 1.426-1.426ZM10 16a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"
//                         />
//                     </g>
//                 </g>
//             </svg>
//         </button>
//     </form>
//     {/* Display search results */}
//     {searchTerm && (
//         <ul className="search-results">
//             {companyResults.length > 0 || categoryResults.length > 0 ? (
//                 <>
//                     {companyResults.length > 0 && (
//                         <div>
//                             {/* Display company results */}
//                             <strong>Companies</strong>
//                             {companyResults.map((company, index) => (
//                                 <li key={index} onClick={() => handleResultClick(company)}>
//                                     {company}
//                                 </li>
//                             ))}
//                         </div>
//                     )}
//                     {categoryResults.length > 0 && (
//                         <div>
//                             {/* Display category results */}
//                             <strong>People</strong>
//                             {categoryResults.map((category, index) => (
//                                 <li key={index} onClick={() => handleResultClick(category)}>
//                                     {category}
//                                 </li>
//                             ))}
//                         </div>
//                     )}
//                 </>
//             ) : (
//                 // Displayed when there are no matching results
//                 <div className="no-matches">No matches found</div>
//             )}
//         </ul>
//     )}
// </div>
//     );
// // );
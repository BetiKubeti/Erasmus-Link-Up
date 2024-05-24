import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { Icon } from '@iconify/react';

// Components
import Footer from '../components/FooterSignUpLogIn';
import Nav from "../components/Nav";

// Image import
import DefaultProfileImage from '../assets/images/default-profile-image.jpg';

const ToolboxPage = () => {

    const [user] = useAuthState(auth);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user) {
                const userDocRef = doc(firestore, 'users', user.uid);
                const userSnap = await getDoc(userDocRef);

                if (userSnap.exists()) {
                    setProfileData(userSnap.data());
                } else {
                    console.log("No such document!");
                }
            }
        };

        fetchUserProfile();
    }, [user]);

    const [folders] = useState([
        { id: 1, name: 'Sustainability', files: 2 },
        { id: 2, name: 'Photography', files: 3 },
        { id: 3, name: 'Entrepreneurship', files: 1 }
    ]);

    const [files] = useState([
        { id: 1, name: 'Photography data', createdBy: 'Gabriella Mono', type: 'Microsoft Excel Document', size: '1 MB' },
        { id: 2, name: 'Photography basics', createdBy: 'Gabriella Mono', type: 'Power Point', size: '15 KB' },
        { id: 3, name: 'Public talking', createdBy: 'Gabriella Mono', type: 'PNG Document', size: '12 KB' },
        { id: 4, name: 'Public speaking', createdBy: 'Gabriella Mono', type: 'Microsoft Word Document', size: '13 KB' },
        { id: 5, name: 'Tips and Trick for photography', createdBy: 'Gabriella Mono', type: 'Microsoft Word Document', size: '13 KB' }
    ]);

    const [contextMenu, setContextMenu] = useState(null);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu({
            x: event.pageX,
            y: event.pageY
        });
    };

    const handleCloseContextMenu = () => {
        setContextMenu(null);
    };

    const handleCreateFile = (fileType) => {
        // Logic for creating a file goes here
        console.log(`Creating a new ${fileType}`);
        handleCloseContextMenu();
    };

    const getFileIcon = (fileType) => {
        switch (fileType) {
            case 'Microsoft Excel Document':
                return <Icon icon="vscode-icons:file-type-excel" />;
            case 'Power Point':
                return <Icon icon="vscode-icons:file-type-powerpoint" />;
            case 'PNG Document':
                return <Icon icon="teenyicons:png-outline" />;
            case 'Microsoft Word Document':
                return <Icon icon="vscode-icons:file-type-word" />;
            default:
                return <Icon icon="mdi:file-document" />;
        }
    };

    return (
        <>
            <Nav />
            <div className="toolbox-page">
                <section className="profile" id="profile">
                    <div className='current-profile-card'>
                        <div className='profile-picture'>
                            <img src={profileData?.profileImageURL || DefaultProfileImage} alt="Profile" />
                        </div>
                        <div className='profile-name'>{profileData?.name}</div>
                        <a className='view-profile-button' href={`/${user?.uid}/profile`}>view profile</a>
                    </div>
                </section>

                <section className='toolbox-content'>
                    <div className="folders-section">
                        <h4>All of your folders</h4>
                        <div className="folders">
                            {folders.map(folder => (
                                <div key={folder.id} className="folder">
                                    <Icon icon="fxemoji:folder" className='folder-icon' />
                                    <div>
                                        <div className='folder-name'>{folder.name}</div>
                                        <div className='number-of-files'>{folder.files} files</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="files-section" onContextMenu={handleContextMenu}>
                        <h4>All of your saved toolboxes</h4>
                        <table>
                            <thead>
                                <tr className='solid'>
                                    <th>Name</th>
                                    <th>Created by</th>
                                    <th>Type</th>
                                    <th>Size</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.map(file => (
                                    <tr key={file.id} className='solid'>
                                        <td className='doc-name'>{getFileIcon(file.type)}{file.name}</td>
                                        <td>{file.createdBy}</td>
                                        <td>{file.type}</td>
                                        <td>{file.size}</td>
                                        <td><Icon icon="ri:more-fill" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {contextMenu && (
                    <ul
                        className="context-menu"
                        style={{ top: contextMenu.y, left: contextMenu.x }}
                        onClick={handleCloseContextMenu}
                    >
                        <li onClick={() => handleCreateFile('Microsoft Excel Document')}>Create Excel Document</li>
                        <li onClick={() => handleCreateFile('Power Point')}>Create Power Point</li>
                        <li onClick={() => handleCreateFile('PNG Document')}>Create PNG Document</li>
                        <li onClick={() => handleCreateFile('Microsoft Word Document')}>Create Word Document</li>
                    </ul>
                )}
            </div>
            <Footer style={{ position: "relative", width: "100%", bottom: "0", marginTop: "64px" }} />
        </>
    );
};

export default ToolboxPage;

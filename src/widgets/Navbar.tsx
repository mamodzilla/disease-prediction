import React from 'react';
import SignButtons from '../features/SignButtons';
import '../app/styles/navbar.css';
import NavIcons from '../features/NavIcons';
import Logo from '../shared/Logo';

const Navbar: React.FC = () => {
    return (
        <nav className="header__navbar">
            <div className="header__logo-container">
                <Logo></Logo>
            </div>
            <SignButtons></SignButtons>
            <NavIcons></NavIcons>
        </nav>
    );
};

export default Navbar; 
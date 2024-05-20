import React from 'react';
import SignButtons from '../features/SignButtons';
import '../app/styles/navbar.css';
import NavIcons from '../features/NavIcons';
import Logo from '../shared/Logo';

const Navbar: React.FC = () => {
    return (
        <div className="navbar-container">
        <nav className="header__navbar">
            <div className="header__logo-container">
                <Logo></Logo>
            </div>
            <SignButtons></SignButtons>
            <NavIcons></NavIcons>
        </nav>
        </div>
    );
};

export default Navbar; 
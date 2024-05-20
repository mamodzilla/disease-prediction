import React from 'react';
import Navbar from './Navbar';
import Welcome from './Welcome';  
import '../app/styles/header.css';  

const Header: React.FC = () => {
    return (
        <header className="header">
            <Navbar></Navbar>
            <div className="container">               
                <Welcome></Welcome>
            </div>
        </header>
    );
}; 

export default Header;
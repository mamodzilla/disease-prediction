import React from 'react';
import "../app/styles/sign-buttons.css"
import { Link } from 'react-router-dom';

const SignButtons: React.FC = () => {
    return (
        <div className="header__sign-buttons">
            <Link to="/login"><button className="header__sign-btn">Sign in</button></Link>
            <Link to="/register"><button className="header__sign-btn">Sign up</button></Link>                   
        </div>
    );
};

export default SignButtons; 
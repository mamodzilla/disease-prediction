import React from 'react';
import '../app/styles/welcome-btn.css';
import { Link } from 'react-router-dom';

const WelcomeBtn: React.FC = () => {
    return (
        <Link to="/method" className="header__start-diagnosing-form" >
            <button className="header__start-diagnosing-btn">Start diagnosing</button>
        </Link>
    );
};

export default WelcomeBtn;
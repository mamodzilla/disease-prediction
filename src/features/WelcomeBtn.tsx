import React from 'react';
import '../app/styles/welcome-btn.css';

const WelcomeBtn: React.FC = () => {
    return (
        <form className="header__start-diagnosing-form" action="#">
            <button className="header__start-diagnosing-btn">Start diagnosing</button>
        </form>
    );
};

export default WelcomeBtn;
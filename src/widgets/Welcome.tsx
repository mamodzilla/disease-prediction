import React from 'react';
import WelcomeBtn from '../features/WelcomeBtn';
import '../app/styles/welcome.css';

const Welcome: React.FC = () => {
    return (
        <div className="header__welcome-container">
            <h1 className="header__welcome-h">Get diagnoses of diseases</h1>
            <p className="header__additional-information">
                Our neural network will allow you to identify a disease based on symptoms, laboratory data, or even images
            </p>
            <div className="header__start-diagnosing-container">
                <WelcomeBtn></WelcomeBtn>
            </div>
        </div>
    );
};

export default Welcome; 
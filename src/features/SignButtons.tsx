import React from 'react';
import "../app/styles/sign-buttons.css"

const SignButtons: React.FC = () => {
    return (
        <div className="header__sign-buttons">
            <form className="header__sign-in-form" action="/login">
                <button className="header__sign-btn">Sign in</button>
            </form>
            <form className="header__sign-up-form" action="/register">
                <button className="header__sign-btn">Sign up</button>
            </form>
        </div>
    );
};

export default SignButtons; 
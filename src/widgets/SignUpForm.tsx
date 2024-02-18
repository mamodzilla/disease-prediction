import React from "react";
import "../app/styles/sign-up-form.css"; 
import InputSign from "../shared/InputSign";
import SignUpBtn from "../features/SignUpBtn";

const SignUpForm: React.FC = () => {
    return (
        <form className="sign-up__form" method="post">
            <div className="sign-up__input-listing">
                <div className="sign-up__item">
                    <div className="sign-up__item-text">Nickname:</div>
                    <div className="sign-up__item-input-container">
                        <input className="sign-up__item-input" name="nickname" type="text" required/>
                        <div className="sign-up__item-input-sign-container"></div>
                    </div>
                </div>
                <div className="sign-up__item">
                    <div className="sign-up__item-text">Email:</div>
                    <div className="sign-up__item-input-container">
                        <input className="sign-up__item-input" name="email" type="email" required/>
                        <div className="sign-up__item-input-sign-container"></div>
                    </div>
                </div>
                <div className="sign-up__item">
                    <div className="sign-up__item-text">Password:</div>
                    <div className="sign-up__item-input-container">
                        <input className="sign-up__item-input" name="password" type="password" required/>
                        <div className="sign-up__item-input-sign-container"><InputSign></InputSign></div>
                    </div>
                </div>
                <div className="sign-up__item">
                    <div className="sign-up__item-text">Password again:</div>
                    <div className="sign-up__item-input-container">
                        <input className="sign-up__item-input" name="password_again" type="password" required/>
                        <div className="sign-up__item-input-sign-container"><InputSign></InputSign></div>
                    </div>
                </div>
            </div>
            <div className="sign-up__btn-container">
                <SignUpBtn></SignUpBtn>
            </div>
        </form>
    ); 
};

export default SignUpForm;
import React from "react";
import "../app/styles/sign-in-form.css";
import SignInBtn from "../features/SignInBtn";
import InputSign from "../shared/InputSign";
import { Link } from "react-router-dom";

const SignInForm: React.FC = () => {
    return (
        <form className="sign-in__form" method="post">
            <div className="sign-in__input-listing">
                <div className="sign-in__item">
                    <div className="sign-in__item-text">Email:</div>
                    <div className="sign-in__item-input-container">
                        <input className="sign-in__item-input" name="email" type="email" required/>
                        <div className="sign-in__item-input-sign-container"></div>
                    </div>
                </div>
                <div className="sign-in__item">
                    <div className="sign-in__item-text">Password:</div>
                    <div className="sign-in__item-input-container">
                        <input className="sign-in__item-input" name="password" type="password" required/>
                        <div className="sign-in__item-input-sign-container"><InputSign></InputSign></div>
                    </div>
                </div>
            </div>
            <div className="sign-in__btn-container">
                <SignInBtn></SignInBtn>
            </div>
        </form>
    );
};

export default SignInForm;
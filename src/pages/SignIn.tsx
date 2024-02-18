import React from "react";
import "../app/styles/sign-in.css"; 
import SignInForm from "../widgets/SignInForm";

const SignIn: React.FC = () => {
    return (
        <main className="main">
            <div className="sign-in">
                <div className="sign-in__background-img-container">
                    <div className="container">
                        <h1 className="sign-in__h">Sign in</h1>
                        <div className="sign-in__container">
                            <div className="sign-in__inner-container">
                                <SignInForm></SignInForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    ); 
}; 

export default SignIn;
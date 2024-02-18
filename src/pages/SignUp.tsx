import React from "react";
import "../app/styles/sign-up.css"; 
import SignUpForm from "../widgets/SignUpForm";

const SignUp: React.FC = () => {
    return (
        <main className="main">
            <div className="sign-up">
                <div className="sign-up__background-img-container">
                    <div className="container">
                        <h1 className="sign-up__h">Sign up</h1>
                        <div className="sign-up__container">
                            <div className="sign-up__inner-container">
                                <SignUpForm></SignUpForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}; 

export default SignUp;
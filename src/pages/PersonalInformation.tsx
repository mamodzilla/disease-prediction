import React from "react";
import "../app/styles/personal-information.css";
import PersonalAccountMenu from "../widgets/PersonalAccountMenu";
import Navbar from "../widgets/Navbar";
import PersonalInformationForm from "../widgets/PersonalInformationForm";
import Footer from "../widgets/Footer";

const PersonalInformation: React.FC = () => {
    return (
        <div className="page-container">
            <div className="container">
                <Navbar></Navbar>
            </div>
            <main className="main">
                <div className="personal-info">
                    <div className="container">
                        <PersonalAccountMenu></PersonalAccountMenu>
                        <div className="personal-info__container">
                            <h2 className="personal-info__nickname">Nickname</h2>
                            <PersonalInformationForm></PersonalInformationForm>
                        </div>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default PersonalInformation;
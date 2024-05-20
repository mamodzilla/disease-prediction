import React from "react";
import "../app/styles/disease-history.css"; 
import Navbar from "../widgets/Navbar";
import Footer from "../widgets/Footer";
import PersonalAccountMenu from "../widgets/PersonalAccountMenu";
import DiseaseListing from "../widgets/DiseaseListing";
import DiseaseData from "../widgets/DiseaseData";

const DiseaseHistory: React.FC = () => {
    return (
        <div className="page-container">

                <Navbar></Navbar>

            <main className="main">
                <div className="disease-history">
                    <div className="container">
                        <PersonalAccountMenu></PersonalAccountMenu>
                        <div className="disease-history__container">
                            <DiseaseListing></DiseaseListing>
                            <DiseaseData></DiseaseData>
                        </div>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default DiseaseHistory;